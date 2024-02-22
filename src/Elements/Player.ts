import { AnimationAction, AnimationClip, AnimationMixer, Group, MeshBasicMaterial, Object3D, PerspectiveCamera, Ray, Raycaster, Scene, SRGBColorSpace, Texture, Vector3 } from 'three'
import Door from './Door'

type Actions = {
    walking: AnimationAction
    jumping: AnimationAction
}


const SPEED = {
    WALKING: .05,
    ROTATION: .05
}

const RAYPOINTS = {
    ORIGIN: new Vector3(0, 0, .5),
    DOWN: new Vector3(0, 0, -1),
    FORWARD: new Vector3(0, -1, 0)
}

export default class Player {

    main: Object3D

    model: any

    scene: Scene
    animationMixer: AnimationMixer

    actions: Actions


    walking: boolean
    speed: number

    rotation: number

    raycaster: Raycaster



    constructor (resources: any) {
        this.main = new Object3D()
        this.main.position.set(0, -9, 0)

        this.model = resources['model-player']

        this.scene = this.createScene(resources)
        this.animationMixer = new AnimationMixer(this.scene)

        this.actions = this.createActions()

        this.walking = false

        this.speed = 0

        this.rotation = 0

        this.raycaster = new Raycaster()

        this.initControls()

        this.main.add(this.scene)

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
            this.walk()
            switch (evt.key) {
                // TODO: player jump
                case 'Space' :
                    // this.actions.jumping.reset()
                    // this.actions.jumping.play()
                    break
                case 'w':
                    this.speed = SPEED.WALKING
                break
                case 's':
                    this.speed = -SPEED.WALKING
                break
                case 'a':
                        this.rotation = SPEED.ROTATION
                    break
                case 'd':
                        this.rotation = -SPEED.ROTATION

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
            
            // intersect door
            RAYPOINTS.FORWARD.applyQuaternion(target.quaternion)
            this.raycaster.set(rayOrigin, RAYPOINTS.FORWARD)
            const intersectsDoor = this.raycaster.intersectObjects(door.group.children)
            console.log(intersectsDoor.length)
            if (intersectsDoor.length) return

            // intersect ground
            this.raycaster.set(rayOrigin, RAYPOINTS.DOWN)

            const intersects = this.raycaster.intersectObjects([navmesh])

            if (intersects.length > 0) {
                this.main.position.lerp(intersects[0].point, .6)
            }
        }






        

    }
}