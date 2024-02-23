import { AnimationAction, AnimationClip, AnimationMixer, ArrowHelper, Mesh, MeshBasicMaterial, Object3D, PlaneGeometry, Raycaster, Scene, SRGBColorSpace, Texture, Vector3 } from 'three'
import Door from './Door'

import fakeShadowMaterial from '@/materials/fakeShadowMaterial'

import Global from './Global'
const global = Global.getInstance()

type Actions = {
    walking: AnimationAction
    jumping: AnimationAction
}

type Helpers = {
    forward: ArrowHelper
}


const SPEED = {
    WALKING: .05,
    ROTATION: .05
}

const RAYPOINTS = {
    ORIGIN: new Vector3(0, 0, .6),
    DOWN: new Vector3(0, 0, -1),
    FORWARD: new Vector3(0, -1, 0)
}

export default class Player {

    main: Object3D

    model: any

    scene: Scene
    animationMixer: AnimationMixer

    actions: Actions
    helpers: Helpers


    walking: boolean
    speed: number

    rotation: number

    raycaster: Raycaster

    fakeShadow: Mesh






    constructor (resources: any) {
        this.main = new Object3D()
        this.main.position.set(1.4, -9.5, 0)
        this.main.rotateZ(Math.PI /180 * 50)

        this.model = resources['model-player']

        this.scene = this.createScene(resources)
        this.animationMixer = new AnimationMixer(this.scene)


        this.actions = this.createActions()

        this.walking = false

        this.speed = 0

        this.rotation = 0

        this.raycaster = new Raycaster()

        this.initControls()


        this.fakeShadow = this.createFakeShadow()

        this.helpers = this.createHelpers()


        this.main.add(this.scene)
        this.main.add(this.fakeShadow)

    }

    private createFakeShadow () {
        const geometry = new PlaneGeometry(1,1)
        const material = fakeShadowMaterial()

        const mesh = new Mesh(geometry, material)
        mesh.position.z = .003

        return mesh
    }

    private createHelpers () {
        
        const forward = new ArrowHelper(RAYPOINTS.FORWARD, RAYPOINTS.ORIGIN.clone(), 2, 0xff0000)
        global.isDev && this.main.add(forward)


        return {
            forward
        }
    }

    private createScene (resources: any) {

        const scene = this.model.scene
        // set material
        const modelPlayer:any = scene.children[0].children[0]
        const texturePlayer: Texture = resources['texture-player']
        texturePlayer.flipY = false   
        texturePlayer.colorSpace = SRGBColorSpace
        
        const playerMaterial = new MeshBasicMaterial({
            map: texturePlayer
        })
        modelPlayer.material = playerMaterial

        return scene
    }

    private createActions () {
        
        const animations = this.model.animations
        const walking = this.animationMixer.clipAction(animations.find((a: AnimationClip) => a.name === 'walking'))
        const jumping = this.animationMixer.clipAction(animations.find((a: AnimationClip) => a.name === 'jumping'))
        
        return {
            walking,
            jumping
        }
    }


    private initControls() {
        window.addEventListener('keydown', (evt:KeyboardEvent) => {
            
            switch (evt.key) {
                // TODO: player jump
                case 'Space' :
                    // this.actions.jumping.reset()
                    // this.actions.jumping.play()
                    break
                case 'w':
                    this.speed = SPEED.WALKING
                    this.walk()
                break
                case 's':
                    this.speed = -SPEED.WALKING
                    this.walk()
                break
                case 'a':
                    this.rotation = SPEED.ROTATION
                    this.walk()
                    break
                case 'd':
                    this.rotation = -SPEED.ROTATION
                    this.walk()

            }
        })

        window.addEventListener('keyup', (evt:KeyboardEvent) => {
     

            switch (evt.key) {
                // TODO: player jump
                case 'Space' :
                    // this.actions.jumping.reset()
                    // this.actions.jumping.play()
                    break
                case 'w':
                    this.speed = 0
                break
                case 's':
                    this.speed = 0
                break
                case 'a':
                        this.rotation = 0
                    break
                case 'd':
                        this.rotation = 0

            }

            if (this.speed === 0 && this.rotation === 0) {
                this.walking = false
                this.stand()
            }
        })
    }

    private walk () {
        if (this.walking) return
        this.walking = true
        // this.actions.jumping.fadeOut(.5)
        this.actions.walking.reset()
        this.actions.walking.play()
    }

    private stand ()  {
        this.animationMixer.stopAllAction()
    }


    update (navmesh: Object3D, door: Door) {
        this.animationMixer.update(.02)

        if (this.rotation !== 0) this.main.rotateZ(this.rotation)

        
        if (this.speed !== 0) {
            const target = new Object3D()
            this.main.getWorldPosition(target.position)
            target.applyQuaternion(this.main.quaternion)
            target.translateY(-this.speed * 1.5)


            const rayOrigin = new Vector3()
            target.getWorldPosition(rayOrigin)
            rayOrigin.add(RAYPOINTS.ORIGIN)
            
            // TODO: intersect door
            // RAYPOINTS.FORWARD.applyQuaternion(this.main.quaternion)
            // this.raycaster.set(rayOrigin, RAYPOINTS.FORWARD)

            // this.helpers.forward.setDirection(RAYPOINTS.FORWARD)

            // const intersectsDoor = this.raycaster.intersectObjects([door.left, door.right])
            // console.log(intersectsDoor.length)
            // if (intersectsDoor.length) return

            // intersect ground
            this.raycaster.set(rayOrigin, RAYPOINTS.DOWN)

            const intersects = this.raycaster.intersectObjects([navmesh])

            if (intersects.length > 0) {
                const i = intersects[0]
                this.main.position.lerp(i.point, .6)
                if (i.object.name === 'door') {
                    door.open()
                } else {
                    door.close()
                }
            }

        }


        console.log(this.main.position)



        

    }
}