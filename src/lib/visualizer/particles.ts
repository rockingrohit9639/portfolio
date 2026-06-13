/**
 * Particle system that orbits the icosahedron.
 *
 * Key concepts:
 * - BufferGeometry with custom attributes: positions are stored in a Float32Array
 * - Points: renders each vertex as a point/dot (not a mesh)
 * - PointsMaterial: controls size, color, and transparency of all points
 * - We store "home" positions and lerp back to them when audio is quiet
 */

import * as THREE from "three";
import type { AudioData } from "./audio";
import { params } from "./controls";

const PARTICLE_COUNT = 2000;

let points: THREE.Points;
let homePositions: Float32Array<ArrayBuffer>;
let velocities: Float32Array<ArrayBuffer>;

// Generate a soft radial gradient texture — blurry circle
function createParticleTexture(blur: number): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // blur controls how quickly the gradient fades
  // 0 = sharp dot (tight center), 1 = full soft bokeh
  const sharpness = 1 - blur;
  const innerStop = 0.1 + sharpness * 0.4; // sharp: 0.5, blurry: 0.1

  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(innerStop, `rgba(255, 255, 255, ${0.8 * sharpness + 0.2})`);
  gradient.addColorStop(0.7, `rgba(255, 255, 255, ${0.1 * sharpness})`);
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

let currentBlur = -1; // track so we regenerate texture only when blur changes

export function initParticles(scene: THREE.Scene) {
  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(PARTICLE_COUNT * 3);
  homePositions = new Float32Array(PARTICLE_COUNT * 3);
  velocities = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 1.5 + Math.random() * 1.5;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    homePositions[i * 3] = x;
    homePositions[i * 3 + 1] = y;
    homePositions[i * 3 + 2] = z;

    velocities[i * 3] = 0;
    velocities[i * 3 + 1] = 0;
    velocities[i * 3 + 2] = 0;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  currentBlur = params.particleBlur;
  const material = new THREE.PointsMaterial({
    color: 0xc4b5fd,
    size: params.particleSize,
    map: createParticleTexture(currentBlur),
    transparent: true,
    opacity: params.particleOpacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });

  points = new THREE.Points(geometry, material);
  scene.add(points);
}

export function updateParticles(audio: AudioData) {
  if (!points) return;

  const material = points.material as THREE.PointsMaterial;

  // Regenerate texture if blur parameter changed
  const blurRounded = Math.round(params.particleBlur * 20) / 20;
  if (blurRounded !== currentBlur) {
    currentBlur = blurRounded;
    if (material.map) material.map.dispose();
    material.map = createParticleTexture(currentBlur);
  }

  const positions = points.geometry.attributes.position;
  const arr = positions.array as Float32Array;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;

    const x = arr[i3];
    const y = arr[i3 + 1];
    const z = arr[i3 + 2];

    const hx = homePositions[i3];
    const hy = homePositions[i3 + 1];
    const hz = homePositions[i3 + 2];

    const dist = Math.sqrt(x * x + y * y + z * z);
    const nx = x / dist;
    const ny = y / dist;
    const nz = z / dist;

    // Bass pushes particles outward — force from controls
    const pushForce = audio.bass * params.particlePushForce;
    velocities[i3] += nx * pushForce;
    velocities[i3 + 1] += ny * pushForce;
    velocities[i3 + 2] += nz * pushForce;

    const springStrength = 0.02;
    velocities[i3] += (hx - x) * springStrength;
    velocities[i3 + 1] += (hy - y) * springStrength;
    velocities[i3 + 2] += (hz - z) * springStrength;

    const damping = 0.92;
    velocities[i3] *= damping;
    velocities[i3 + 1] *= damping;
    velocities[i3 + 2] *= damping;

    arr[i3] += velocities[i3];
    arr[i3 + 1] += velocities[i3 + 1];
    arr[i3 + 2] += velocities[i3 + 2];
  }

  positions.needsUpdate = true;

  // Apply control params + audio reactivity
  material.opacity = params.particleOpacity * (0.6 + audio.treble * params.trebleReactivity);
  material.size = params.particleSize + audio.mid * params.particleSize * 0.5;

  // Gentle rotation
  points.rotation.y += 0.001 * params.rotationSpeed;
  points.rotation.x += 0.0005 * params.rotationSpeed;
}
