import { IdoAction } from 'entities/Ido';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import MainGL from './IDOScene';
import useStyles from './IdoScene.styles';
import {idoScenes} from './SceneStateManager';

let view = new MainGL();

interface Ido3DSceneProps {
  actions?: IdoAction[];
  scene?: idoScenes;
}

const Ido3DScene: React.FC<Ido3DSceneProps> = (props: Ido3DSceneProps) => {
  const { classes } = useStyles();
  const canvasRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [sceneLoaded, setSceneLoaded] = useState(false);
  const onLoaded = (loaded: boolean) => {
    setSceneLoaded(loaded);
  };

  useEffect(() => {
    if (props.actions && props.actions.length > 0 && view.isLoaded()) {
      setTimeout(() => {
        if (props.actions) view.SceneStateManager.addIdoActions(props.actions);
      }, 600);
    }
  }, [props.actions, sceneLoaded]);

  useEffect(() => {
    if (view.isLoaded()) {
      view.SceneStateManager.setScene(props.scene);
    }
  }, [props.scene, sceneLoaded]);

/*
  useEffect(() => {
    if (view.isLoaded()) {

      let idoTestMessages: IdoMessage = new class implements IdoMessage {
        body: string = "test test test test test test test test test test test test test test test test test test test test test test test test test";
        order: number = 0;
      }
      let idoActionTest: IdoAction = new class implements IdoAction {
        id: string = "a";
        intro: string = "leftCenter";
        messages: IdoMessage[] = [idoTestMessages];
        outro: string = "glideOutToRight";
        position: string = "leftCenter";
        time: Date = new Date;
        type: string = "TEST";
      }
      let actions: IdoAction[] = [idoActionTest];
      view.SceneStateManager.addIdoActions(actions);
  }
  },[sceneLoaded]);
*/

  useEffect(() => {
    if (view == null) {
      view = new MainGL();
    }

    view.onLoadCallback = onLoaded;

    const onmousedown = (event: any) => {
      view.onMouseClick(event);
    };

    const onVisibilityChange = (event : any) => {
      console.log("visibility change");
      view.onDocVisibilityChange(document.hidden);
    };

    console.log('component mount');
    window.addEventListener('mousedown', onmousedown);
    document.addEventListener('visibilitychange', onVisibilityChange);

    const canvas = canvasRef.current;

    canvasRef.current.appendChild(view.renderer.domElement);
    //canvasRef.current.appendChild(view.stats.domElement);
    view.onResume();
    return () => {
      view.onPause();
      window.removeEventListener('mousedown', onmousedown);
      canvas.removeChild(view.renderer.domElement);
      console.log('component unmount');
    };
  }, [canvasRef]);

  return (
    <>
      <div ref={canvasRef} className={classes.ido} />
    </>
  );
};

export default Ido3DScene;
