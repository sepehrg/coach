import config from 'config';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Vector3, Vector4 } from 'three';

// load gltf model
export const loadModel = (modelPath, modelName, scene, onModelDownloaded, actor) => {
  let obj = scene.getObjectByName(modelName);
  if (obj) {
    // console.log('scene already contains object with name ' + modelName);
    return;
  }
  const loader = new GLTFLoader();
  let src = config.BACKEND_URL;
  loader.load(
    src + modelPath,
    function (gltf) {
      gltf.scene.name = modelName;

      onModelDownloaded(gltf, actor);
    },
    function () {
      // console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
      console.error(error);
    },
  );
  return;
};

// get world position relative
let windowEdgesNormal = [];
export const getWPFromRelative = (x, y, distance, camera) => {
  if (windowEdgesNormal.length <= 0) {
    // console.log('recalculate getWPFromRelative');
    windowEdgesNormal.push(
      getViewFrustumEdgeNormalized(1, 1, camera),
      getViewFrustumEdgeNormalized(-1, -1, camera),
    );
  }
  // qubic interpolation
  const posX = (windowEdgesNormal[0].x * x + windowEdgesNormal[1].x * (1 - x)) * distance;
  const posY = (windowEdgesNormal[0].y * y + windowEdgesNormal[1].y * (1 - y)) * distance;
  const posZ = windowEdgesNormal[0].z * distance;
  return new Vector3(posX, posY, posZ);
};

const getViewFrustumEdgeNormalized = (x, y, camera) => {
  let p = new Vector4(x, y, 1, 1); // outermost vertex in view frustum
  p.applyMatrix4(camera.projectionMatrixInverse);
  p.applyMatrix4(camera.matrixWorldInverse);

  return new Vector3(p.x, p.y, p.z).normalize();
};

export const logisticFunction = (x) => {
  return 1 / (1 + Math.pow(4, -10 * (x - 0.5)));
};

// base polynomials for hermite interpolation
const H1 = (x) => {
  return 1 - 3 * x * x + 2 * x * x * x;
};

const H2 = (x) => {
  return 3 * x * x - 2 * x * x * x;
};

const H3 = (x) => {
  return x - 2 * x * x + x * x * x;
};

const H4 = (x) => {
  return -x * x + x * x * x;
};

export const HermiteInterpolation = (y0, y1, derivitiveY0, derivitiveY1, x) => {
  return H1(x) * y0 + H2(x) * y1 + x * H3(x) * derivitiveY0 + x * H4(x) * derivitiveY1;
};
