"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function GitRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme !== 'dark') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Github ikonunu off-screen canvas'a cizelim (Performans)
    const iconCanvas = document.createElement("canvas");
    const iconCtx = iconCanvas.getContext("2d");
    const iconSize = 24;
    iconCanvas.width = iconSize;
    iconCanvas.height = iconSize;
    
    if (iconCtx) {
      // İkonu tam ortalamak ve sığdırmak için scale ediyoruz
      iconCtx.scale(1.2, 1.2);
      const path = new Path2D("M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z");
      // Turuncu renk: #f97316 (orange-500)
      iconCtx.fillStyle = "#f97316"; 
      iconCtx.fill(path);
    }

    const colWidth = 60; // Daha seyrek
    const columns = Math.floor(width / colWidth);
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -200; // Ekran dışında daha yukarılarda başlasınlar
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(9, 9, 11, 0.05)"; // İzler daha yavaş silinsin
      ctx.fillRect(0, 0, width, height);
      
      const centerX = width / 2;

      for (let i = 0; i < drops.length; i++) {
        const xPos = i * colWidth;
        const currentDrop = drops[i];
        
        if (currentDrop === undefined) continue;

        // Ekranın tam ortasında (yaklaşık 900px'lik alanda) ikon yağmasını engelle
        if (xPos > centerX - 500 && xPos < centerX + 500) {
          continue;
        }

        ctx.drawImage(iconCanvas, xPos, currentDrop * colWidth, 18, 18);

        // Ekrandan çok çıktıysa ve çok düşük bir ihtimalle tekrar başlat (tek tük)
        if (currentDrop * colWidth > height && Math.random() > 0.995) {
          drops[i] = Math.random() * -50;
        } else {
          // Çok yavaş düşüş hızı
          drops[i] = currentDrop + 0.15;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      const newColumns = Math.floor(width / colWidth);
      if (newColumns > drops.length) {
        for (let i = drops.length; i < newColumns; i++) {
          drops[i] = Math.random() * -100;
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  if (resolvedTheme !== 'dark') return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.15] z-0"
      aria-hidden="true"
    />
  );
}
