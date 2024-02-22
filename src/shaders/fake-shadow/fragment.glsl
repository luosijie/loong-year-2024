

varying vec2 vUv;


void main () {
    vec2 uv = vUv;


    float dist = distance(uv, vec2(.5));
    float strength = 1.0 - dist / .5 - .6;

    if (strength < 0.) discard;

    // circle
    



    vec3 color = vec3(0.);
    
    gl_FragColor = vec4(color, strength);   
}