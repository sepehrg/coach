import {Matrix4, Quaternion, Vector2, Vector3} from 'three';
import {SCENE_DISTANCE} from '../IDOScene';
import Actor from '../Objects/Actor';
import {getWPFromRelative} from './Helper';

export default class LocomotionSystem {

    public acceleration = 4.0;
    public deceleration = -4.0;
    public maxVelocity = 4.0;
    public rotationSpeed = 1.0;

    private currentVelocity = 0;
    private currentAcceleration = 0;

    //for rotation
    private rotationTarget = new Quaternion();

    private movementDirectionNormalized = new Vector3();
    private velocityVector = new Vector3();
    private isRotating = false;


    private actor: Actor;
    private movementTargets: any[] = [];

    constructor(actor: Actor) {
        this.actor = actor;
    }

  public moveToRelative(x: number, y: number, z?: number) {
    if (z === undefined) {
      z = SCENE_DISTANCE;
    }
    const targetPos = getWPFromRelative(x, y, z, this.actor.mainGL.camera);
    this.moveTo(targetPos);
  }

    //force overwrite movement targets
    private static OVERWRITE_MOVEMENT_TARGET_THRESHOLD = 0.1;

    private moveTo(movementTarget: Vector3) {
        //don't overwrite movement target if:
        //1. current target is close to wanted target
        // or
        //2. if actor already is close to the target
        if (
            (this.movementTargets.length > 0 &&
                this.movementTargets[0].distanceTo(movementTarget) <
                LocomotionSystem.OVERWRITE_MOVEMENT_TARGET_THRESHOLD) ||
            this.actor.getActorWorldPos().distanceTo(movementTarget) <
            LocomotionSystem.OVERWRITE_MOVEMENT_TARGET_THRESHOLD
        ) {
            return;
        }

        let direction = new Vector3().copy(movementTarget).sub(this.actor.getActorWorldPos());
        let directionVec2 = new Vector2(direction.x, direction.y).normalize();

        //let isMoving = this.distanceNormalized > 0; //if currently on path, don't replay the start animation
        this.isDecelerating = false;
        this.isRotating = false;

        ((this.actor as unknown) as LocomotionCallback)?.onStartMoving([
            directionVec2.x,
            directionVec2.y,
        ]);
        this.movementTargets = [movementTarget];
    }

    //returns the time the object needs to come to a complete halt at the current velocity
    //(assuming constant deceleration)
    private getTimeTillHalt() {
        return -(this.currentVelocity / (this.deceleration));
    }

    //returns the position where the object would come to a halt if it were to break now
    //(assuming constant deceleration)
    private positionAtHalt(t: number) {
        return 0.5 * this.deceleration * t * t + this.currentVelocity * t;
    }

    private isDecelerating = false;

    private reachedCurrentTarget() {
        //idempotent set position if movement failed
        this.actor.model?.position.copy(this.movementTargets[0]);
        //idempotent set rotation if rotation failed
        this.setRotation();
        this.actor.model!.quaternion.copy(this.rotationTarget);

        this.movementTargets.shift();
        ((this.actor as unknown) as LocomotionCallback)?.onTargetReached();
        this.isDecelerating = false;
        this.isRotating = false;

        //failsafe
        this.currentVelocity = 0;
        this.currentAcceleration = 0;
    }

    private informVelocityChanged() {
        this.velocityVector.copy(this.movementDirectionNormalized).multiplyScalar(this.currentVelocity);
        ((this.actor as unknown) as LocomotionCallback)?.onUpdateVelocity(this.velocityVector,this.maxVelocity);
    }


    private tempRotationMatrix = new Matrix4();
    private setRotation() {
        this.tempRotationMatrix.lookAt(this.actor.mainGL.camera.position,this.movementTargets[0],this.actor.model!.up);
        this.rotationTarget.setFromRotationMatrix(this.tempRotationMatrix);
    }

    //called once when actor starts to decelerate
    private startDecelerating() {
        ((this.actor as unknown) as LocomotionCallback)?.onStartDecelerating(this.getTimeTillHalt());
        this.setRotation();
        this.isRotating = true;
    }

    private interpolateObjectRotation(delta:number) {
        if (this.actor.model!.quaternion.angleTo(this.rotationTarget) < 0.001) return;
        if (this.isRotating && this.rotationTarget) {
            this.actor.model!.quaternion.rotateTowards(this.rotationTarget,this.rotationSpeed*delta);
        }
    }

    //call this to update motion
    onTickLocomotion(delta: number) {
        if (this.movementTargets.length > 0) {

            //can be optimized
            //calculate the movement vector to target
            this.movementDirectionNormalized.copy(this.movementTargets[0]).sub(this.actor.model!.position).normalize();

            let remainingPath = this.actor.model!.position.distanceTo(this.movementTargets[0]);

            if (this.isDecelerating || this.positionAtHalt(this.getTimeTillHalt()) > remainingPath) {
                if (!this.isDecelerating) {
                    //runs once when object starts to decelerate
                    this.startDecelerating();
                }
                //break
                this.currentAcceleration = this.deceleration;
                //rotate to face user
                this.interpolateObjectRotation(delta);
                this.isDecelerating = true;
            } else if (this.currentVelocity < this.maxVelocity) {
                //accelerating
                this.currentAcceleration = this.acceleration;
            } else {
                this.currentAcceleration = 0;
            }

            //detect halt
            let velocityPreTick = this.currentVelocity;
            this.currentVelocity += this.currentAcceleration * delta;

            //if prev velocity and current velocity have the same sign the actor hasn't come to a halt jet
            if (((this.currentVelocity > 0 && velocityPreTick < 0 ) || (this.currentVelocity < 0 && velocityPreTick > 0)) && this.isDecelerating) {
                //halt
                this.reachedCurrentTarget();
                return;
            }
            this.informVelocityChanged();

            this.actor.model?.position.add(this.movementDirectionNormalized.multiplyScalar(this.currentVelocity * delta));
            //TODO: find a more elegant solution to counter target overshoot
            if (this.actor.model!.position.distanceTo(this.movementTargets[0]) > remainingPath) {
                this.reachedCurrentTarget();
            }
        }
    }
}

export interface LocomotionCallback {
    onTargetReached(): void;

    onStartMoving(normalizedMovDirection?: number[]): void;

    onStartDecelerating(timeTillHalt: number): void;

    onUpdateVelocity(velocity : Vector3, velocityMax : number):void ;
}
