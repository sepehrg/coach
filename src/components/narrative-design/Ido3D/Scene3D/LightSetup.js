import { AmbientLight, RectAreaLight } from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

const skyLightColor = 0xa5c1c2;
const lightMainColor = 0xffffff;
const lightBackColor = 0x5869f1;
const lightBackScreenColor = 0x895ea5;

export const runSetup = (mainGL, distance) => {
  if (mainGL.scene.getObjectByName('sky_ligth')) {
    return;
  }

  const skyLight = new AmbientLight(skyLightColor);
  skyLight.name = 'sky_ligth';

  RectAreaLightUniformsLib.init();

  let screenWidth = mainGL
    .getWPRelative(0, 1, distance)
    .distanceTo(mainGL.getWPRelative(1, 1, distance));

  let screenHight = mainGL
    .getWPRelative(0, 0, distance)
    .distanceTo(mainGL.getWPRelative(0, 1, distance));

  const lightMain = new RectAreaLight(lightMainColor, 1.8, screenWidth * 2, screenWidth * 2);

  lightMain.position.copy(mainGL.getWPRelative(0.5, 1.5, distance / 2));
  lightMain.lookAt(mainGL.getWPRelative(0.5, 0.5, distance));
  lightMain.name = 'main_light';

  const lightSecundary = new RectAreaLight(lightBackColor, 1, screenWidth * 2, screenWidth);
  lightSecundary.position.copy(mainGL.getWPRelative(1, 0.4, distance + 6));
  lightSecundary.lookAt(mainGL.getWPRelative(0.5, 0.5, distance));
  lightSecundary.name = 'secundary_light';
  // x-left/right y-up/down z

  // backlight
  const lightBackdrop = new RectAreaLight(lightBackScreenColor, 2, screenWidth, screenHight);

  lightBackdrop.position.copy(mainGL.getWPRelative(0.5, 0.5, distance + 3));
  lightBackdrop.lookAt(mainGL.getWPRelative(0.5, 0.5, distance / 2));
  lightBackdrop.name = 'backdrop_light';

  // const helper = new RectAreaLightHelper( lightBackdrop );
  // lightBackdrop.add( helper )

  mainGL.scene.add(skyLight, lightMain, lightSecundary, lightBackdrop);
};
