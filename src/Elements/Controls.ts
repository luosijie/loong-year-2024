import { PerspectiveCamera, Vec2, Vector2 } from 'three'

import Global from './Global'

const global = Global.getInstance()

type Pointer = {
    down: boolean
    deltaTemp: Vector2
    delta: Vector2

}

export default class Controls {

    pointer: Pointer

    constructor () {

        this.pointer = {
            down: false,
            deltaTemp: new Vector2(),
            delta: new Vector2()
        }

        this.init()

    }


    private init () {


        // for camera rotate
        window.addEventListener('pointerdown', () => {
            this.pointer.down = true
        })

        window.addEventListener('pointermove', (evt:PointerEvent) => {
          
            this.pointer.deltaTemp.x += evt.movementX
            this.pointer.deltaTemp.y += evt.movementY

            
        })

        window.addEventListener('pointerup', () => {
            this.pointer.down = false
        })
    }

    getNormalisedPointerDelta() {
        const minSize = Math.min(global.width, global.height)
        return {
            x: this.pointer.delta.x / minSize,
            y: this.pointer.delta.y / minSize
        }
    }


    update () {
        this.pointer.delta.x = this.pointer.deltaTemp.x
        this.pointer.delta.y = this.pointer.deltaTemp.y

        this.pointer.deltaTemp.x = 0
        this.pointer.deltaTemp.y = 0
    }

}