import {
  Clock,
  Scene,
  WebGLRenderer,
  Raycaster,
  PerspectiveCamera,
  Vector2,
  Object3D,
} from 'three';
import Ido from './Objects/Ido';
import { getWPFromRelative } from './Helper/Helper';
import { runSetup } from './LightSetup';
import Projector from './Objects/Projector';
import projectorDisplayData from '../Projector/projectorDisplayData';
import Actor from './Objects/Actor';
import SceneStateManager from './SceneStateManager';
import Stats from 'three/examples/jsm/libs/stats.module'

const clock = new Clock();

export const SCENE_DISTANCE = 16;
export const RAYCAST_LAYER = 2;
export const RAYCAST_IGONRE_LAYER = 3;

export default class MainGL {
  scene = new Scene();
  renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderSize: {
    x: number;
    y: number;
  };

  public stats = Stats();
  raycaster = new Raycaster();
  camera: PerspectiveCamera;
  raycastRecieverMap = new Map();
  raycastRecievers: Object3D[] = [];
  perTickUpdateRecievers: Actor[] = [];
  timePassed = 0;

  running = false;

  private stateManager = new SceneStateManager(this);
  public onLoadCallback: ((loaded: boolean) => void) | undefined;

  // objects
  ido: Ido;
  projector: Projector;

  constructor() {
    // console.log('!!Construct new MAIN GL!!');
    const width =
      document.documentElement.clientWidth < 1366 ? document.documentElement.clientWidth : 1366;
    const height = document.documentElement.clientHeight;
    this.renderSize = {
      x: width,
      y: height,
    };
    this.renderer.setSize(this.renderSize.x, this.renderSize.y);
    // console.log(document.documentElement.clientWidth);
    // scale render resolution here
    this.setRenderScaling(1.0);

    // constant utility
    this.raycaster.layers.set(RAYCAST_LAYER);

    // setup Camera
    this.camera = new PerspectiveCamera(25, this.renderSize.x / this.renderSize.y, 0.1, 100);
    this.camera.position.set(0, 0, 0);

    this.running = true;
    this.update();

    runSetup(this, SCENE_DISTANCE);

    this.ido = new Ido(this);
    this.projector = new Projector(this);
  }

  // check if scene has loaded
  public isLoaded() {
    return this.ido.loaded && (this.projector as unknown as { loaded: boolean }).loaded;
  }

  // load dependen scene component should call this to deferr actions until they are loaded
  public onLoaded() {
    if (this.onLoadCallback) this.onLoadCallback(this.isLoaded());
  }

  setRenderScaling(scale: number) {
    this.renderer.setPixelRatio(window.devicePixelRatio * scale);
  }

  public get SceneStateManager(): SceneStateManager {
    return this.stateManager;
  }

  // called when component gets unmounted
  onPause() {
    // console.log('pause 3D scene');
    clock.stop();
    this.running = false;
  }

  // called when component gets mounted
  onResume() {
    clock.start();
    if (!this.running) {
      // console.log('resume 3D scene');
      this.running = true;
      this.update();
    }
  }



  ////// react interfaces //////

  onMouseClick(event: MouseEvent) {
    const x =
      ((event.clientX - (document.documentElement.clientWidth - this.renderSize.x) / 2) /
        this.renderSize.x) *
        2 -
      1;
    const y = -((event.clientY / this.renderSize.y) * 2 - 1);
    this.raycast(x, y);
  }

  onDocVisibilityChange(hidden: boolean) {
    if(hidden) {
      this.onPause();
    } else {
      this.onResume();
    }
  }

  displayProjector(projectorSlides: projectorDisplayData): boolean {
    return this.projector.extendProjection(
      projectorSlides,
      getWPFromRelative(0.5, 0.5, SCENE_DISTANCE),
    );
  }

  // //// actor register interfaces //////

  registerPerTickUpdate(actor: Actor) {
    this.perTickUpdateRecievers.push(actor);
  }

  registerRaycastReciever(boundingBox: Object3D, actor: Actor) {
    this.raycastRecievers.push(boundingBox);
    this.raycastRecieverMap.set(boundingBox.uuid, actor);
  }

  // //// get world information //////

  getWPRelative(x: number, y: number, distance: number) {
    return getWPFromRelative(x, y, distance, this.camera);
  }

  getTimeSinceStart() {
    return this.timePassed;
  }

  // /////////////////////////////////////

  // only first object is informed
  raycast(screenX: number, screenY: number) {
    const pointer = new Vector2(screenX, screenY);

    this.raycaster.setFromCamera(pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.raycastRecievers, false);
    if (intersects.length > 0) {
      this.raycastRecieverMap.get(intersects[0].object.uuid).onClick(pointer);
    }
  }

  // //// RENDER LOOP //////
  update() {
    const d = clock.getDelta();
    this.timePassed += d;
    this.stats.update();

    this.perTickUpdateRecievers.forEach((actor) => {
      actor.onTick(d);
    });
    this.renderer.render(this.scene, this.camera);

    if (this.running) {
      requestAnimationFrame(this.update.bind(this));
    } else {
      // console.log('Stop animation clycle');
    }
  }
}
