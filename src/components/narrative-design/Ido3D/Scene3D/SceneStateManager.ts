import { IdoAction } from 'entities/Ido';
import ProjectionSlides from '../Projector/projectorDisplayData';
import IDOScene from './IDOScene';
import {IDO_ANIMATIONS} from "./Objects/Ido";

export const IdoPositions = {
  default: {
    x: 0.9,
    y: 0.9,
  },
  offScreen: {
    x: 1.1,
    y: 0.9,
  },
};

export enum idoScenes {
  DEFAULT = 0,
  DASHBOARD = 1,
  CALENDER = 2,
  FOCUSTIME = 3,
}

const idoDefaultPositions = [
  IdoPositions.offScreen,
  IdoPositions.default,
  IdoPositions.default,
  IdoPositions.offScreen,
];

export default class SceneStateManager {
  private scene: IDOScene;
  private actions: IdoAction[] = [];
  private currentAction: IdoAction | undefined;
  private currentScene = idoScenes.DEFAULT;

  private alreadyContainsActionSet: Set<string> = new Set();

  constructor(scene: IDOScene) {
    this.scene = scene;
  }

  // called when user dismissed the last sclide
  public onProjectorClosing() {
    return;
  }

  // called when projector is closed
  public onProjetorClosed() {
    this.onTopActionRan();
  }

  public playIdoAnimationOnce(animation : IDO_ANIMATIONS) {
    this.scene.ido.playAnimationOnce(animation);
  }

  private getDefaultPosIdo() {
    return idoDefaultPositions[this.currentScene];
  }

  private idoMoveToDefaultPos() {
    const pos = this.getDefaultPosIdo();
    // console.log('asdfasdf -> ' + pos.x + ' : ' + +pos.y);
    this.idoMoveTo(pos.x, pos.y);
  }

  // sets the scene and idos default position
  public setScene(sceneToLoad?: idoScenes) {
    if (sceneToLoad === this.currentScene) return;
    if (!sceneToLoad) sceneToLoad = idoScenes.DEFAULT;
    this.currentScene = sceneToLoad;

    // Todo: reset the alread contains set (this might be just a workaround)
    // this.alreadyContainsActionSet = new Set();

    this.actions = [];
    this.currentAction = undefined;
    this.scene.projector.dismissProjection();
    this.idoMoveToDefaultPos();
  }

  // moves ido out according to the current action
  private idoMoveOut() {
    if (!this.currentAction) {
      return;
    }
    const moveTo = this.outroParser(this.currentAction.outro);
    this.idoMoveTo(moveTo[0], moveTo[1]);
  }

  // create a unique identifier for actions so that it isnt called twice
  private getActionHash(action: IdoAction): string {
    return action.type + action.time + action.id;
  }

  // interface to append an ido action to the current action list
  public addIdoActions(actions: IdoAction[]) {
    actions.forEach((action) => {
      // check if action already has been played
      const actionHash = this.getActionHash(action);
      if (!this.alreadyContainsActionSet.has(actionHash)) {
        this.alreadyContainsActionSet.add(actionHash);
        this.actions.push(action);
        // console.log('ido actions add:' + action.body);
      }
    });
    this.executeActions();
  }

  // overwrite current actions
  public setIdoActions(actions: IdoAction[]) {
    this.actions = [];
    // console.log(actions);
    actions.forEach((element) => {
      this.actions.push(element);
    });
    this.executeActions();
  }

  // function thats called after the last actions is completed
  private onTopActionRan() {
    if (this.actions.length === 0) {
      this.idoMoveOut();
    }
    this.currentAction = undefined;
    if (!this.executeTopIdoAction()) {
      this.idoMoveOut();
    }
  }

  // runs the top action when there is no active action
  private executeActions() {
    if (!this.currentAction) {
      return this.executeTopIdoAction();
    }
    return true;
  }

  // pops the first ido action and runs it
  private executeTopIdoAction(): boolean {
    if (this.actions.length === 0) {
      return false;
    }

    this.currentAction = this.actions.shift();
    if (!this.currentAction || !this.currentAction.messages) {
      return false;
    }

    const pos = this.positionParser(this.currentAction?.position);
    this.idoMoveIn(pos[0], pos[1]);
    const projectorDisplay = new ProjectionSlides();
    projectorDisplay.setupProjectorSlides(
      this.currentAction.messages.map((message) => message.body),
    );
    this.displayProjection(projectorDisplay);
    return true;
  }

  //private animationParser(id: string | undefined) : IDO_ANIMATIONS {
  //  switch (id) {
  //    case
  //  }
  //}

  //parse an action position string to on screen coordinates
  private positionParser(text: string | undefined): number[] {
    if (!text) {
      return [0.5, 0.5];
    }

    switch (text) {
      case 'bottomRight':
        return [0.8, 0.2];
      case 'bottomLeft':
        return [0.2, 0.2];
      case 'topRight':
        return [0.9, 0.9];
      case 'leftCenter':
        return [0.2, 0.5];
      case 'center':
      case 'centerCenter':
        return [0.8, 0.5];
    }
    console.warn('no definition found for ' + text + ' falling back do default position');
    return [0.5, 0.5];
  }

  //parse an outro position string to on screen coordinates
  private outroParser(text: string): number[] {
    switch (text) {
      case 'glideOutToLeft':
        return [-0.1, 0.5];
      case 'glideOutToRight':
      default: {
        const pos = this.getDefaultPosIdo();
        return [pos.x, pos.y];
      }
    }
  }

  // move ido into the scene
  private idoMoveIn(x?: number, y?: number) {
    if (x === undefined) {
      x = IdoPositions.default.x;
    }
    if (y === undefined) {
      y = IdoPositions.default.y;
    }
    // this.setIdoPosition(IdoPositions.offScreen.x, IdoPositions.offScreen.y);
    this.scene.ido.moveTo(x, y);
  }

  // set the position of ido
  private setIdoPosition(x: number, y: number) {
    this.scene.ido.setActorWorldPosRelative(x, y);
  }

  // move ido to given position
  private idoMoveTo(x: number, y: number) {
    // console.log('moveto:' + x + ' : ' + y);
    this.scene.ido.moveTo(x, y);
  }

  // exend projector with given text
  private displayProjection(projectorDisplay: ProjectionSlides): boolean {
    return this.scene.displayProjector(projectorDisplay);
  }
}
