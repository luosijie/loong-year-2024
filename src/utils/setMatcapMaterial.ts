import { Mesh } from "three"
import matcapMaterial from '@/materials/matcap'


export default function (mesh: Mesh, resources: any) {

    if (mesh.name.includes('gold')) {
        const m = matcapMaterial(resources['matcap-gold'])
        mesh.material = m
    }
    if (mesh.name.includes('green')) {
        const m = matcapMaterial(resources['matcap-green'])
        mesh.material = m
    }
    if (mesh.name.includes('red')) {
        const m = matcapMaterial(resources['matcap-red'])
        mesh.material = m
    }
    if (mesh.name.includes('yellow')) {
        const m = matcapMaterial(resources['matcap-yellow'])
        mesh.material = m
    }
    if (mesh.name.includes('red-dark')) {
        const m = matcapMaterial(resources['matcap-red-dark'])
        mesh.material = m
    }
}