import setMatcapMaterial from '@/utils/setMatcapMaterial'
import { Group, Mesh, Object3D, Vector3 } from 'three'

import { gsap } from 'gsap'


export default class Door {
    model: Object3D
    group: Group

    left: Object3D
    right: Object3D

    opening: boolean

    constructor (resources: any) {
        this.group = new Group()

        this.left = this.createLeft(resources)
        this.right = this.createRight(resources)

        this.group.add(this.left)
        this.group.add(this.right)

        this.opening = false
    }


    private createLeft (resources: any) {
        const model = resources['model-door']
        const left = new Object3D()

        model.scene.traverse((e:any) => {
            if (e instanceof Mesh) {
                const mesh = e.clone()
                setMatcapMaterial(mesh, resources)
                mesh.position.copy(new Vector3())

                mesh.translateX(-0.719 / 2)
                left.add(mesh)
            }
        })

        left.position.set(0.366175  + 0.719 / 2, -5.85542, 0.853467)

        return left
    }

    private createRight(resources: any) {
        const model = resources['model-door']
        const right = new Object3D()

        model.scene.traverse((e:any) => {
            if (e instanceof Mesh) {
                const mesh = e.clone()
                setMatcapMaterial(mesh, resources)

                mesh.position.copy(new Vector3())
                mesh.translateX(0.719 / 2)
                right.add(mesh)
            }
        })

        right.position.set(-0.35533 - 0.719 / 2, -5.85542, 0.853467)

        return right
    }

    open () {
        if (this.opening) return
        this.opening = true
        gsap.to(this.left.rotation, {z: -Math.PI/2.5, duration: 1.5})
        gsap.to(this.right.rotation, {z: Math.PI/2.5, duration: 1.5})
    }

    close () {
        if (!this.opening) return
        this.opening = false
        gsap.to(this.left.rotation, {z: 0, duration: 1.5})
        gsap.to(this.right.rotation, {z: 0, duration: 1.5})
    }

   
}