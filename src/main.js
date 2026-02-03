import './style.css'
import * as THREE from 'three'

// Setup
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true,
  alpha: true
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

// Objects
// A Dodecahedron represents complex logic and geometric beauty
const outerGeometry = new THREE.DodecahedronGeometry(12, 1)
const outerMaterial = new THREE.MeshStandardMaterial({ 
  color: 0x00ff88, 
  wireframe: true,
  transparent: true,
  opacity: 0.15
})
const outerShape = new THREE.Mesh(outerGeometry, outerMaterial)

const coreGeometry = new THREE.DodecahedronGeometry(5, 0)
const coreMaterial = new THREE.MeshStandardMaterial({ 
  color: 0x008855,
  emissive: 0x004422,
  emissiveIntensity: 0.2,
  transparent: true,
  opacity: 0.6
})
const core = new THREE.Mesh(coreGeometry, coreMaterial)

scene.add(outerShape)
scene.add(core)

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.8)
pointLight.position.set(15, 15, 15)

const secondaryLight = new THREE.PointLight(0x00ff88, 0.3)
secondaryLight.position.set(-15, -15, -15)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(pointLight, secondaryLight, ambientLight)

// Background Particles (Data nodes)
const starsGeometry = new THREE.BufferGeometry()
const starsCount = 1500
const posArray = new Float32Array(starsCount * 3)

for (let i = 0; i < starsCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 200
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
const starsMaterial = new THREE.PointsMaterial({
  size: 0.03,
  color: 0x00ff88,
  transparent: true,
  opacity: 0.4
})
const starsMesh = new THREE.Points(starsGeometry, starsMaterial)
scene.add(starsMesh)

// Mouse Movement
let mouseX = 0
let mouseY = 0

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX - window.innerWidth / 2) / 500
  mouseY = (event.clientY - window.innerHeight / 2) / 500
})

// UI
document.querySelector('#app').innerHTML = `
  <div class="content">
    <span class="tagline">BUILD / BREAK / BUILD AGAIN</span>
    <h1>Nanda Krishnan</h1>
    <p>Stop what you're doing and START BUILDING.</p>
    <div class="interest">
      AI Revolution Incoming: <strong>Ride it or Get Drowned in it</strong>
    </div>
  </div>
`

// Animation Loop
function animate() {
  requestAnimationFrame(animate)

  // Slower, more graceful rotation
  outerShape.rotation.x += 0.001
  outerShape.rotation.y += 0.0015
  
  core.rotation.y -= 0.002
  core.rotation.z += 0.001

  // Subtle float
  core.position.y = Math.sin(Date.now() * 0.001) * 0.3

  // Mouse interaction
  outerShape.rotation.x += mouseY * 0.02
  outerShape.rotation.y += mouseX * 0.02
  
  starsMesh.rotation.y += 0.0002

  renderer.render(scene, camera)
}

animate()

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
