import { AxesHelper, BoxGeometry, Clock, Group, Mesh, MeshBasicMaterial, Scene, SRGBColorSpace, sRGBEncoding, Texture, Vector3, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { Config } from '../Types'


import matcapMaterial from '@/materials/matcap'
import groundShadowMaterial  from '@/materials/groundShadow'

import Camera from './Camera'
import checkDev from '@/utils/checkDev'

import { gsap } from 'gsap'

import Coin from './Coin'

import configLanters from '@/config/lanterns'
import configTrees from '@/config/trees'
import configGolds from '@/config/golds'
import Loong from './Loong'

// import Sound from './Sound'

export default class World {
    isDev: boolean
    isReady: boolean
    isActive: boolean

    width: number
    height: number

    clock: Clock

    controls: OrbitControls

    canvas: HTMLCanvasElement
    renderer: WebGLRenderer
    scene: Scene
    camera: Camera

    // sound: Sound


    coin: Coin

    loong: Loong


    cannonDebugger: any

    constructor (config: Config) {
        this.isDev = true || checkDev()
        this.isReady = false
        this.isActive = false

        this.width = config.width
        this.height = config.height

        this.clock = new Clock()

        this.canvas = config.canvas
        this.renderer = this.createRenderer()
        this.scene = new Scene()
        this.camera = new Camera(this.width, this.height)
        this.controls = new OrbitControls(this.camera.main, this.canvas)
        this.controls.enabled = true
        
    

        this.coin = new Coin()

        this.loong = new Loong()


        

        this.init()
        
    }

    private init () { 
        this.scene.add(this.loong.group)
        if (this.isDev) {
            this.controls.enabled = true
            const axesHelper = new AxesHelper(50)
            this.scene.add(axesHelper)
        }
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
        const elapsedTime = this.clock.getElapsedTime()
        
        this.coin.update(elapsedTime)

        this.loong.update()
        
        if (this.isReady) {
            !this.isDev && this.camera.update()

            
        } 
        

        if (this.isDev) {
            this.controls.update()
        }

        this.renderer.render( this.scene, this.camera.main )

    }

    // Build world elements with resources
    build (resources: any) {
        console.log('resources', resources)

        // set main
        const modelMain = resources['model-main'].scene.children[0]
        const textureMain: Texture = resources['texture-main']
        textureMain.flipY = false   
        textureMain.colorSpace = SRGBColorSpace
        
        const mainMaterial = new MeshBasicMaterial({
            map: textureMain
        })
        modelMain.material = mainMaterial
        this.scene.add(modelMain)

        // set matcaps resources
        const modelMatcaps:Scene = resources['model-matcaps'].scene
        this.scene.add(modelMatcaps)

        modelMatcaps.traverse((e:any) => {
            if (e.name.includes('gold')) {
                const m = matcapMaterial(resources['matcap-gold'])
                e.material = m
            }
            if (e.name.includes('green')) {
                const m = matcapMaterial(resources['matcap-green'])
                e.material = m
            }
            if (e.name.includes('red')) {
                const m = matcapMaterial(resources['matcap-red'])
                e.material = m
            }
            if (e.name.includes('yellow')) {
                const m = matcapMaterial(resources['matcap-yellow'])
                e.material = m
            }
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

    active () {
        gsap.to('.actions', { top: -70 })
        // this.camera.active(this.car.body.position, () => {


        //     this.trees.build()
        //     this.scene.add(this.trees.main)

        
        //     this.isActive = true
        //     console.log('world is active')
        // })
        // this.isActive = true
    }

    refresh () {
        this.isActive = false
        this.camera.ready(() => {
            gsap.to('.actions', { top: 0 })
        })
        // console.log('need refresh')
    }

    // Update canvas size when window resizing
    updateSize (width: number, height: number) {
        
        this.width = width
        this.height = height

        // update camera        
        this.camera.updateSize(width, height)
        
        // update renderer
        this.renderer.setSize(width, height)
        
    }
    
}