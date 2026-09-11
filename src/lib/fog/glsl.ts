export const FOG_VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

export const FOG_FRAG = `
precision highp float;

varying vec2 vUv;

uniform vec2  uViewport;
uniform vec4  uRect;
uniform float uTime;
uniform float uFade;
uniform float uAnchor;
uniform float uPanel;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
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
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

const mat3 ROT = mat3( 0.00,  0.80,  0.60,
                      -0.80,  0.36, -0.48,
                      -0.60, -0.48,  0.64);

float fbm(vec3 p) {
  float f = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) {
    f += a * snoise(p);
    p = ROT * p * 2.05;
    a *= 0.5;
  }
  return f;
}

float haze(vec3 p) {
  float q = fbm(p);
  return fbm(p + vec3(q * 0.38, q * 0.24, 0.0));
}

const vec3 C_HAZE = vec3(1.0, 1.0, 1.0);

float band(float n, float d) {
  float hs = d * 0.97;
  float hn = hs + (n - 0.5) * 0.13;

  float mask = smoothstep(0.95, -0.05, hn);
  mask *= mask;

  float glow = exp(-max(hs, 0.0) * 3.2);

  float dens = n * mask * 0.60 + glow * 0.30;
  return dens * smoothstep(0.74, 0.548, d);
}

void main() {
  vec2 uv;
  uv.x = (uRect.x + vUv.x * uRect.z) / max(uViewport.x, 1.0);
  uv.y = 1.0 - (uRect.y + (1.0 - vUv.y) * uRect.w) / max(uViewport.y, 1.0);

  float aspect = uViewport.x / max(uViewport.y, 1.0);
  float t = uTime;

  vec3 pA = vec3(uv.x * aspect * 0.60 + t * 0.006,
                 uv.y * 0.92          - t * 0.009,
                 t * 0.014);
  float a = haze(pA) * 0.5 + 0.5;

  vec3 pB = vec3(uv.x * aspect * 1.00 - t * 0.008,
                 uv.y * 1.24          - t * 0.012,
                 t * 0.020 + 19.0);
  float b = haze(pB) * 0.5 + 0.5;

  float n = clamp(a * 0.55 + b * 0.45, 0.0, 1.0);
  n = mix(0.5, n, 0.80);

  float bandCore = mix(band(n, uv.y), band(n, 1.0 - uv.y), uAnchor);

  float bandDensity = bandCore
    * smoothstep(0.0, 0.12, uv.x) * smoothstep(1.0, 0.88, uv.x);

  vec2 fromCentre = vUv - 0.5;
  float rim = smoothstep(0.08, 0.60, length(fromCentre * vec2(1.0, 1.22)));
  float shared = clamp(bandCore * 2.2, 0.0, 1.0);
  float panelDensity = n * mix(0.20, 0.62, shared) * mix(0.90, 1.10, rim);

  float density = clamp(mix(bandDensity, panelDensity, uPanel), 0.0, 1.0);

  vec3 col = C_HAZE * mix(0.90, 1.0, density);

  float alpha = pow(density, mix(1.70, 1.55, uPanel))
              * mix(1.90, 1.35, uPanel)
              * uFade;

  float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  alpha += (dither - 0.5) / 255.0;
  col   += (dither - 0.5) / 255.0;

  alpha = clamp(alpha, 0.0, 1.0);

  gl_FragColor = vec4(col * alpha, alpha);
}
`;
