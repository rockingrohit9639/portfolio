/**
 * Vertex Shader for the audio-reactive sphere.
 *
 * What happens here (runs once per vertex, on the GPU):
 * - We displace each vertex outward using a noise function
 * - The noise is driven by time + audio data, so the surface ripples organically
 * - We pass data to the fragment shader via "varyings" (variables that interpolate across the face)
 */

// Uniforms: values passed from JavaScript, same for all vertices
uniform float uTime;
uniform float uBass;
uniform float uMid;
uniform float uTreble;
uniform float uDeformation;
uniform vec3 uAttractPoint;
uniform float uAttractStrength;

// Varyings: passed to fragment shader, interpolated across each triangle
varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;

// Classic 3D simplex noise (compact version)
// Gives organic, cloud-like randomness based on a 3D input
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;

  // Multiple layers of noise at different scales for organic movement
  float noise1 = snoise(position * 2.0 + uTime * 0.3) * uBass;
  float noise2 = snoise(position * 4.0 + uTime * 0.5) * uMid * 0.5;
  float noise3 = snoise(position * 8.0 + uTime * 0.8) * uTreble * 0.25;

  // Combined displacement — each frequency band drives a different noise scale
  float displacement = (noise1 + noise2 + noise3) * uDeformation;
  vDisplacement = displacement;

  // Displace vertex along its normal
  vec3 newPosition = position + normal * displacement;

  // Mouse attraction: pull vertices toward the attract point
  vec3 toAttract = uAttractPoint - newPosition;
  float dist = length(toAttract);
  float influence = smoothstep(2.0, 0.0, dist) * uAttractStrength;
  newPosition += toAttract * influence * 0.3;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
