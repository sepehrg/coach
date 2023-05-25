// GLSL
export const bubblesVertexShader = `

varying vec3 posWS;


void main() {
    vec4 vertexCamSpace = viewMatrix * modelMatrix * vec4(position, 1.0);
    posWS = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * vertexCamSpace;
}
`;

// the definition SPHERE_AMOUNT has to be added on the top
export const bubblesFragmetShader = `
#define TRAVEL_DISTNACE_THRESHOLD 1.0
#define OBJECT_DISTNACE_THRESHOLD 0.02
#define MAX_STEPS 100
#define STEP_LENGTH 0.1
#define THE_PINK vec3(0.89, 0.557, 0.737)



varying vec3 posWS;


struct Sphere{
  vec3 pos;
  float radius;
  float unitAge;
};

uniform float u_time;
uniform Sphere sphere[SPHERE_AMOUNT]; 

float smoothUnionSDF(float distA, float distB, float k ) {
  float h = clamp(0.5 + 0.5*(distA-distB)/k, 0., 1.);
  return mix(distA, distB, h) - k*h*(1.-h); 
}


float minDistance(vec3 pos,out vec3 normal,out int intersectedId) {
  vec3 centerSphere1;
  vec3 centerSphere2;


  float smallestDistance = 10e6;
  float secondSmallestDistance = 0.0;
  for (int i = 0; i < SPHERE_AMOUNT; i++) {
    float d = distance(pos,sphere[i].pos)-sphere[i].radius;
    if (d < smallestDistance) {
      intersectedId=i;
      secondSmallestDistance = smallestDistance;
      smallestDistance = d;
      centerSphere2 = centerSphere1;
      centerSphere1=sphere[i].pos;
    } else if(d < secondSmallestDistance) {
      secondSmallestDistance = d;
      centerSphere2=sphere[i].pos;
    }
  }

  //calcualte normal
  float distanceSmallN = (smallestDistance/secondSmallestDistance)-0.5;
  vec3 normalCloser = normalize(pos-centerSphere1);
  vec3 normalFarer = normalize(pos-centerSphere2);
  normal = normalize(mix(normalCloser,normalFarer,clamp(distanceSmallN,0.0,1.0)));

  return smoothUnionSDF(smallestDistance,secondSmallestDistance,0.3);
}


float raymarch(vec3 pos, vec3 direction, out vec3 intersection,  out vec3 normal) {
  float d_total = 0.0;
  float visible = 0.0;
  int intersectedId = 0;
  for (int i = 0; i < MAX_STEPS; i++) {
    //calculateDistance
    float d = minDistance(pos, normal,intersectedId);
    if (d < OBJECT_DISTNACE_THRESHOLD) {
      intersection = pos;
      visible=1.0;
      d_total+=abs(d);
    }
    pos = pos + direction*STEP_LENGTH;
  }
  return clamp(1.0-d_total*10.0,0.0,1.0)*visible;
}


void main() {

  vec3 ray = normalize(posWS-cameraPosition);
  vec3 intersection;
  vec3 normal;
  float d = raymarch(posWS,ray,intersection,normal);
  gl_FragColor  = vec4(THE_PINK, d);
  float isBubble = float(d > 0.0); 
  gl_FragDepth = isBubble*gl_FragCoord.z + 1.0 * (1.0 - isBubble);
}
`;
