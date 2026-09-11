"use client";

import { useEffect, useRef, useState } from 'react';

import { fogSupported } from '../../lib/fog/capability';
import { createFogRenderer, type FogRect } from '../../lib/fog/renderer';

interface FogSurfaceProps {
  className?: string;
  fadeSeconds?: number;
  maxScale?: number;
}

const FogSurface = ({ className = '', fadeSeconds = 1.1, maxScale = 0.8 }: FogSurfaceProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [enabled, setEnabled] = useState(false);
  useEffect(() => setEnabled(fogSupported()), []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getRect = (): FogRect => {
      const r = canvas.getBoundingClientRect();
      return { x: r.left, y: r.top, w: r.width, h: r.height };
    };

    const renderer = createFogRenderer(canvas, {
      panel: true,
      getRect,
      fadeSeconds,
      maxScale,
    });

    return () => renderer?.destroy();
  }, [enabled, fadeSeconds, maxScale]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 w-full h-full block pointer-events-none ${className}`}
    />
  );
};

export default FogSurface;
