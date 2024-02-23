import './style.scss'

import { gsap } from 'gsap'

import Loader from './utils/Loader'
import configResources from './config/resources'

import World from './Elements/World'

import Global from './Elements/Global'
const global = Global.getInstance()

const loader = new Loader()



let world: World



/** Load process start */
loader.load(configResources)

const percent = document.querySelector('.percent')
loader.onFileLoaded((name:string) => {
    console.log('load success', name)
    const value: number = loader.totalSuccess / loader.total * 100
    if (percent instanceof HTMLElement) {
        percent.innerText = String(Math.round(value))
    }
})

loader.onLoadEnd(resources => {
    gsap.to('.loading', { opacity: 0, onComplete: () => {
        const canvas = document.querySelector('canvas')
        if (canvas) {
            world = new World(canvas, resources)
        }
    } })

})

/** Load process end */

window.addEventListener('resize', () => {
    global.width = window.innerWidth
    global.height = window.innerHeight

    world && world.updateSize()
})

/***************************************************************
 * Buttons event binding
 **************************************************************/

    
const showInfoButton = document.querySelector('button.show-info')
showInfoButton?.addEventListener('click', () => {
    gsap.to('.info', { opacity: 1, display: 'flex' })
})

const closeInfoButton = document.querySelector('button.close-info')
closeInfoButton?.addEventListener('click', () => {
    gsap.to('.info', { opacity: 0, display: 'none' })
})



