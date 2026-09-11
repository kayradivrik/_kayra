"use client";

import { useEffect, useRef, useState } from "react";

import { fogSupported } from "../../lib/fog/capability";
import { createFogRenderer, type FogRect } from "../../lib/fog/renderer";
import { subscribeModalPresence } from "../../lib/modalPresence";

interface FogBackgroundProps {
  anchor?: number;
}

const FogBackground = ({ anchor = 0 }: FogBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetAnchor = useRef(anchor);

  const [shaderEnabled, setShaderEnabled] = useState(false);
  useEffect(() => setShaderEnabled(fogSupported()), []);

  useEffect(() => {
    targetAnchor.current = anchor;
  }, [anchor]);

  useEffect(() => {
    if (!shaderEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getRect = (): FogRect => ({
      x: 0,
      y: 0,
      w: window.innerWidth,
      h: window.innerHeight,
    });

    let quiet = false;
    const unsubscribe = subscribeModalPresence((anyOpen) => {
      quiet = anyOpen;
    });

    const renderer = createFogRenderer(canvas, {
      panel: false,
      getRect,
      getAnchor: () => targetAnchor.current,
      isQuiet: () => quiet,
      fadeSeconds: 1.4,
      maxScale: 0.72,
      maxFps: 30,
    });

    return () => {
      unsubscribe();
      renderer?.destroy();
    };
  }, [shaderEnabled]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none select-none"
      style={{ zIndex: 0 }}
    >
      <div
        className="absolute inset-0 transition-opacity duration-[900ms] ease-out"
        style={{
          opacity: 1 - anchor,
          background:
            "radial-gradient(120% 52% at 50% 100%, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.035) 34%, rgba(255,255,255,0) 68%)",
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-[900ms] ease-out"
        style={{
          opacity: anchor,
          background:
            "radial-gradient(120% 52% at 50% 0%, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.035) 34%, rgba(255,255,255,0) 68%)",
        }}
      />
      {shaderEnabled && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      )}
    </div>
  );
};

export default FogBackground;
