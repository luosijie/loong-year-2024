import { AnimationAction, AnimationClip, AnimationMixer, Group, MeshBasicMaterial, Object3D, PerspectiveCamera, Scene, SRGBColorSpace, Texture, Vector3 } from 'three'

type Actions = {
    walking: AnimationAction
    jumping: AnimationAction
}


const SPEED = {
    WALKING: .05,
    ROTATION: .05
}

export default class Player {

    main: Object3D

    model: any

    scene: Scene
    animationMixer: AnimationMixer

    actions: Actions


    speed: number

    rotation: number



    constructor (resources: any) {
        this.main = new Object3D()

        this.model = resources['model-player']

        this.scene = this.createScene(resources)
        this.animationMixer = new AnimationMixer(this.scene)

        this.actions = this.createActions()


        this.speed = 0

        this.rotation = 0

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
            switch (evt.key) {
                case 'Space' :
                    this.actions.walking.fadeOut(.5)

                    this.actions.jumping.reset()
                    this.actions.jumping.play()
                    break
                case 'w':
                    this.walk(SPEED.WALKING)
                break
                case 's':
                    this.walk(-SPEED.WALKING)
                break
                case 'a':
                    if (this.speed)
                        this.rotation = SPEED.ROTATION
                    break
                case 'd':
                    if (this.speed)
                        this.rotation = -SPEED.ROTATION

            }
        })

        window.addEventListener('keyup', (evt:KeyboardEvent) => {
            switch (evt.key) {
                case 'w':
                    this.speed = 0
                    this.stand()
                    break
                    case 's':
                        this.speed = 0
                        this.stand()
                        break
                case 'a':
                    this.rotation = 0
                    break
                case 'd':
                    this.rotation = 0
            }
        })
    }

    private walk (speed: number) {
        if (this.speed) return
        this.speed = speed
        this.actions.jumping.fadeOut(.5)
        this.actions.walking.reset()
        this.actions.walking.play()
    }

    private stand ()  {
        this.animationMixer.stopAllAction()
    }


    update (delta: number) {
        this.animationMixer.update(.02)
        // this.mesh?.rotation.set(0, 0, elapsedTime)
        if (this.speed !== 0) this.main.translateY(-this.speed)

        if (this.rotation !== 0) this.main.rotateZ(this.rotation)

        const position = new Vector3()
        this.main.getWorldPosition(position)
    }
}