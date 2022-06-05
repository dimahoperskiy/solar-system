import * as THREE from 'three'
import * as dat from 'dat.gui'


import sunMap from "../../static/sun.jpg"
import mercuryMap from "../../static/mercury.jpg"
import venusMap from "../../static/venus.jpg"
import earthMap from "../../static/earth.jpg"
import moonMap from "../../static/moon.jpg"
import marsMap from "../../static/mars.jpg"
import asteroidMap from "../../static/asteroid.jpg"
import jupiterMap from "../../static/jupiter.jpeg"

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export const init = () => {
    // Debug
    // const gui = new dat.GUI()

    // Loader
    const textureLoader = new THREE.TextureLoader()

    // Earth
    const canvas = document.querySelector('canvas.solar')

    // Scene
    const scene = new THREE.Scene()

    const SIZE_SMALLER = 2
    const DIST_SMALLER = 8
    const GIANTS_SMALLER = 5
    const TIME_SLOW = 20


    // Objects
    // const geometry = new THREE.TorusKnotGeometry(.5, .2, 100, 16, 3, 16);
    class Planet {
        constructor(map, radius, name) {
            this.map = map
            this.radius = radius / SIZE_SMALLER
            this.name = name

            const texture = textureLoader.load(map)
            const geometry = new THREE.SphereGeometry(this.radius, 32, 32)
            let material
            if (name === "Sun") material = new THREE.MeshBasicMaterial({map: texture})
            else material = new THREE.MeshStandardMaterial({map: texture})

            this._planet = new THREE.Mesh(geometry, material)
            this._planet.name = name
        }

        get planet() {
            return this._planet
        }

        createRing() {
            const ringRadius = this.radius * 3
            const geometry = new THREE.RingGeometry(ringRadius, ringRadius + .05 / SIZE_SMALLER / 10, 64)
            const material = new THREE.MeshBasicMaterial()
            material.color = new THREE.Color(0x59de3)
            this.ring = new THREE.Mesh(geometry, material)
            this.ring.rotation.x = 4.75

            return this.ring
        }

        createOrbits() {
            const orbits = []
            // const dist = [this.radius + 5.8,
            //     this.radius + 10.8,
            //     this.radius + 15,
            //     this.radius + 22.8,
            //     this.radius + 32.9]
            // let dist = [this.radius + 5.8, // mercury
            //     this.radius + 10.8, // venus
            //     this.radius + 15, // earth
            //     this.radius + 22.8, // mars
            //     this.radius + 77.8 // jupiter
            // ]
            let dist = []
            dist[0] = 20
            dist[1] = 108 * dist[0] / 58
            dist[2] = 150 * dist[1] / 108
            dist[3] = 228 * dist[2] / 150
            dist[4] = 778 * dist[3] / 228

            // debugger
            // let dist = [5.8 + this.radius, 10.8, 15, 22.8, 77.8]
            dist = dist.map(el => (Number(el)) / DIST_SMALLER)
            console.log(dist)
            console.log(this.radius)
            for (let i in dist) {
                // const ringRadius = this.radius * i + 2
                const ringRadius = dist[i]
                let outerRadius = ringRadius + .05 / SIZE_SMALLER / 10
                // if (Number(i) === 4) outerRadius = ringRadius + 25.2 / DIST_SMALLER
                const geometry = new THREE.RingGeometry(ringRadius, outerRadius, 64)
                const material = new THREE.MeshBasicMaterial()
                material.color = new THREE.Color(0x59de3)
                let orbit = new THREE.Mesh(geometry, material)
                orbit.rotation.x = 4.75
                orbits.push(orbit)
            }
            return orbits
        }
    }
    //
    // const createFolder = (group) => {
    //     const folder = gui.addFolder(group.name)
    //     folder.add(group.position, "x").min(-20).max(20).step(0.01)
    //     folder.add(group.position, "y").min(-20).max(20).step(0.01)
    //     folder.add(group.position, "z").min(-20).max(20).step(0.01)
    // }

    let positionAroundSunPrevious = {}
    let sunTimer = new THREE.Clock()
    let timeAroundSun = {
        mercury: sunTimer.getElapsedTime(),
        venus: sunTimer.getElapsedTime(),
        earth: sunTimer.getElapsedTime(),
        moon: sunTimer.getElapsedTime(),
        mars: sunTimer.getElapsedTime(),
    }


    let EARTH_DAY


    const moveAroundSun = (group, radius, elapsedTime, speed, start) => {
        const slowAll = 122 * TIME_SLOW

        group.position.x = -Math.cos(start + elapsedTime * speed / slowAll) * radius
        group.position.z = Math.sin(start + elapsedTime * speed / slowAll) * radius

        // if (positionAroundSunPrevious[group.name.toLowerCase()] < 0 && group.position.x > 0) {
        //     console.log(group.name + " made a lap in " + Math.round((sunTimer.getElapsedTime() - timeAroundSun[group.name.toLowerCase()]) / EARTH_DAY) + " Earth days")
        //     timeAroundSun[group.name.toLowerCase()] = sunTimer.getElapsedTime()
        // }
        positionAroundSunPrevious[group.name.toLowerCase()] = group.position.x
    }

    let rotationAroundAxisPrevious = {}
    let radian = 6.2831853
    let axisTimer = new THREE.Clock()
    let timeAroundAxis = {
        sun: axisTimer.getElapsedTime(),
        mercury: axisTimer.getElapsedTime(),
        venus: axisTimer.getElapsedTime(),
        earth: axisTimer.getElapsedTime(),
        moon: axisTimer.getElapsedTime(),
        mars: axisTimer.getElapsedTime(),
        asteroids: axisTimer.getElapsedTime()
    }

    const moveAroundAxis = (planet, speed, elapsedTime) => {
        const slowAll = 3 * TIME_SLOW

        planet.rotation.y = speed * elapsedTime / slowAll

        // if (rotationAroundAxisPrevious[planet.name.toLowerCase()] % radian > 2 && planet.rotation.y % radian < 2) {
        //     if (planet.name === "Earth") {
        //         EARTH_DAY = (axisTimer.getElapsedTime() - timeAroundAxis.earth)
        //     }
        //     console.log(planet.name + " spun in " + Math.round((axisTimer.getElapsedTime() - timeAroundAxis[planet.name.toLowerCase()]) / EARTH_DAY) + " Earth days")
        //     timeAroundAxis[planet.name.toLowerCase()] = axisTimer.getElapsedTime()
        // }
        rotationAroundAxisPrevious[planet.name.toLowerCase()] = planet.rotation.y
    }

    const randomNumber = (min, max) => {
        return Number(Math.random() * (max - min) + min).toFixed(4)
    }

    // window.random = randomNumber


    const sun = new Planet(sunMap, 8.33 / GIANTS_SMALLER, "Sun")
    // const sun = new Planet(sunMap, 8.33, "Sun")
    const mercury = new Planet(mercuryMap, 0.167, "Mercury")
    const venus = new Planet(venusMap, 0.475, "Venus")
    const earth = new Planet(earthMap, 0.5, "Earth")
    const moon = new Planet(moonMap, 0.135, "Moon")
    const mars = new Planet(marsMap, 0.25, "Mars")
    const asteroids = new THREE.Object3D()
    asteroids.name = "Asteroids"
    const jupiter = new Planet(jupiterMap, 5.6, "Jupiter")

    const asteroidTexture = textureLoader.load(asteroidMap)
    for (let i = 0; i < 1000; i++) {
        let asteroidSize = randomNumber(0.012, 0.042) / SIZE_SMALLER,
            asteroidShape1 = randomNumber(4, 10),
            asteroidShape2 = randomNumber(4, 10),
            asteroidOrbit = randomNumber(150, 200) / DIST_SMALLER,
            asteroidPositionY = randomNumber(-2, 2) / SIZE_SMALLER;

        let material = new THREE.MeshLambertMaterial()
        material.map = asteroidTexture

        let asteroid = new THREE.Mesh( new THREE.SphereGeometry(asteroidSize, asteroidShape1, asteroidShape2),  material);

        asteroid.position.y = asteroidPositionY;
        let radians = randomNumber(0, 360) * Math.PI / 180;
        asteroid.position.x = Math.cos(radians) * asteroidOrbit;
        asteroid.position.z = Math.sin(radians) * asteroidOrbit;

        asteroids.add(asteroid);
    }




    const [mercuryOrbit, venusOrbit, earthOrbit, marsOrbit, jupiterOrbit] = sun.createOrbits()

    const mercuryRing = mercury.createRing()
    const venusRing = venus.createRing()
    const earthRing = earth.createRing()
    const marsRing = mars.createRing()
    const jupiterRing = jupiter.createRing()

// earthRing.rotation.x = 4.846
//     moon.planet.position.x = 0.7

// sun.planet.position.z = -25

    const sunGroup = new THREE.Group()
    sunGroup.name = "Sun"
    sunGroup.add(sun.planet)
    sunGroup.add(mercuryOrbit)
    sunGroup.add(venusOrbit)
    sunGroup.add(earthOrbit)
    sunGroup.add(marsOrbit)
    sunGroup.add(jupiterOrbit)

    const mercuryGroup = new THREE.Group()
    mercuryGroup.name = "Mercury"
    mercuryGroup.add(mercury.planet)
    mercuryGroup.add(mercuryRing)

    const venusGroup = new THREE.Group()
    venusGroup.name = "Venus"
    venusGroup.add(venus.planet)
    venusGroup.add(venusRing)

    const earthGroup = new THREE.Group()
    earthGroup.name = "Earth"
    earthGroup.add(earth.planet)
    earthGroup.add(earthRing)
    earthGroup.add(moon.planet)

    const marsGroup = new THREE.Group()
    marsGroup.name = "Mars"
    marsGroup.add(mars.planet)
    marsGroup.add(marsRing)

    const jupiterGroup = new THREE.Group()
    jupiterGroup.name = "Jupiter"
    jupiterGroup.add(jupiter.planet)
    jupiterGroup.add(jupiterRing)

    scene.add(sunGroup)
    scene.add(mercuryGroup)
    scene.add(venusGroup)
    scene.add(earthGroup)
    scene.add(marsGroup)
    scene.add(asteroids)
    scene.add(jupiterGroup)

    // createFolder(mercuryGroup)
    // createFolder(venusGroup)
    // createFolder(earthGroup)
    // createFolder(marsGroup)
    // createFolder(jupiterGroup)

// Lights

    const pointLight = new THREE.PointLight(0xffffff, 3.3)
    pointLight.position.x = 0
    pointLight.position.y = 0
    pointLight.position.z = 0
    scene.add(pointLight)

    /**
     * Sizes
     */

    const wrapper = document.querySelector(".canvas-wrapper")

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

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
    camera.position.y = 9
    camera.position.z = 10
    camera.zoom = 2
    camera.far = 1000
    scene.add(camera)

    console.log(camera)




    // const cameraFolder = gui.addFolder("Camera")
    //
    // cameraFolder.add(camera.position, "x").min(-10).max(30).step(0.01)
    // cameraFolder.add(camera.position, "y").min(-10).max(30).step(0.01)
    // cameraFolder.add(camera.position, "z").min(0).max(100).step(0.01)


// Controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    controls.zoomSpeed = 0.25

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        // antialias: true,
        logarithmicDepthBuffer: true
    })

    renderer.setSize(wrapper.offsetHeight, wrapper.offsetHeight)
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    /**
     * Animate
     */

    const clock = new THREE.Clock()
    let cnt = 0


    const tick = () => {


        const elapsedTime = clock.getElapsedTime()

        // Update objects
        moveAroundAxis(sun.planet, 19, elapsedTime)
        moveAroundAxis(mercury.planet, 8, elapsedTime)
        moveAroundAxis(venus.planet, 1.9, elapsedTime)
        moveAroundAxis(earth.planet, 465, elapsedTime)
        moveAroundAxis(moon.planet, -17.2, elapsedTime)
        moveAroundAxis(mars.planet, 455.3, elapsedTime)
        moveAroundAxis(asteroids, 0.27, elapsedTime)
        moveAroundAxis(jupiter.planet, 193.8, elapsedTime)

        let earthRingRadius = earthRing.geometry.parameters.outerRadius
        let earthOrbitRadius = earthOrbit.geometry.parameters.outerRadius
        let mercuryOrbitRadius = mercuryOrbit.geometry.parameters.outerRadius
        let venusOrbitRadius = venusOrbit.geometry.parameters.outerRadius
        let marsOrbitRadius = marsOrbit.geometry.parameters.outerRadius
        let jupiterOrbitRadius = jupiterOrbit.geometry.parameters.outerRadius


        // if (cnt === 0) {
        //     moveAroundSun(moon.planet, earthRingRadius, elapsedTime, 714, 2)
        //     moveAroundSun(mercuryGroup, mercuryOrbitRadius, elapsedTime, 214, 5)
        //     moveAroundSun(venusGroup, venusOrbitRadius, elapsedTime, 85, 10)
        //     moveAroundSun(earthGroup, earthOrbitRadius, elapsedTime, 48, 3)
        //     moveAroundSun(marsGroup, marsOrbitRadius, elapsedTime, 25.53, 7)
        //     cnt++
        // }
        if (cnt === 0) {
            moveAroundSun(moon.planet, earthRingRadius, elapsedTime, 714, 0)
            moveAroundSun(mercuryGroup, mercuryOrbitRadius, elapsedTime, 214, 0)
            moveAroundSun(venusGroup, venusOrbitRadius, elapsedTime, 85, 0)
            moveAroundSun(earthGroup, earthOrbitRadius, elapsedTime, 48, 0)
            moveAroundSun(marsGroup, marsOrbitRadius, elapsedTime, 25.53, 0)
            moveAroundSun(jupiterGroup, jupiterOrbitRadius, elapsedTime, 25.53, 0)

            cnt++

            let mercuryToSunDist = mercuryGroup.position.x - sun.radius


            console.log(778 * mercuryToSunDist / 58)

            let astStartX = 328 * mercuryToSunDist / 58
            let astEndX = 478 * mercuryToSunDist / 58

            // 58 = mercuryToSunDist
            // 108 =


            let dict = {
                mercury: 58,
                venus: 58 * (venusGroup.position.x / mercuryToSunDist),
                earth: 58 * earthGroup.position.x / mercuryToSunDist,
                mars: 58 * marsGroup.position.x / mercuryToSunDist,
                asteroidsStart: 58 * (-astStartX) / mercuryToSunDist,
                asteroidsEnd: 58 * (-astEndX) / mercuryToSunDist,
                jupiter: 58 * jupiterGroup.position.x / mercuryToSunDist,
            }


            console.table(dict)



            console.table({
                sun: sunGroup.position.x,
                sunRadius: sun.radius,
                mercury: mercuryGroup.position.x,
                venus: venusGroup.position.x,
                earth: earthGroup.position.x,
                mars: marsGroup.position.x,
                asteroidsStart: astStartX,
                asteroidsEnd: astEndX,
                jupiter: jupiterGroup.position.x,
            })
        }
        moveAroundSun(moon.planet, earthRingRadius, elapsedTime, 714, 2)
        moveAroundSun(mercuryGroup, mercuryOrbitRadius, elapsedTime, 209, 5)
        moveAroundSun(venusGroup, venusOrbitRadius, elapsedTime, 82, 10)
        moveAroundSun(earthGroup, earthOrbitRadius, elapsedTime, 48, 3)
        moveAroundSun(marsGroup, marsOrbitRadius, elapsedTime, 25.53, 7)

 
        // Update Orbital Controls
        controls.update()


        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()

}


