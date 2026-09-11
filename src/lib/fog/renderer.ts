import { FOG_FRAG, FOG_VERT } from './glsl';

export interface FogRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface FogRendererOptions {
  panel: boolean;
  getRect: () => FogRect;
  getAnchor?: () => number;
  isQuiet?: () => boolean;
  fadeSeconds?: number;
  maxScale?: number;
  maxFps?: number;
}

const QUALITY_STEPS = [1.0, 0.8, 0.62, 0.48];
const QUIET_RESOLUTION = 0.5;
const QUIET_FRAME_MS = 1000 / 24;

const MAX_DPR = 1.5;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[fog] shader failed to compile:\n' + gl.getShaderInfoLog(shader));
    }
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export interface FogRenderer {
  destroy: () => void;
}

export function createFogRenderer(
  canvas: HTMLCanvasElement,
  options: FogRendererOptions,
): FogRenderer | null {
  const gl =
    (canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    }) as WebGLRenderingContext | null) ??
    (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

  if (!gl) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, FOG_VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FOG_FRAG);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  const aPos = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uViewport = gl.getUniformLocation(program, 'uViewport');
  const uRect = gl.getUniformLocation(program, 'uRect');
  const uTime = gl.getUniformLocation(program, 'uTime');
  const uFade = gl.getUniformLocation(program, 'uFade');
  const uAnchor = gl.getUniformLocation(program, 'uAnchor');
  const uPanel = gl.getUniformLocation(program, 'uPanel');

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);
  gl.uniform1f(uPanel, options.panel ? 1 : 0);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fadeSeconds = options.fadeSeconds ?? 1.4;
  const maxScale = options.maxScale ?? 1;
  const frameMs = options.maxFps ? 1000 / options.maxFps : 0;

  let qualityIndex = 0;
  let quiet = false;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const zoom = canvas.clientWidth > 0 ? rect.width / canvas.clientWidth : 1;
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR) * zoom;
    const scale =
      (QUALITY_STEPS[qualityIndex] ?? 1) * maxScale * (quiet ? QUIET_RESOLUTION : 1);

    const w = Math.max(1, Math.round(canvas.clientWidth * dpr * scale));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr * scale));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  resize();

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  window.addEventListener('resize', resize);

  let raf = 0;
  let elapsed = 0;
  let last = performance.now();
  let fadeProgress = 0;
  let slowFrames = 0;
  let running = true;
  let anchorNow = options.getAnchor?.() ?? 0;
  let sinceDraw = 0;

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);

    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!running) return;

    const wantQuiet = options.isQuiet?.() ?? false;
    if (wantQuiet !== quiet) {
      quiet = wantQuiet;
      resize();
    }

    if (qualityIndex < QUALITY_STEPS.length - 1) {
      if (dt > 0.028) {
        slowFrames++;
        if (slowFrames > 45) {
          slowFrames = 0;
          qualityIndex++;
          resize();
        }
      } else {
        slowFrames = Math.max(0, slowFrames - 1);
      }
    }

    if (!reduceMotion) elapsed += dt;

    fadeProgress = Math.min(1, fadeProgress + dt / fadeSeconds);
    const fade = 1 - Math.pow(1 - fadeProgress, 3);

    const target = options.getAnchor?.() ?? 0;
    anchorNow += (target - anchorNow) * (1 - Math.exp(-dt * 3.2));
    if (Math.abs(target - anchorNow) < 0.001) anchorNow = target;

    sinceDraw += dt * 1000;
    const minFrameMs = quiet ? QUIET_FRAME_MS : frameMs;
    if (sinceDraw < minFrameMs) return;
    sinceDraw = 0;

    const rect = options.getRect();
    gl.uniform2f(uViewport, window.innerWidth, window.innerHeight);
    gl.uniform4f(uRect, rect.x, rect.y, rect.w, rect.h);
    gl.uniform1f(uTime, elapsed);
    gl.uniform1f(uFade, fade);
    gl.uniform1f(uAnchor, anchorNow);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  raf = requestAnimationFrame(frame);

  const onVisibility = () => {
    running = !document.hidden;
    last = performance.now();
  };
  document.addEventListener('visibilitychange', onVisibility);

  const onLost = (e: Event) => {
    e.preventDefault();
    cancelAnimationFrame(raf);
  };
  canvas.addEventListener('webglcontextlost', onLost);

  return {
    destroy() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onLost);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}
