precision mediump float;

varying vec2 vUv;

void main()
{
    float strength = step(0.45, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 1.0);
    vec3 mixedColor = mix(blackColor, uvColor, strength);

    gl_FragColor = vec4(mixedColor, 1.0);
}