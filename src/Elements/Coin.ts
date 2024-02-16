import { Mesh } from 'three'

export default class Ship {
    
    mesh: Mesh | null


    constructor () {
        this.mesh = null
    }


    build (mesh: Mesh) {
        this.mesh = mesh
    }

    update (elapsedTime: number) {
        this.mesh?.rotation.set(0, 0, elapsedTime)
    }
}