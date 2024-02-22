import vertexShader from '@/shaders/fake-shadow/vertex.glsl'
import fragmentShader from '@/shaders/fake-shadow/fragment.glsl'
import { ShaderMaterial } from 'three'

export default function () {

    return new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true
    })
}
