/**
 * Three.js scene setup with custom shader sphere and bloom post-processing.
 *
 * The sphere now uses a ShaderMaterial:
 * - Vertex shader: GPU-side noise displacement (smoother, faster than JS)
 * - Fragment shader: fresnel rim glow + displacement-based coloring
 */

import * as THREE from "three";
import { EffectComposer, BloomEffect, EffectPass, RenderPass } from "postprocessing";
import type { AudioData } from "./audio";
import { params } from "./controls";
import { initBackground, updateBackground } from "./background";
import { initCamera, updateCamera } from "./camera";
import { initParticles, updateParticles } from "./particles";
import { updatePresets } from "./presets";
import vertexShader from "./shaders/sphere.vert.glsl?raw";
import fragmentShader from "./shaders/sphere.frag.glsl?raw";

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let composer: EffectComposer;
let bloomEffect: BloomEffect;
let mesh: THREE.Mesh;
let shaderMaterial: THREE.ShaderMaterial;

const mouse = new THREE.Vector2(0, 0);
const raycaster = new THREE.Raycaster();
const attractPoint = new THREE.Vector3(0, 0, 0);

export function initScene(canvas: HTMLCanvasElement) {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Post-processing
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  bloomEffect = new BloomEffect({
    intensity: params.bloomIntensity,
    luminanceThreshold: params.bloomThreshold,
    radius: params.bloomRadius,
    mipmapBlur: true,
  });
  composer.addPass(new EffectPass(camera, bloomEffect));

  // Sphere with custom shader
  const geometry = new THREE.IcosahedronGeometry(1, 64); // high detail for smooth noise

  shaderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uBass: { value: 0 },
      uMid: { value: 0 },
      uTreble: { value: 0 },
      uDeformation: { value: params.icoDeformation },
      uBaseColor: { value: new THREE.Color(params.icoBaseColor) },
      uAttractPoint: { value: new THREE.Vector3(0, 0, 0) },
      uAttractStrength: { value: params.mouseAttract },
    },
    wireframe: params.icoWireframe,
  });

  mesh = new THREE.Mesh(geometry, shaderMaterial);
  scene.add(mesh);

  initBackground(scene);
  initParticles(scene);
  initCamera(camera, canvas);

  canvas.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  });
}

export function updateScene(audio: AudioData) {
  if (!mesh) return;

  // Project mouse onto plane passing through sphere center (facing camera)
  raycaster.setFromCamera(mouse, camera);
  const cameraDir = camera.getWorldDirection(new THREE.Vector3());
  const plane = new THREE.Plane(cameraDir.negate(), 0);
  raycaster.ray.intersectPlane(plane, attractPoint);
  shaderMaterial.uniforms.uAttractPoint.value.copy(attractPoint);
  shaderMaterial.uniforms.uAttractStrength.value = params.mouseAttract;

  // Update shader uniforms with audio data
  shaderMaterial.uniforms.uTime.value += 0.016; // ~60fps time step
  shaderMaterial.uniforms.uBass.value = audio.bass;
  shaderMaterial.uniforms.uMid.value = audio.mid;
  shaderMaterial.uniforms.uTreble.value = audio.treble;
  shaderMaterial.uniforms.uDeformation.value = params.icoDeformation;
  shaderMaterial.uniforms.uBaseColor.value.set(params.icoBaseColor);
  shaderMaterial.wireframe = params.icoWireframe;

  // Rotation
  mesh.rotation.x += 0.002 * params.rotationSpeed;
  mesh.rotation.y += 0.003 * params.rotationSpeed;

  // Bass breathing (scale)
  const bassScale = 1 + audio.bass * params.bassReactivity;
  mesh.scale.set(bassScale, bassScale, bassScale);

  updatePresets(audio);
  updateParticles(audio);
  updateBackground(audio);
  updateCamera(audio);

  // Bloom
  bloomEffect.intensity = params.bloomIntensity + audio.bass * 1.0;
  bloomEffect.luminanceMaterial.threshold = params.bloomThreshold;
  bloomEffect.mipmapBlurPass.radius = params.bloomRadius;

  composer.render();
}
