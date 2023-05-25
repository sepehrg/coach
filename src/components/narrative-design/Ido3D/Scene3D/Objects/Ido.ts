import Actor from './Actor';
import { loadModel } from '../Helper/Helper';
import IDOScene, { SCENE_DISTANCE } from '../IDOScene';
import { bubblesVertexShader, bubblesFragmetShader } from '../../Thruster/idoBubblesShader';
import { getBubblesArray, animateBubbles } from '../../Thruster/thruster';
import LocomotionSystem, { LocomotionCallback } from '../Helper/LocomotionSystem';
import { IdoPositions } from '../SceneStateManager';
import {
  Vector3,
  AnimationMixer,
  Box3,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  SphereGeometry,
  AnimationAction,
  ShaderMaterial,
  Object3D,
  Vector2,
  LoopOnce,
  AnimationUtils,
  AdditiveAnimationBlendMode,
} from 'three';

const THRUSTERS_NAME = 'BUBBLES_EFFECT';

export enum IDO_ANIMATIONS {
  IDLE = 0,
  IDLE_HAPPY = 1,
  SAD = 2,
  APPLAUSE = 3,
  PROUD = 4,
  OBSERVING = 5,
  FLYING = 6,
  ACCELERATING = 7,
  DECELERATING = 8,
  LEFT = 9,
  RIGHT = 10,
  UP = 11,
  DOWN = 12,
  FLY_ADD = 13,
}

export default class Ido extends Actor implements LocomotionCallback {
  mixer: AnimationMixer | undefined;
  private animations: AnimationAction[] = [];
  private worldPosThruster: Vector3;
  private thrusterMesh: Mesh | undefined;
  private uniformsBubbles = {
    sphere: {
      value: [],
    },
  };
  private thrusterBone: Object3D | undefined;
  private thrusterBubblesMat: ShaderMaterial | undefined;

  private idoLocomotionSystem = new LocomotionSystem(this);

  constructor(mainGL: IDOScene) {
    super(mainGL);
    this.worldPosThruster = new Vector3();
    loadModel('/storage/ido_new_anim.glb', 'IDO', this.scene, this.onIdoModelLoaded, this);
  }


  private idoSetDirection(x: number, y: number) {
    if (x > 0) {
      this.getIdoAnimation(IDO_ANIMATIONS.RIGHT)?.setEffectiveWeight(x).play();
    } else {
      this.getIdoAnimation(IDO_ANIMATIONS.LEFT)?.setEffectiveWeight(-x).play();
    }

    if (y > 0) {
      this.getIdoAnimation(IDO_ANIMATIONS.UP)?.setEffectiveWeight(y).play();
    } else {
      this.getIdoAnimation(IDO_ANIMATIONS.DOWN)?.setEffectiveWeight(-y).play();
    }
  }

  private direction = new Vector2();
  onUpdateVelocity(velocity : Vector3, velocityMax : number) {
    this.direction.set(velocity.x,velocity.y).divideScalar(velocityMax);
    this.idoSetDirection(this.direction.x,this.direction.y);
  }

  onStartDecelerating(timeTillHalt: number): void {
    console.log("START DECELERATION");
    this.getIdoAnimation(IDO_ANIMATIONS.FLY_ADD)?.reset().fadeOut(timeTillHalt);

    this.getIdoAnimation(IDO_ANIMATIONS.IDLE)?.reset().play().fadeIn(timeTillHalt);
  }

  onTargetReached(): void {
    console.log("TARGET REACHED");

    this.getIdoAnimation(IDO_ANIMATIONS.LEFT)?.stop();
    this.getIdoAnimation(IDO_ANIMATIONS.RIGHT)?.stop();
    this.getIdoAnimation(IDO_ANIMATIONS.UP)?.stop();
    this.getIdoAnimation(IDO_ANIMATIONS.DOWN)?.stop();
    this.getIdoAnimation(IDO_ANIMATIONS.FLY_ADD)?.stop();
    if(!this.getIdoAnimation(IDO_ANIMATIONS.IDLE)?.isRunning()) {
      this.getIdoAnimation(IDO_ANIMATIONS.IDLE)?.reset().play();
    } else {
      this.getIdoAnimation(IDO_ANIMATIONS.IDLE)?.setEffectiveWeight(1).play();
    }


  }

