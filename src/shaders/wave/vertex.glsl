uniform mat4 projectionMatrix; 
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

// Bring in the time variable
uniform float uTime; 

attribute vec2 uv;
attribute vec3 position;

// Pass the relative coordinates
varying vec2 vUv;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x * 10.0 + uTime) * 0.1;
    modelPosition.z += sin(modelPosition.y * 10.0 + uTime) * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
 
    gl_Position = projectedPosition;

    vUv = uv;
}