import { AxesHelper, Clock, Fog, Group, Mesh, MeshBasicMaterial, Scene, SRGBColorSpace, Texture, Vector3, WebGLRenderer } from 'three'

import matcapMaterial from '@/materials/matcap'

import Camera from './Camera'

import Coin from './Coin'

import configLanters from '@/config/lanterns'
import configTrees from '@/config/trees'
import configGolds from '@/config/golds'
import Loong from './Loong'
import Player from './Player'

import Global from './Global'
import Controls from './Controls'
import Door from './Door'
import setMatcapMaterial from '@/utils/setMatcapMaterial'
import groundMaterial from '@/materials/groundMaterial'
const global = Global.getInstance()

// import Sound from './Sound'

export default class World {
    isReady: boolean
    isActive: boolean

    width: number
    height: number

    clock: Clock


    canvas: HTMLCanvasElement
    renderer: WebGLRenderer
    scene: Scene

    controls: Controls

    camera: Camera

    fog: Fog
    // sound: Sound


    coin: Coin
    door: Door

    loong: Loong

    player: Player

    navmesh: Group

    constructor (canvas: HTMLCanvasElement, resources: any) {
        this.isReady = false
        this.isActive = false

        this.width = window.innerWidth
        this.height = window.innerWidth
        this.canvas = canvas

        this.clock = new Clock()

        this.renderer = this.createRenderer()
        this.scene = new Scene()

        this.controls = new Controls()

        this.player = new Player(resources)

        this.camera = new Camera(this.width, this.height)

        this.navmesh = this.createNavmesh(resources['model-navmesh'])
    

        this.coin = new Coin()
        this.door = new Door(resources)

        this.loong = new Loong()
        
        this.build(resources)
        this.init()
        
    }

    private init () { 
        this.scene.add(this.door.group)
        this.scene.add(this.loong.group)
        this.scene.add(this.player.main)
        this.scene.add(this.navmesh)

        if (global.isDev) {
            const axesHelper = new AxesHelper(50)
            this.scene.add(axesHelper)
        }
    }

    private createNavmesh(model: any) {
        model.scene.traverse((e:any) => {
            if (e instanceof Mesh) {
                e.material.transparent = true
                e.material.opacity = 0

            }
        })

        // mesh.material.transparent = true
        // mesh.material.opacity = 0
        return model.scene
    }

    private createRenderer () {
        const renderer = new WebGLRenderer({ 
            canvas: this.canvas,
            antialias: true,  
            alpha: true 
        })
        renderer.setSize( this.width, this.height)
        renderer.setAnimationLoop( this.render.bind(this) )
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.outputColorSpace = SRGBColorSpace
        // renderer.out

        // renderer.outputEncoding = sRGBEncoding
        return renderer
    }

    // Passed to renderer.setAnimationLoop
    private render () {
        // const delta = this.clock.getDelta()


        this.controls.update()
        this.loong.update()

        this.player.update(this.navmesh, this.door)
        this.camera.update(this.player, this.controls)
        

        this.renderer.render( this.scene, this.camera.perspective )

    }

    // Build world elements with resources
    build (resources: any) {

        console.log(resources)
        // set main
        const modelMain = resources['model-main'].scene
        modelMain.traverse((e:any) => {
            if (e.name === 'main') {
                const textureMain: Texture = resources['texture-main']
                textureMain.flipY = false   
                textureMain.colorSpace = SRGBColorSpace
                
                const mainMaterial = new MeshBasicMaterial({
                    map: textureMain
                })
                e.material = mainMaterial
            }

            if (e.name === 'ground') {
                console.log('-----', e)

                // set ground
                const textureGround: Texture = resources['texture-ground']
                textureGround.flipY = false   
                textureGround.colorSpace = SRGBColorSpace
                
                const material = groundMaterial(textureGround)
                e.position.z = .001
                e.material = material
            }
        })


        this.scene.add(modelMain)

        // set matcaps resources
        const modelMatcaps:Scene = resources['model-matcaps'].scene
        this.scene.add(modelMatcaps)

        modelMatcaps.traverse((e:any) => {
            setMatcapMaterial(e, resources)
        })

        // set lanterns
        const modelLantern = resources['model-lantern'].scene
        modelLantern.traverse((e:any) => {

            e.position.copy(new Vector3())

            if (e.name.includes('red')) {
                const m = matcapMaterial(resources['matcap-red'])
                e.material = m
            }
            if (e.name.includes('yellow')) {
                const m = matcapMaterial(resources['matcap-yellow'])
                e.material = m
            }
        })

        configLanters.forEach((e: any) => {
            const position = new Vector3(e.x, e.y, e.z)
            const lantern = modelLantern.clone()
            lantern.position.copy(position)
            this.scene.add(lantern)
        })

        // set repeated elements
        const modelElements = resources['model-elements'].scene
        modelElements.traverse((mesh:any) => {
            switch (mesh.name) {
                case 'tree':
                    mesh.material = matcapMaterial(resources['matcap-green'])

                    configTrees.forEach((e:any) => {
                        const tree = mesh.clone()
                        tree.position.set(e.x, e.y, e.z)
                        tree.scale.set(e.s, e.s, e.s)
                        this.scene.add(tree)
                    })
                    break
                case 'gold':
                    mesh.material = matcapMaterial(resources['matcap-gold'])

                    configGolds.forEach((e:any) => {
                        const gold = mesh.clone()
                        gold.position.set(e.x, e.y, e.z)
                        gold.scale.set(e.s, e.s, e.s)
                        gold.rotation.set(0, 0, e.r / 180 * Math.PI)
                        this.scene.add(gold)
                    })
                    break
                case 'coin':
                    const coinMesh = mesh.clone()
                    coinMesh.material = matcapMaterial(resources['matcap-gold'])
                    this.coin.build(coinMesh)
                    this.coin.mesh && this.scene.add(this.coin.mesh)
                    break
            }
        })

        // set loong
        this.loong.build(resources)


    }


    // Update canvas size when window resizing
    updateSize () {

        // update camera        
        this.camera.updateSize(global.width, global.height)
        
        // update renderer
        this.renderer.setSize(global.width, global.height)
        
    }
    
}