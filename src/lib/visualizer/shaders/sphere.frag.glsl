/**
 * Fragment Shader for the audio-reactive sphere.
 *
 * What happens here (runs once per pixel, on the GPU):
 * - Fresnel effect: edges glow brighter than the center (like a crystal ball)
 * - Color is based on displacement (peaks = hot color, valleys = cool color)
 * - Inner glow adds a pulsing core light
 */

uniform float uTime;
uniform float uBass;
uniform float uMid;
uniform float uTreble;
uniform vec3 uBaseColor;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;

void main() {
  // Fresnel: how much is the surface facing away from the camera?
  // dot(normal, viewDir) = 1 when facing camera, 0 at edges
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = 1.0 - abs(dot(vNormal, viewDir));
  fresnel = pow(fresnel, 2.5); // sharpen the falloff

  // Map displacement to color: valleys = base color, peaks = bright/warm
  float intensity = smoothstep(-0.3, 0.5, vDisplacement);

  // Two-tone color blend driven by audio energy
  vec3 coolColor = uBaseColor * 0.4;
  vec3 hotColor = uBaseColor + vec3(0.3, 0.1, 0.0); // shift toward warm

  vec3 surfaceColor = mix(coolColor, hotColor, intensity);

  // Add fresnel rim glow
  vec3 rimColor = uBaseColor * 1.5 + vec3(0.2, 0.1, 0.3);
  surfaceColor += rimColor * fresnel * (0.5 + uBass * 0.5);

  // Subtle pulsing inner glow based on mid frequencies
  float innerGlow = (1.0 - fresnel) * uMid * 0.3;
  surfaceColor += uBaseColor * innerGlow;

  // Overall brightness boost with treble (sparkle)
  surfaceColor += vec3(0.05) * uTreble;

  gl_FragColor = vec4(surfaceColor, 1.0);
}
