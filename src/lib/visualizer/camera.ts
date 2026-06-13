import * as THREE from "three";
import type { AudioData } from "./audio";
import { params } from "./controls";

let camera: THREE.PerspectiveCamera;
let target = new THREE.Vector3(0, 0, 0);

let angle = 0;
let elevation = 0.3;
let radius = 3;
let targetRadius = 3;

let isDragging = false;
let lastMouse = { x: 0, y: 0 };

export function initCamera(cam: THREE.PerspectiveCamera, canvas: HTMLCanvasElement) {
  camera = cam;

  canvas.addEventListener("mousedown", (e) => {
    isDragging = true;
    lastMouse = { x: e.clientX, y: e.clientY };
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouse.x;
    const dy = e.clientY - lastMouse.y;
    angle -= dx * 0.005;
    elevation = Math.max(-1.2, Math.min(1.2, elevation + dy * 0.005));
    lastMouse = { x: e.clientX, y: e.clientY };
  });

  canvas.addEventListener("mouseup", () => { isDragging = false; });
  canvas.addEventListener("mouseleave", () => { isDragging = false; });

  canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    targetRadius = Math.max(1.5, Math.min(6, targetRadius + e.deltaY * 0.005));
  }, { passive: false });
}

export function updateCamera(audio: AudioData) {
  if (!camera) return;

  if (!isDragging) {
    angle += 0.003 * params.cameraOrbitSpeed;
    elevation += Math.sin(angle * 0.7) * 0.0005 * params.cameraOrbitSpeed;
    elevation = Math.max(-1.0, Math.min(1.0, elevation));
  }

  // Bass pushes camera closer (impact feel)
  const bassZoom = audio.bass * params.cameraBassPush * 0.8;
  targetRadius = Math.max(1.5, (isDragging ? targetRadius : 3) - bassZoom);

  // Smooth radius transition
  radius += (targetRadius - radius) * 0.05;

  // Spherical to cartesian
  const x = radius * Math.cos(elevation) * Math.sin(angle);
  const y = radius * Math.sin(elevation);
  const z = radius * Math.cos(elevation) * Math.cos(angle);

  camera.position.set(x, y, z);
  camera.lookAt(target);
}
