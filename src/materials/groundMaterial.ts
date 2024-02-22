import vertexShader from '@/shaders/ground/vertex.glsl'
import fragmentShader from '@/shaders/ground/fragment.glsl'
import { ShaderMaterial, Texture } from 'three'

export default function (texture: Texture) {

    return new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        uniforms: {
            uTexture: {
                value: texture,
            }
        }
    })
}
