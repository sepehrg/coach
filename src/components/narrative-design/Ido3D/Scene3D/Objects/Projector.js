/* eslint-disable camelcase */
import Actor from './Actor.ts';
import {
  projectorVertexShader,
  projectorFragmentShader,
} from '../../Projector/idoProjectorShader.jsx';
import * as projectorStripes from '../../../../../assets/images/shader/projector-background-stripes.png';
import * as projectorBox from '../../../../../assets/images/shader/projector-single-pixel.png';
import { logisticFunction, loadModel } from '../Helper/Helper.js';
import {
  Vector3,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  TextureLoader,
  RepeatWrapping,
  CanvasTexture,
  UVMapping,
} from 'three';

const PROJECTOR_NAME = 'projector';
const PROJECTOR_OPEN_SPEED = 2;
const PROJECTOR_CLOSE_SPEED = 2;

const projectorStates = {
  closed: 0,
  open: 1,
  opening: 2,
  closing: 3,
};

export default class Projector extends Actor {
  constructor(mainGL) {
    super(mainGL);

    this.bones = {
      center: null,
      right: null,
      right_lower: null,
      right_upper: null,
      left: null,
      left_upper: null,
      left_lower: null,
    };

    this.uniforms_projector = {
      u_strength: {
        value: 0.1,
      },
      u_aspectRatio: {
        value: 1.0,
      },
      u_text_texture: {
        value: null,
      },
      u_texture_box: {
        value: null,
      },
      u_texture_background_lines: {
        value: null,
      },
      dist_to_edge: {
        value: 0.01,
      },
      time: {
        value: 0,
      },
    };

    this.projectorExtensionBoneRef = null;

    this.projectorPosition = new Vector3();
    this.projectionScreen = null;
    this.currentProjectionText = null;

    // current state of animation
    this.projectorState = projectorStates.closed;

    this.projectorExtended = 0;
    loadModel(
      '/storage/projector.glb',
      'PROJECTOR_MODEL',
      this.scene,
      this.onProjectorLoaded,
      this,
    );
  }

  setProjectorPosition(pos) {
    this.projectorPosition.copy(pos);
  }

  onProjectorLoaded(gltf, projector) {
    projector.model = gltf.scene;
    projector.model.traverse((child) => {
      switch (child.name) {
        case 'center':
          projector.bones.center = child;
          break;
        case 'right':
          projector.bones.right = child;
          break;
        case 'right_lower':
          projector.bones.right_lower = child;
          break;
        case 'right_upper':
          projector.bones.right_upper = child;
          break;
        case 'left':
          projector.bones.left = child;
          break;
        case 'left_lower':
          projector.bones.left_lower = child;
          break;
        case 'left_upper':
          projector.bones.left_upper = child;
          break;
        default:
          break;
      }
    });
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);
    projector.model.getObjectByName('center').add(cube);
    projector.addOnClickCallback(cube);
    // projector.setUnClickable();
    projector.scene.add(projector.model);
    projector.createProjector();
    projector.registerTickReciever();

