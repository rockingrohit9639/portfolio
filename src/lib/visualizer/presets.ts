import type { AudioData } from "./audio";
import { params } from "./controls";

interface Preset {
  icoBaseColor: string;
  starColor: string;
  bloomIntensity: number;
}

const presetList: { name: string; preset: Preset }[] = [
  { name: "Neon", preset: { icoBaseColor: "#8b5cf6", starColor: "#a78bfa", bloomIntensity: 1.5 } },
  { name: "Sunset", preset: { icoBaseColor: "#f97316", starColor: "#fbbf24", bloomIntensity: 1.8 } },
  { name: "Arctic", preset: { icoBaseColor: "#06b6d4", starColor: "#67e8f9", bloomIntensity: 1.2 } },
  { name: "Void", preset: { icoBaseColor: "#ef4444", starColor: "#991b1b", bloomIntensity: 2.0 } },
  { name: "Mint", preset: { icoBaseColor: "#10b981", starColor: "#6ee7b7", bloomIntensity: 1.4 } },
  { name: "Sakura", preset: { icoBaseColor: "#ec4899", starColor: "#f9a8d4", bloomIntensity: 1.6 } },
];

let currentIndex = 0;
let energyHistory: number[] = [];
let framesSinceShift = 0;
const MIN_FRAMES_BETWEEN_SHIFTS = 300; // ~5 seconds at 60fps
const ENERGY_WINDOW = 60;

// Crossfade state
let fadeProgress = 1; // 1 = fully arrived at current preset
let fromColors = { ico: [139, 92, 246], star: [167, 139, 250], bloom: 1.5 };
let toColors = { ico: [139, 92, 246], star: [167, 139, 250], bloom: 1.5 };

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

function lerpColor(a: number[], b: number[], t: number): [number, number, number] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function detectEnergyShift(audio: AudioData): boolean {
  const energy = (audio.bass + audio.mid + audio.treble) / 3;
  energyHistory.push(energy);
  if (energyHistory.length > ENERGY_WINDOW) energyHistory.shift();
  if (energyHistory.length < ENERGY_WINDOW) return false;

  const firstHalf = energyHistory.slice(0, ENERGY_WINDOW / 2);
  const secondHalf = energyHistory.slice(ENERGY_WINDOW / 2);
  const avgFirst = firstHalf.reduce((s, v) => s + v, 0) / firstHalf.length;
  const avgSecond = secondHalf.reduce((s, v) => s + v, 0) / secondHalf.length;

  // Trigger shift on significant energy change (either direction)
  return Math.abs(avgSecond - avgFirst) > 0.12;
}

function shiftToNext() {
  const prevPreset = presetList[currentIndex].preset;
  fromColors = {
    ico: hexToRgb(prevPreset.icoBaseColor) as unknown as number[],
    star: hexToRgb(prevPreset.starColor) as unknown as number[],
    bloom: prevPreset.bloomIntensity,
  };

  // Pick a different preset (skip current)
  let next = (currentIndex + 1 + Math.floor(Math.random() * (presetList.length - 1))) % presetList.length;
  currentIndex = next;

  const nextPreset = presetList[currentIndex].preset;
  toColors = {
    ico: hexToRgb(nextPreset.icoBaseColor) as unknown as number[],
    star: hexToRgb(nextPreset.starColor) as unknown as number[],
    bloom: nextPreset.bloomIntensity,
  };

  fadeProgress = 0;
  params.preset = presetList[currentIndex].name;
}

export function updatePresets(audio: AudioData) {
  framesSinceShift++;

  if (framesSinceShift > MIN_FRAMES_BETWEEN_SHIFTS && detectEnergyShift(audio)) {
    shiftToNext();
    framesSinceShift = 0;
    energyHistory = [];
  }

  // Crossfade
  if (fadeProgress < 1) {
    fadeProgress = Math.min(1, fadeProgress + 0.008); // ~2 second fade
    const t = fadeProgress * fadeProgress * (3 - 2 * fadeProgress); // smoothstep easing

    const ico = lerpColor(fromColors.ico, toColors.ico, t);
    const star = lerpColor(fromColors.star, toColors.star, t);
    params.icoBaseColor = rgbToHex(...ico);
    params.starColor = rgbToHex(...star);
    params.bloomIntensity = fromColors.bloom + (toColors.bloom - fromColors.bloom) * t;
  }
}
