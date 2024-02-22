uniform sampler2D uTexture;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    vec3 textureColor = texture2D(uTexture, uv).rgb;


    float radius = distance(uv, vec2(.5, .5));
    float strength = 1.0 - radius / .5;
    // vec3 color = 
    // float alpha = 1.0 - textureColor.r;
    // alpha = smoothstep(.2, 1.2, alpha);
    // alpha = smoothstep(0.16, .8, alpha);
    // alpha = alpha * .8;

    gl_FragColor = vec4(textureColor, strength);
    // gl_FragColor = vec4(1.0, 0., 0., 1.);
}
