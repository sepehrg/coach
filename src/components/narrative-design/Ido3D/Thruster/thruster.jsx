import { Vector2, Vector3 } from 'three';

const LIFE_EXPECENTCY_MIN = 1.0;
const LIFE_EXPECENTCY_MAX = 2.5;

const getRandomVectorInCone = (coneHeight, coneBaseRadius) => {
  let zy = new Vector2()
    .random()
    .subScalar(0.5)
    .multiplyScalar(coneBaseRadius * 2);
  return new Vector3(zy.x, coneHeight, zy.y);
};

const resetBubble = (bubble, spawnPos) => {
  // console.log(spawnPos);
  bubble.pos.copy(spawnPos);
  bubble.velocity.set(0, 0, 0);
  bubble.normalizedDirection.copy(getRandomVectorInCone(-5, 3).normalize());
  bubble.acceleration.set(0, 0, 0);
  bubble.radius = 0.001;
  bubble.age = 0.0;
  bubble.lifeExpectency =
    LIFE_EXPECENTCY_MIN + Math.random() * (LIFE_EXPECENTCY_MAX - LIFE_EXPECENTCY_MIN);
  bubble.unitAge = 0.0;
  return bubble;
};

export const getBubblesArray = (amount) => {
  let bubbles = [];
  for (let i = 0; i < amount; i++) {
    let bubble = {
      pos: new Vector3(),
      normalizedDirection: new Vector3(),
      velocity: new Vector3(),
      acceleration: new Vector3(),
      radius: 0.0,
      age: 0.0,
      lifeExpectency: 0.0,
      unitAge: 0.0,
    };

    bubbles.push(resetBubble(bubble, new Vector3(100, 100, 100)));
  }
  return bubbles;
};

export const animateBubbles = (bubblesRef, dTime, thrusterPosition) => {
  bubblesRef.forEach((bubble) => {
    bubble.age += dTime;
    bubble.acceleration.copy(
      bubble.normalizedDirection.multiplyScalar(1 - thrusterPosition.distanceTo(bubble.pos)),
    );
    // explicit euler to update position
    bubble.velocity.addScaledVector(bubble.acceleration, dTime);
    bubble.pos.addScaledVector(bubble.velocity, dTime);
    bubble.unitAge = bubble.age / bubble.lifeExpectency;
    if (thrusterPosition.distanceTo(bubble.pos) > 2 || bubble.lifeExpectency < bubble.age) {
      resetBubble(bubble, thrusterPosition);
    }
  });
};
