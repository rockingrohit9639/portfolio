import GUI from "lil-gui";

interface Preset {
  icoBaseColor: string;
  starColor: string;
  bloomIntensity: number;
}

const presets: Record<string, Preset> = {
  Neon: { icoBaseColor: "#8b5cf6", starColor: "#a78bfa", bloomIntensity: 1.5 },
  Sunset: { icoBaseColor: "#f97316", starColor: "#fbbf24", bloomIntensity: 1.8 },
  Arctic: { icoBaseColor: "#06b6d4", starColor: "#67e8f9", bloomIntensity: 1.2 },
  Void: { icoBaseColor: "#ef4444", starColor: "#991b1b", bloomIntensity: 2.0 },
  Mint: { icoBaseColor: "#10b981", starColor: "#6ee7b7", bloomIntensity: 1.4 },
  Sakura: { icoBaseColor: "#ec4899", starColor: "#f9a8d4", bloomIntensity: 1.6 },
};

export const params = {
  preset: "Neon",
  // Particles
  particleSize: 0.04,
  particleOpacity: 0.7,
  particleBlur: 0.5, // 0 = sharp, 1 = full soft texture
  particlePushForce: 0.04,
  particleCount: 2000,

  // Icosahedron
  icoWireframe: true,
  icoDeformation: 0.3,
  icoBaseColor: "#8b5cf6",
  mouseAttract: 0.4,

  // Bloom
  bloomIntensity: 1.5,
  bloomThreshold: 0.2,
  bloomRadius: 0.8,

  // Background
  starTwinkle: 0.6,
  starColor: "#a78bfa",

  // Camera
  cameraOrbitSpeed: 1.0,
  cameraBassPush: 0.5,

  // General
  rotationSpeed: 1.0,
  bassReactivity: 0.5,
  trebleReactivity: 0.6,
};

export function initControls() {
  const gui = new GUI({ title: "Controls" });

  gui.add(params, "preset", Object.keys(presets)).name("Preset").onChange((name: string) => {
    const p = presets[name];
    params.icoBaseColor = p.icoBaseColor;
    params.starColor = p.starColor;
    params.bloomIntensity = p.bloomIntensity;
    gui.controllersRecursive().forEach((c) => c.updateDisplay());
  });

  const particles = gui.addFolder("Particles");
  particles.add(params, "particleSize", 0.01, 0.15, 0.005).name("Size");
  particles.add(params, "particleOpacity", 0.1, 1.0, 0.05).name("Opacity");
  particles.add(params, "particleBlur", 0, 1, 0.05).name("Blur");
  particles.add(params, "particlePushForce", 0.01, 0.1, 0.005).name("Push Force");

  const ico = gui.addFolder("Icosahedron");
  ico.add(params, "icoWireframe").name("Wireframe");
  ico.add(params, "icoDeformation", 0, 0.8, 0.05).name("Deformation");
  ico.add(params, "mouseAttract", 0, 1, 0.05).name("Mouse Attract");
  ico.addColor(params, "icoBaseColor").name("Base Color");

  const bloom = gui.addFolder("Bloom");
  bloom.add(params, "bloomIntensity", 0, 5, 0.1).name("Intensity");
  bloom.add(params, "bloomThreshold", 0, 1, 0.05).name("Threshold");
  bloom.add(params, "bloomRadius", 0, 2, 0.05).name("Radius");

  const bg = gui.addFolder("Background");
  bg.add(params, "starTwinkle", 0, 1, 0.05).name("Twinkle");
  bg.addColor(params, "starColor").name("Star Color");

  const cam = gui.addFolder("Camera");
  cam.add(params, "cameraOrbitSpeed", 0, 3, 0.1).name("Orbit Speed");
  cam.add(params, "cameraBassPush", 0, 1, 0.05).name("Bass Push");

  const general = gui.addFolder("General");
  general.add(params, "rotationSpeed", 0, 3, 0.1).name("Rotation Speed");
  general.add(params, "bassReactivity", 0, 1, 0.05).name("Bass Reactivity");
  general.add(params, "trebleReactivity", 0, 1, 0.05).name("Treble Reactivity");

  gui.close(); // start collapsed so it doesn't obscure the visuals
}
