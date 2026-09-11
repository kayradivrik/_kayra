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
      className="fixed inset-0 pointer-events-none select-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Top Cyan/Blue Cyber Spot */}
      <div className="absolute -top-[10%] left-[15%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-cyan-500/[0.08] blur-[130px]" />

      {/* Bottom Purple/Indigo Cyber Spot */}
      <div className="absolute -bottom-[10%] right-[10%] w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full bg-indigo-600/[0.08] blur-[140px]" />

      {/* Center White Ambient Spotlight */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] rounded-full bg-white/[0.04] blur-[120px]" />

      {/* Dynamic Radial Gradients */}
      <div
        className="absolute inset-0 transition-opacity duration-[900ms] ease-out"
        style={{
          opacity: 1 - anchor,
          background:
            "radial-gradient(120% 60% at 50% 100%, rgba(56, 189, 248, 0.07) 0%, rgba(168, 85, 247, 0.04) 40%, rgba(0,0,0,0) 75%)",
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-[900ms] ease-out"
        style={{
          opacity: anchor,
          background:
            "radial-gradient(120% 60% at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(59,130,246,0.04) 40%, rgba(0,0,0,0) 75%)",
        }}
      />
      {shaderEnabled && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      )}
    </div>
  );
};

export default FogBackground;