    projector.loaded = true;
    projector.mainGL.onLoaded();
  }

  createProjector() {
    let geometry = new PlaneGeometry(1, 1);
    let material = new ShaderMaterial({
      uniforms: this.uniforms_projector,
      vertexShader: projectorVertexShader,
      fragmentShader: projectorFragmentShader,
    });

    material.transparent = true;
    this.projectionScreen = new Mesh(geometry, material);
    let u_texture_box = new TextureLoader().load(projectorBox.default);
    u_texture_box.wrapS = RepeatWrapping;
    u_texture_box.wrapT = RepeatWrapping;
    let u_texture_background_lines = new TextureLoader().load(projectorStripes.default);
    u_texture_background_lines.wrapS = RepeatWrapping;
    u_texture_background_lines.wrapT = RepeatWrapping;

    this.projectionScreen.material.uniforms.u_texture_box.value = u_texture_box;
    this.projectionScreen.material.uniforms.u_texture_background_lines.value =
      u_texture_background_lines;

    this.projectionScreen.material.uniforms.u_aspectRatio.value = 1.0;

    this.projectionScreen.position.copy(this.projectorPosition);
    this.projectionScreen.visible = false;
    this.projectionScreen.name = PROJECTOR_NAME;

    this.scene.add(this.projectionScreen);
  }

  applyProjectionAnimation(state) {
    if (state < 0.7) {
      this.projectionScreen.scale.lerpVectors(
        this.projectorExtensionBoneRef.start.projectionScreenScale,
        this.projectorExtensionBoneRef.middle.projectionScreenScale,
        logisticFunction(state * 2),
      );
    } else {
      this.projectionScreen.scale.lerpVectors(
        this.projectorExtensionBoneRef.middle.projectionScreenScale,
        this.projectorExtensionBoneRef.end.projectionScreenScale,
        logisticFunction((state - 0.7) * 4),
      );
    }

    this.bones.left.position.lerpVectors(
      this.projectorExtensionBoneRef.start.projectorLeft,
      this.projectorExtensionBoneRef.end.projectorLeft,
      logisticFunction(state * 2),
    );

    this.bones.right.position.lerpVectors(
      this.projectorExtensionBoneRef.start.projectorRight,
      this.projectorExtensionBoneRef.end.projectorRight,
      logisticFunction(state * 2),
    );

    this.bones.right_upper.position.lerpVectors(
      this.projectorExtensionBoneRef.start.projectorTop,
      this.projectorExtensionBoneRef.end.projectorTop,
      logisticFunction(state),
    );

    this.bones.left_upper.position.lerpVectors(
      this.projectorExtensionBoneRef.start.projectorTop,
      this.projectorExtensionBoneRef.end.projectorTop,
      logisticFunction(state),
    );

    this.bones.right_lower.position.lerpVectors(
      this.projectorExtensionBoneRef.start.projectorBottom,
      this.projectorExtensionBoneRef.end.projectorBottom,
      logisticFunction(state),
    );

    this.bones.left_lower.position.lerpVectors(
      this.projectorExtensionBoneRef.start.projectorBottom,
      this.projectorExtensionBoneRef.end.projectorBottom,
      logisticFunction(state),
    );
  }

  // replaced by projectorDisplayData class
  // format string to fit projection
  getProjectorFromText(text, canvas, startVertical) {
    const characterLength = 17 * 3;
    const characterHeight = 30 * 3;
    const newLineSpace = 6 * 3;
    const charPerLine = 30;

    const words = text.split(' ');

    let lines = [];

    let currentLine = '';
    words.forEach((word) => {
      if (currentLine.length + word.length < charPerLine) {
        currentLine = currentLine + word + ' ';
      } else {
        lines.push(currentLine);
        currentLine = word + ' ';
      }
    });

    if (currentLine !== '' && currentLine !== ' ') {
      lines.push(currentLine);
    }

    canvas.width = characterLength * charPerLine;
    canvas.height = (lines.length + 1) * (characterHeight + newLineSpace);
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let x = startVertical;
    let y = (newLineSpace + characterHeight) * 1.25;

    ctx.font = characterHeight + 'px Montserrat';
    ctx.fillStyle = '#000';

    lines.forEach((line) => {
      ctx.fillText(line, x, y);
      y += characterHeight + newLineSpace;
    });

    return {
      x: canvas.width,
      y: canvas.height,
    };
  }

  extendProjection(projectionText, centerPos) {
    if (this.currentProjectionText != null) {
      console.warn('there still is a current projection, wont overwrite');
      return false;
    }
    if (this.projectorState !== projectorStates.closed) {
      console.warn('! cant extend projection !');
      return false;
    }

    this.currentProjectionText = projectionText;
    this.currentProjectionText.drawCurrentPage();

    let textTexture = new CanvasTexture(this.currentProjectionText.cavas, UVMapping);
    let texBoxProps = this.currentProjectionText.getCanvasDimensions();

    this.projectionScreen.position.copy(centerPos);
    this.model.traverse(() => {
      return;
    });

    this.bones.center.position.copy(centerPos);
    this.bones.right.position.copy(new Vector3(0, 0, 0));
    this.bones.left.position.copy(new Vector3(0, 0, 0));

    this.projectionScreen.material.uniforms.u_aspectRatio.value = texBoxProps.y / texBoxProps.x;
    this.projectionScreen.material.uniforms.u_text_texture.value = textTexture;

    this.projectionScreen.visible = true;

    this.projectorExtended = 0;
    const SCALE_DIVISOR = 400;

    // update bouding box
    this.boundingBox.scale.copy(
      new Vector3(0.1, texBoxProps.y / SCALE_DIVISOR, texBoxProps.x / SCALE_DIVISOR),
    );
    this.setClickable();

    this.projectorExtensionBoneRef = {
      start: {
        projectionScreenScale: new Vector3(0, 0, 0),
        projectorLeft: new Vector3(0, 0, 0),
        projectorRight: new Vector3(0, 0, 0),
        projectorTop: new Vector3(0, 0.0, 0),
        projectorBottom: new Vector3(0, 0.0, 0),
      },
      middle: {
        projectionScreenScale: new Vector3(texBoxProps.x / 300, texBoxProps.y / 1500, 0),
      },
      end: {
        projectionScreenScale: new Vector3(
          texBoxProps.x / SCALE_DIVISOR,
          texBoxProps.y / SCALE_DIVISOR,
          0.0,
        ),
        projectorLeft: new Vector3(0, 0, -texBoxProps.x / (SCALE_DIVISOR * 2), 0 - 0.4),
        projectorRight: new Vector3(0, 0, texBoxProps.x / (SCALE_DIVISOR * 2), 0 + 0.4),
        projectorTop: new Vector3(texBoxProps.y / (SCALE_DIVISOR * 2), 0, 0),
        projectorBottom: new Vector3(-texBoxProps.y / (SCALE_DIVISOR * 2), 0, 0),
      },
    };
    this.model.visible = true;
    this.projectionScreen.visible = true;

    this.applyProjectionAnimation(0);
    this.projectorState = projectorStates.opening;
    return true;
  }

  getProjectorEdgesWS() {
    let left = new Vector3()
      .copy(this.bones.center.position)
      .add(this.projectorExtensionBoneRef.end.projectorLeft);
    let right = new Vector3()
      .copy(this.bones.center.position)
      .add(this.projectorExtensionBoneRef.end.projectorRight);
    return {
      left: left,
      right: right,
    };
  }

  updatePorjectionText() {
    if (this.projectorState !== projectorStates.open) {
      console.warn('cant update text on unopened projection screen');
      return;
    }
    let textTexture = new CanvasTexture(this.currentProjectionText.cavas, UVMapping);
    this.projectionScreen.material.uniforms.u_text_texture.value = textTexture;
  }

  dismissProjection() {
    if (
      this.projectorState === projectorStates.closed ||
      this.projectorState === projectorStates.closing
    ) {
      return;
    }
    this.projectorExtended = 1;
    this.projectorState = projectorStates.closing;
    this.currentProjectionText = null;
    this.setUnClickable();
    this.mainGL.SceneStateManager.onProjectorClosing();
  }

  onTick(d) {
    this.projectionScreen.material.uniforms.time.value = this.mainGL.getTimeSinceStart() * 1000;
    if (this.projectorState === projectorStates.opening) {
      this.applyProjectionAnimation(this.projectorExtended);

      this.projectorExtended += d * PROJECTOR_OPEN_SPEED;
      if (this.projectorExtended >= 1) {
        this.projectorState = projectorStates.open;
        this.applyProjectionAnimation(1);
      }
    } else if (this.projectorState === projectorStates.closing) {
      this.applyProjectionAnimation(this.projectorExtended);
      this.projectorExtended -= d * PROJECTOR_CLOSE_SPEED;
      // closed
      if (this.projectorExtended <= 0) {
        this.projectorState = projectorStates.closed;
        this.applyProjectionAnimation(0);
        this.model.visible = false;
        this.projectionScreen.visible = false;
        this.mainGL.SceneStateManager.onProjetorClosed();
      }
    }
  }

  onClick() {
    if (this.currentProjectionText != null) {
      if (this.currentProjectionText.hasNextPage()) {
        this.currentProjectionText.loadNextPage();
        this.updatePorjectionText();
      } else {
        this.dismissProjection();
      }
    }
  }
}
