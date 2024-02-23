import { BufferGeometry, CurvePath, Group, LineCurve3, Mesh, Object3D, Vector3 } from 'three'
import matcapMaterial from '@/materials/matcap'

const SPEED = 0.0008

type Feet = {
    front: Object3D
    back: Object3D
}

export default class Loong {
    
    group: Group
    path: CurvePath<Vector3>

    progress: number

    ready: boolean

    list: Array<Object3D>

    feet: Feet


    constructor () {
        this.ready = false

        this.group = new Group()
        this.path = new CurvePath()

        this.list = []

        this.progress = 0
        this.feet = {
            front: new Object3D(),
            back: new Object3D()
        }

    }


    build (resources: any) {
        // this.mesh = mesh
        console.log('loong-building', resources)
        const path = resources['model-loong-path'].scene

        // set head
        const head = this.createItem('model-loong-head', resources)
        this.list.push(head)
        this.group.add(head)

        // set body
        const bodyNums = 10
        const body = this.createItem('model-loong-body', resources)
        for (let i = 0; i < bodyNums; i++) {
            const b = body.clone()
            this.list.push(b)
            this.group.add(b)
        }

        // set tail
        const tail =  this.createItem('model-loong-tail', resources)
        this.list.push(tail)
        this.group.add(tail)

        // set feet

        const foot = this.createItem('model-loong-foot', resources)
        
        this.feet.front = foot
        this.feet.back = foot.clone()
        this.group.add(this.feet.front)
        this.group.add(this.feet.back)

        // set path
        this.setPath(path.children[0].geometry)


        this.ready = true

    }

    private createItem(name: string, resources: any) {
        const item = new Object3D()
        resources[name].scene.traverse((e:any) => {
            let material
            if (e.name.includes('black')) material = matcapMaterial(resources['matcap-loong-black'])
            if (e.name.includes('brown-light')) material = matcapMaterial(resources['matcap-brown-light'])
            if (e.name.includes('brown')) material = matcapMaterial(resources['matcap-loong-brown'])
            if (e.name.includes('pink')) material = matcapMaterial(resources['matcap-loong-pink'])
            if (e.name.includes('red-dark')) material = matcapMaterial(resources['matcap-loong-red-dark'])
            if (e.name.includes('red')) material = matcapMaterial(resources['matcap-loong-red'])
            if (e.name.includes('white')) material = matcapMaterial(resources['matcap-loong-white'])
            if (e.name.includes('yellow')) material = matcapMaterial(resources['matcap-loong-yellow'])
            const mesh = new Mesh(
                e.geometry,
                material
            )
            item.add(mesh)
        })
        return item
    }


    private setPath(geometry: BufferGeometry) {

        const position = geometry.attributes.position.array
        const nums = geometry.attributes.position.count
        const points = []
        for (let i = 0; i < nums; i++) {
            const p = new Vector3(
                position[(i * 3 + 0)],
                position[(i * 3 + 1)],
                position[(i * 3 + 2)]
            )
            points.push(p)
        }

        for (let i = 0; i < nums - 1; i++) {
            const line = new LineCurve3(points[i], points[i + 1])
            this.path.add(line)
        }

        const lastLine = new LineCurve3(points[nums - 1], points[0])
        this.path.add(lastLine)
        console.log(geometry)
    }

    

    update () {
        if (!this.ready) return

        this.progress += SPEED
        if (this.progress > 1) this.progress = 0

        for (let i = 0; i < this.list.length; i++) {
            const item = this.list[i]
            let progress = this.progress - i * SPEED * 30
            if (progress < 0) progress = 1 + (this.progress - i * SPEED * 30)
    
            const curentPoint = this.path.getPoint(progress)
            const tangent = this.path.getTangent(progress)
            tangent.negate()
        
            // set axis-y rotation
            const randY = new Vector3(0, 0, 1).angleTo(tangent)
            const axis = new Vector3(0, 1, 0)
        
            axis.applyAxisAngle(new Vector3(0, 0, 1), item.rotation.z)
            item.setRotationFromAxisAngle(axis, randY - Math.PI / 2)
    
            // set axis-z rotation
            const tangentZ = tangent.clone()
            tangentZ.z = 0
            const randZ = new Vector3(1, 0, 0).angleTo(tangentZ)
           
            if (new Vector3(1, 0, 0).cross(tangent).z > 0) {
                item.rotation.z = randZ
            } else {
                item.rotation.z = -randZ
            }
    
            item.position.copy(curentPoint)

            if (i === 2) {
                this.feet.front.position.copy(item.position)
                this.feet.front.quaternion.copy(item.quaternion)
            }

            if (i === 8) {
                this.feet.back.position.copy(item.position)
                this.feet.back.quaternion.copy(item.quaternion)
            }
        }
    }
}