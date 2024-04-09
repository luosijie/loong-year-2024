import { LoaderType } from '../utils/Loader'


const rootPath = import.meta.env.VITE_SUB_DOMAIN || ''

console.log('root-path', rootPath)

export default [
    { name: 'texture-main', type: LoaderType.Texture, path: rootPath + 'textures/main.webp'},
    { name: 'texture-ground', type: LoaderType.Texture, path: rootPath + 'textures/ground.webp'},
    { name: 'model-main', type: LoaderType.GLTF, path: rootPath + 'models/main.glb'},
    { name: 'model-matcaps', type: LoaderType.GLTF, path: rootPath + 'models/matcaps.glb'},

    { name: 'model-lantern', type: LoaderType.GLTF, path: rootPath + 'models/lantern.glb'},
    { name: 'model-elements', type: LoaderType.GLTF, path: rootPath + 'models/elements.glb'},

    { name: 'model-loong-head', type: LoaderType.GLTF, path: rootPath + 'models/loong-head.glb'},
    { name: 'model-loong-body', type: LoaderType.GLTF, path: rootPath + 'models/loong-body.glb'},
    { name: 'model-loong-foot', type: LoaderType.GLTF, path: rootPath + 'models/loong-foot.glb'},
    { name: 'model-loong-tail', type: LoaderType.GLTF, path: rootPath + 'models/loong-tail.glb'},
    { name: 'model-loong-path', type: LoaderType.GLTF, path: rootPath + 'models/loong-path.glb'},



    { name: 'matcap-gold', type: LoaderType.Texture, path: rootPath + 'matcaps/gold.webp'},
    { name: 'matcap-green', type: LoaderType.Texture, path: rootPath + 'matcaps/green.webp'},
    { name: 'matcap-red', type: LoaderType.Texture, path: rootPath + 'matcaps/red.webp'},
    { name: 'matcap-red-dark', type: LoaderType.Texture, path: rootPath + 'matcaps/red-dark.webp'},
    { name: 'matcap-yellow', type: LoaderType.Texture, path: rootPath + 'matcaps/yellow.webp'},

    { name: 'matcap-loong-black', type: LoaderType.Texture, path: rootPath + 'matcaps/loong-black.webp'},
    { name: 'matcap-loong-brown-light', type: LoaderType.Texture, path: rootPath + 'matcaps/loong-brown-light.webp'},
    { name: 'matcap-loong-brown', type: LoaderType.Texture, path: rootPath + 'matcaps/loong-brown.webp'},
    { name: 'matcap-loong-pink', type: LoaderType.Texture, path: rootPath + 'matcaps/loong-pink.webp'},
    { name: 'matcap-loong-red-dark', type: LoaderType.Texture, path: rootPath + 'matcaps/loong-red-dark.webp'},
    { name: 'matcap-loong-red', type: LoaderType.Texture, path: rootPath + 'matcaps/loong-red.webp'},
    { name: 'matcap-loong-white', type: LoaderType.Texture, path: rootPath + 'matcaps/loong-white.webp'},
    { name: 'matcap-loong-yellow', type: LoaderType.Texture, path: rootPath + 'matcaps/loong-yellow.webp'},

    { name: 'model-player', type: LoaderType.GLTF, path: rootPath + 'models/player.glb'},
    { name: 'texture-player', type: LoaderType.Texture, path: rootPath + 'textures/player.webp'},

    { name: 'model-navmesh', type: LoaderType.GLTF, path: rootPath + 'models/navmesh.glb'},
    { name: 'model-door', type: LoaderType.GLTF, path: rootPath + 'models/door.glb'},





    
    // { name: 'data-rail-points', type: LoaderType.PLY, path: rootPath + 'models/rail-points.ply'},
    // { name: 'data-rail-points', type: LoaderType.PLY, path: rootPath + 'models/rail-points.ply'},
    // { name: 'texture-shadow', type: LoaderType.Texture, path: rootPath + 'textures/shadows.jpg'},
    // { name: 'model-playground', type: LoaderType.GLTF, path: rootPath + 'models/playground.glb'},
    // { name: 'model-bricks', type: LoaderType.GLTF, path: rootPath + 'models/bricks.glb'},
    // { name: 'model-car', type: LoaderType.GLTF, path: rootPath + 'models/car.glb'},
    // { name: 'model-physics-static', type: LoaderType.GLTF, path: rootPath + 'models/physics-static.glb'},
    // { name: 'matcap-black', type: LoaderType.Texture, path: rootPath + 'matcaps/black.png'},
    // { name: 'matcap-blue-light', type: LoaderType.Texture, path: rootPath + 'matcaps/blue-light.png'},
    // { name: 'matcap-blue-lighter', type: LoaderType.Texture, path: rootPath + 'matcaps/blue-lighter.png'},
    // { name: 'matcap-blue', type: LoaderType.Texture, path: rootPath + 'matcaps/blue.png'},
    // { name: 'matcap-brown-dark', type: LoaderType.Texture, path: rootPath + 'matcaps/brown-dark.png'},
    // { name: 'matcap-brown-light', type: LoaderType.Texture, path: rootPath + 'matcaps/brown-light.png'},
    // { name: 'matcap-brown-lighter', type: LoaderType.Texture, path: rootPath + 'matcaps/brown-lighter.png'},
    // { name: 'matcap-brown', type: LoaderType.Texture, path: rootPath + 'matcaps/brown.png'},
    // { name: 'matcap-eye', type: LoaderType.Texture, path: rootPath + 'matcaps/eye.png'},
    // { name: 'matcap-green', type: LoaderType.Texture, path: rootPath + 'matcaps/green.png'},
    // { name: 'matcap-green-light', type: LoaderType.Texture, path: rootPath + 'matcaps/green-light.png'},
    // { name: 'matcap-pink', type: LoaderType.Texture, path: rootPath + 'matcaps/pink.png'},
    // { name: 'matcap-purple', type: LoaderType.Texture, path: rootPath + 'matcaps/purple.png'},
    // { name: 'matcap-purple-dark', type: LoaderType.Texture, path: rootPath + 'matcaps/purple-dark.png'},
    // { name: 'matcap-purple-light', type: LoaderType.Texture, path: rootPath + 'matcaps/purple-light.png'},
    // { name: 'matcap-red', type: LoaderType.Texture, path: rootPath + 'matcaps/red.png'},
    // { name: 'matcap-red-dark', type: LoaderType.Texture, path: rootPath + 'matcaps/red-dark.png'},
    // { name: 'matcap-red-light', type: LoaderType.Texture, path: rootPath + 'matcaps/red-light.png'},
    // { name: 'matcap-white', type: LoaderType.Texture, path: rootPath + 'matcaps/white.png'},
    // { name: 'matcap-yellow', type: LoaderType.Texture, path: rootPath + 'matcaps/yellow.png'},
    // { name: 'matcap-yellow-dark', type: LoaderType.Texture, path: rootPath + 'matcaps/yellow-dark.png'},
    // { name: 'matcap-yellow-light', type: LoaderType.Texture, path: rootPath + 'matcaps/yellow-light.png'},
    // { name: 'matcap-eye', type: LoaderType.Texture, path: rootPath + 'matcaps/eye.png'},
]