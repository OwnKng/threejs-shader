import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// Get canvas html element
const canvas = document.querySelector("canvas.webgl")

// Dimensions
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Create a scene
const scene = new THREE.Scene()

// Add a geometry
const cube = new THREE.BoxBufferGeometry(1, 1)

// Add a material
const material = new THREE.MeshBasicMaterial()

// Add mesh
const mesh = new THREE.Mesh(cube, material)
scene.add(mesh)

// Add Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
)

camera.position.set(1, 1, 1)
scene.add(camera)

// Add renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Add resize events
window.addEventListener("resize", () => {
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

// Add controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Add frame function
const clock = new THREE.Clock()

const frame = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Renderer
  renderer.render(scene, camera)

  window.requestAnimationFrame(frame)
}

frame()
