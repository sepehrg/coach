// GLSL
export const projectorVertexShader = `
varying vec3 v_position;
varying vec2 v_texcoord;

void main() {
    vec4 vertexCamSpace = viewMatrix * modelMatrix * vec4(position, 1.0);
    v_position = (modelMatrix * vec4(position, 1.0)).xyz;
    v_texcoord = uv;
    gl_Position = projectionMatrix * vertexCamSpace;
}
`;

export const projectorFragmentShader = `

varying vec3 v_position;
varying vec2 v_texcoord;

uniform float u_strength;
uniform float u_aspectRatio;
uniform float dist_to_edge;
uniform sampler2D u_text_texture;
uniform sampler2D u_texture_box;
uniform sampler2D u_texture_background_lines;
uniform float time;


#define FUTURISTIC_BLUE vec3(0.2745, 0.6078, 0.6549)
#define FUTURISTIC_BLUE_BRIGHT vec3(0.7451, 0.8824, 0.898)
#define FUTURISTIC_DARK_PURPLE vec3(0.1804, 0.0941, 0.2118)

#define IDO_PURPLE vec3(0.2980,0.1333,0.3882)*0.8
#define IDO_BLUE vec3(0.1411,0.2156,0.3882)*0.8


vec2 get_uv_scaled(float tiling) {
    return vec2(v_texcoord.x*tiling,v_texcoord.y*tiling*u_aspectRatio);
}

#define BACKGROUND_LINES_AMOUNT 4

float background_lines() {
    float sum = 0.0;
    #pragma unroll_loop_start
    for (int i = 1; i < BACKGROUND_LINES_AMOUNT+1; i++) {
        sum+=texture2D(u_texture_background_lines,
        get_uv_scaled(float(i))+vec2(0.0,-1.0)*time*0.0001).r;
    }
    #pragma unroll_loop_end

    return sum;
}


float background_boxes(float tiling) {
    return 1.0 - texture2D(u_texture_box,get_uv_scaled(tiling)).x;
}

#define TEXT_LAYER_AMOUNT 4
#define TEXT_LAYER_VECTOR vec2(0.003,0.003)

float text_layered() {
    float text = 0.0;
    #pragma unroll_loop_start
    for (int i = 0; i < TEXT_LAYER_AMOUNT; i++) {
        text+= (1.0 - texture2D(u_text_texture,v_texcoord + float(i) * TEXT_LAYER_VECTOR).x)
         * float(TEXT_LAYER_AMOUNT - i) / float(TEXT_LAYER_AMOUNT);
    }
    #pragma unroll_loop_end
    return text;
}

float distance_to_edge() {
    float f = clamp(0.0,1.0,v_texcoord.x * (1.0/(dist_to_edge*u_aspectRatio))) *
    clamp(0.0,1.0,(1.0-v_texcoord.x) * (1.0/(dist_to_edge*u_aspectRatio))) *
    clamp(0.0,1.0,v_texcoord.y * (1.0/dist_to_edge)) *
    clamp(0.0,1.0,(1.0-v_texcoord.y) * (1.0/dist_to_edge)) ;
    f = pow(f,2.0);
    return f;
}


void main() {
    
    float edge = distance_to_edge();
    vec3 text = mix(IDO_PURPLE,IDO_BLUE,v_texcoord.y);
    text+= 0.7 * background_lines() * FUTURISTIC_DARK_PURPLE;
    text*=background_boxes(100.0);

    text+= mix(FUTURISTIC_BLUE_BRIGHT*1.0,
        text_layered() * FUTURISTIC_BLUE * 0.3,
        texture2D(u_text_texture,v_texcoord).x);
    gl_FragColor = vec4(text,edge);
    
    //gl_FragColor = vec4(vec3(background_boxes(10.0)),1.0);
}
`;

/**
#version 300 es

precision highp float;

in vec4 v_position;
in vec2 v_texcoord;

uniform float u_strength;
uniform float u_aspectRatio;
uniform sampler2D u_texture_0;
uniform sampler2D u_texture_box;


uniform int time;

out vec4 fragColor;

const float dist_to_edge = 0.05;
const vec4 background_color = vec4(0.2,0.3,0.9,1.0);



float background_boxes() {
    return 1.0 - texture(u_texture_box,vec2(v_texcoord.x*20.0,v_texcoord.y*20.0*u_aspectRatio)).x;
}

#define FUTURISTIC_BLUE vec3(0.2745, 0.6078, 0.6549)
#define FUTURISTIC_BLUE_BRIGHT vec3(0.7451, 0.8824, 0.898)


#define TEXT_LAYER_AMOUNT 5
#define TEXT_LAYER_VECTOR vec2(0.005,0.005)

float text_layered() {
    float text = 0.0;
    for (int i = 0; i < TEXT_LAYER_AMOUNT; i++) {
        text+= (1.0 - texture(u_texture_0,v_texcoord + float(i) * TEXT_LAYER_VECTOR).x) * float(TEXT_LAYER_AMOUNT - i) / float(TEXT_LAYER_AMOUNT);
    }
    return text;
}

float distance_to_edge() {
    float f = clamp(0.0,1.0,v_texcoord.x * (1.0/(dist_to_edge*u_aspectRatio))) *
    clamp(0.0,1.0,(1.0-v_texcoord.x) * (1.0/(dist_to_edge*u_aspectRatio))) *
    clamp(0.0,1.0,v_texcoord.y * (1.0/dist_to_edge)) *
    clamp(0.0,1.0,(1.0-v_texcoord.y) * (1.0/dist_to_edge)) ;
    f = pow(f,2.0);
    return f;
}

void main() {
    float edge = distance_to_edge();
    vec3 text = mix(FUTURISTIC_BLUE_BRIGHT,
        text_layered() * FUTURISTIC_BLUE * 0.3,
        texture(u_texture_0,v_texcoord).x);
    fragColor = vec4(text,1.0);
}
*/