  onStartMoving(normalizedMovDirection: number[]) {
   console.log("START MOVING");

    this.getIdoAnimation(IDO_ANIMATIONS.IDLE)?.setEffectiveWeight(1).fadeOut(0.3);
    this.getIdoAnimation(IDO_ANIMATIONS.FLY_ADD)?.reset().fadeIn(0.3).play();

    this.getIdoAnimation(IDO_ANIMATIONS.LEFT)?.reset().setEffectiveWeight(0).play();
    this.getIdoAnimation(IDO_ANIMATIONS.RIGHT)?.reset().setEffectiveWeight(0).play();
    this.getIdoAnimation(IDO_ANIMATIONS.UP)?.reset().setEffectiveWeight(0).play();
    this.getIdoAnimation(IDO_ANIMATIONS.DOWN)?.reset().setEffectiveWeight(0).play();
  }

  public playAnimationOnce(animation : IDO_ANIMATIONS) {
    let animClip = this.getIdoAnimation(animation);
    if (!animClip) {
      console.error("no animation clip found for enum: " +animation);
      return;
    }
    console.log("play animation "+animClip.getClip().duration);

    this.getIdoAnimation(IDO_ANIMATIONS.IDLE)?.startAt(animClip.getMixer().time + animClip.getClip().duration).play();
    animClip.setLoop(LoopOnce,1).reset().play();
    //this.getIdoAnimation(IDO_ANIMATIONS.IDLE)?.crossFadeTo(animClip,0.2,true);
    //this.getIdoAnimation(IDO_ANIMATIONS.IDLE)?.startAt(animClip.getClip().duration);
  }

  public addIdoAnimation(animation: THREE.AnimationAction) {
    this.animations.push(animation);
  }

  public getIdoAnimation(animation: IDO_ANIMATIONS): THREE.AnimationAction | undefined {
    return this.animations[animation];
  }

  public moveTo(x: number, y: number, z?: number) {
    if (z === undefined) {
      z = SCENE_DISTANCE;
    }
    this.idoLocomotionSystem.moveToRelative(x, y, z);
  }

  private onIdoModelLoaded(gltf: any, ido: Ido) {
    ido.model = gltf.scene;
    if (!ido.model) return;
    ido.mixer = new AnimationMixer(ido.model);

    gltf.animations.forEach((anim: THREE.AnimationClip) => {
      if (anim.name.includes("_add")) {
        AnimationUtils.makeClipAdditive(anim);
        ido.addIdoAnimation(ido.mixer!.clipAction(anim,undefined,AdditiveAnimationBlendMode));
      } else {
        ido.addIdoAnimation(ido.mixer!.clipAction(anim));
      }
    });

    ido.getIdoAnimation(IDO_ANIMATIONS.IDLE)?.play();
    //console.log('compile scene');

    ido.scene.add(ido.model);
    ido.setActorWorldPos(
      ido.mainGL.getWPRelative(IdoPositions.offScreen.x, IdoPositions.offScreen.x, SCENE_DISTANCE),
    ); // <- defines ido pos
    // console.log('compilation time: ' + (Date.now() - s) + 'ms');

    const cubeBbox = new Box3();
    cubeBbox.setFromObject(ido.model);
    // console.log(cube_bbox.min);
    const mid = cubeBbox.max;
    mid.sub(cubeBbox.min);
    mid.multiplyScalar(1);
    const geometry = new BoxGeometry(mid.x, mid.y, mid.z);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);
    ido.model.getObjectByName('Neck')?.add(cube);

    ido.addOnClickCallback(cube);
    ido.registerTickReciever();
    ido.createThruster();

    ido.loaded = true;
    ido.mainGL.onLoaded();
  }

  private createThruster() {
    const bubbles = getBubblesArray(25);

    const sphereAmountGLSLDefinition = '#define SPHERE_AMOUNT ' + bubbles.length + '\n';

    this.thrusterBubblesMat = new ShaderMaterial({
      uniforms: this.uniformsBubbles,

      vertexShader: bubblesVertexShader,

      fragmentShader: sphereAmountGLSLDefinition + bubblesFragmetShader,
    });
    this.thrusterBubblesMat.transparent = true;

    const geometry = new SphereGeometry(0.5, 12, 8);
    geometry.translate(0, -0.5, 0);

    this.thrusterMesh = new Mesh(geometry, this.thrusterBubblesMat);
    this.thrusterMesh.name = THRUSTERS_NAME;
    this.thrusterBubblesMat.uniforms.sphere.value = bubbles;

    this.thrusterBone = this.model?.getObjectByName('plasma');
    this.thrusterBone?.add(this.thrusterMesh);
  }

  onTick(d: number) {
    this.mixer?.update(d);
    this.thrusterBone?.getWorldPosition(this.worldPosThruster);
    animateBubbles(this.thrusterBubblesMat?.uniforms.sphere.value, d, this.worldPosThruster);
    this.idoLocomotionSystem.onTickLocomotion(d);
  }
}
