import * as THREE from "three";
import type { AudioData } from "./audio";
import { params } from "./controls";

const STAR_COUNT = 3000;
const RADIUS = 50;

let points: THREE.Points;
let material: THREE.ShaderMaterial;

const vertexShader = `
attribute float aSize;
attribute float aPhase;
uniform float uTime;
uniform float uTreble;
uniform float uTwinkle;
varying float vAlpha;

void main() {
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPos;

  // Twinkle: each star has its own phase
  float twinkle = sin(uTime * 2.0 + aPhase * 6.283) * 0.5 + 0.5;
  vAlpha = mix(0.3, 1.0, twinkle * uTwinkle + uTreble * 0.4);

  gl_PointSize = aSize * (200.0 / -mvPos.z);
}
`;

const fragmentShader = `
varying float vAlpha;
uniform vec3 uColor;

void main() {
  // Soft circular point
  float d = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.1, d) * vAlpha;
  gl_FragColor = vec4(uColor, alpha);
}
`;

export function initBackground(scene: THREE.Scene) {
  const positions = new Float32Array(STAR_COUNT * 3);
  const sizes = new Float32Array(STAR_COUNT);
  const phases = new Float32Array(STAR_COUNT);

  for (let i = 0; i < STAR_COUNT; i++) {
    // Uniform distribution on sphere surface
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = RADIUS * (0.6 + Math.random() * 0.4);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    sizes[i] = 0.5 + Math.random() * 2.0;
    phases[i] = Math.random();
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

  material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uTreble: { value: 0 },
      uTwinkle: { value: params.starTwinkle },
      uColor: { value: new THREE.Color(params.starColor) },
    },
    transparent: true,
    depthWrite: false,
  });

  points = new THREE.Points(geometry, material);
  scene.add(points);
}

export function updateBackground(audio: AudioData) {
  if (!material) return;

  material.uniforms.uTime.value += 0.016;
  material.uniforms.uTreble.value = audio.treble;
  material.uniforms.uTwinkle.value = params.starTwinkle;
  material.uniforms.uColor.value.set(params.starColor);

  // Slow rotation for subtle drift
  points.rotation.y += 0.0001 * params.cameraOrbitSpeed;
  points.rotation.x += 0.00005;
}
