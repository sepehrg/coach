import THREE, { Vector2, Vector3 } from 'three';
import { getWPFromRelative } from '../Helper/Helper';
import MainGL, { RAYCAST_LAYER, RAYCAST_IGONRE_LAYER, SCENE_DISTANCE } from '../IDOScene';

export default class Actor {
  scene: THREE.Scene;
  mainGL: MainGL;
  model: THREE.Object3D | undefined;
  boundingBox: THREE.Object3D | undefined;
  objectName: string;

  public loaded = false;
  private positionVector = new Vector3();

  constructor(mainGL: MainGL) {
    this.scene = mainGL.scene;
    this.mainGL = mainGL;
    this.objectName = 'none';
  }

  public isOnscreen(): boolean {
    // check for z,x
    // [z,x]
    // assuming z positive

    const zVecCamera = new Vector2(1, 0);

    const lowerRightEdge = getWPFromRelative(1, 0, 1);
    const frustumEdgeVectorZX = new Vector2(-lowerRightEdge.z, lowerRightEdge.x);

    const actorPos = this.getActorWorldPos();

    const objectVectorZX = new Vector2(-actorPos.z, actorPos.x);

    const angleZXFrustum = frustumEdgeVectorZX.dot(zVecCamera) / frustumEdgeVectorZX.length();
    const angleZXActor = objectVectorZX.dot(zVecCamera) / objectVectorZX.length();

    return angleZXFrustum < angleZXActor;
  }

  public getActorWorldPos(): Vector3 {
    this.model?.getWorldPosition(this.positionVector);
    return this.positionVector;
  }

  public setActorWorldPosRelative(x: number, y: number, z?: number) {
    if (z === undefined) {
      z = SCENE_DISTANCE;
    }
    this.setActorWorldPos(getWPFromRelative(x, y, z));
  }

  public setActorWorldPos(pos: Vector3) {
    this.model?.position.copy(pos);
  }

  addOnClickCallback(boundingBox: THREE.Object3D) {
    this.boundingBox = boundingBox;
    this.boundingBox.layers.set(RAYCAST_LAYER);
    this.mainGL.registerRaycastReciever(this.boundingBox, this);
  }

  setClickable() {
    if (this.boundingBox) {
      this.boundingBox.layers.set(RAYCAST_LAYER);
    } else {
      // console.log('This object doesent have a bounding box');
    }
  }

  setUnClickable() {
    if (this.boundingBox) {
      this.boundingBox.layers.set(RAYCAST_IGONRE_LAYER);
    } else {
      // console.log('This object doesent have a bounding box');
    }
  }

  // register this actor to recieve tick events
  registerTickReciever() {
    this.mainGL.registerPerTickUpdate(this);
  }

  // on tick -> gets called with delta time since last frame
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTick(_delta: number) {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClick(_position: THREE.Vector2) {
    return;
  }
}
