import * as THREE from 'three'
import * as dat from 'dat.gui'

import earthMap from "../../static/earth.jpg"

export const init = () => {
    // Debug
    // const gui = new dat.GUI()

    // Loader
    const textureLoader = new THREE.TextureLoader()

    const earthTexture = textureLoader.load(earthMap)


    // Earth
    const canvas = document.querySelector('canvas.canvas')

    // Scene
    const scene = new THREE.Scene()


    // Objects
    // const geometry = new THREE.TorusKnotGeometry(.5, .2, 100, 16, 3, 16);
    const geometry = new THREE.SphereGeometry( 0.8, 32, 32 );

// Materials

    const material = new THREE.MeshStandardMaterial()
    // material.color = new THREE.Color(0x4268)
    // material.roughness = .125
    // material.metalness = .312
    // material.normalMap = normalTexture
    // material.normalMap = earthTexture
    material.map = earthTexture

    // const materialFolder = gui.addFolder("Material")

    const materialColor = {
        color: 0x4268
    }

    // materialFolder.addColor(materialColor, 'color')
    //     .onChange(() => {
    //         material.color.set(materialColor.color)
    //     })
    //
    // materialFolder.add(material, "roughness").min(0).max(1).step(0.001)
    // materialFolder.add(material, "metalness").min(0).max(1).step(0.001)


// Mesh
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

// Lights

    const pointLight = new THREE.PointLight(0xffffff, 1.92)
    pointLight.position.x = 4
    pointLight.position.y = 4.2
    pointLight.position.z = 2
    scene.add(pointLight)

    // const lightFolder = gui.addFolder("Light")

    const pointLightColor = {
        color: 0xffffff
    }

    // lightFolder.addColor(pointLightColor, 'color')
    //     .onChange(() => {
    //         pointLight.color.set(pointLightColor.color)
    //     })
    //
    // lightFolder.add(pointLight.position, "x").min(-10).max(10).step(0.01)
    // lightFolder.add(pointLight.position, "y").min(-10).max(10).step(0.01)
    // lightFolder.add(pointLight.position, "z").min(-100).max(100).step(0.1)
    // lightFolder.add(pointLight, "intensity").min(0).max(10).step(0.01)

    /**
     * Sizes
     */

    const wrapper = document.querySelector(".canvas-wrapper")

    const sizes = {
        width: wrapper.offsetHeight,
        height: wrapper.offsetHeight
    }

    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = wrapper.offsetHeight
        sizes.height = wrapper.offsetHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    /**
     * Camera
     */
// Base camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 1.5
    scene.add(camera)

    // const cameraFolder = gui.addFolder("Camera")

    // cameraFolder.add(camera.position, "x").min(-10).max(10).step(0.01)
    // cameraFolder.add(camera.position, "y").min(-10).max(10).step(0.01)
    // cameraFolder.add(camera.position, "z").min(-10).max(10).step(0.01)



// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    })

    renderer.setSize(wrapper.offsetHeight, wrapper.offsetHeight)
    // renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    /**
     * Animate
     */
    let mouseX = 0
    let mouseY = 0

    let targetX = 0
    let targetY = 0

    const windowX = window.innerWidth / 2
    const windowY = window.innerHeight / 2

    const onDocumentMouseMove = (e) => {
        mouseX = e.clientX - windowX
        mouseY = e.clientY - windowY
    }

    const onScroll = (e) => {
        sphere.position.y = window.scrollY * .001
    }

    document.addEventListener("mousemove", onDocumentMouseMove)

    window.addEventListener("scroll", onScroll)


    const clock = new THREE.Clock()


    const tick = () => {
        targetX = .001 * mouseX
        targetY = .001 * mouseY

        const elapsedTime = clock.getElapsedTime()


        // Update objects
        sphere.rotation.y = .5 * elapsedTime



        sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
        sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
        sphere.position.z = -.3 * (targetX)


        // Update Orbital Controls
        // controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()

}


