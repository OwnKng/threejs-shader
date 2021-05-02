import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import vertexShader from "./shaders/wave/vertex.glsl"
import fragmentShader from "./shaders/wave/fragment.glsl"

//_ Select the canvas
const canvas = document.querySelector("canvas.webgl")

//_ Set dimensions
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//_ Create a scene
const scene = new THREE.Scene()

//_ Create Geometry
const geo = new THREE.PlaneGeometry(2, 1, 64, 64)

//_ Create Material
const material = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
  },
  side: THREE.DoubleSide,
  depthWrite: false,
  transparent: true,
})

//_ Create mesh
const mesh = new THREE.Mesh(geo, material)
mesh.rotation.z = -Math.PI
scene.add(mesh)

//_ Create camera
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.01,
  1000
)
camera.position.set(0, 1, 2)
scene.add(camera)

//_ Create renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})

renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor("#151B26", 1)

//_ Resize events
window.addEventListener("resize", () => {
  //* Update sizes
  size.width = window.innerWidth
  size.height = window.innerHeight

  //* Update camera
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()

  //* Update renderer
  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//_ Add controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//_ Frame function
const clock = new THREE.Clock()

const frame = () => {
  const elapsedTime = clock.getElapsedTime()

  // update material
  material.uniforms.uTime.value = elapsedTime

  camera.lookAt(mesh.position)
  controls.update()

  renderer.render(scene, camera)

  window.requestAnimationFrame(frame)
}

frame()
