"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export function FadeIn({ children, delay = 0, direction = "up", className = "" }: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directions[direction],
        filter: "blur(10px)",
      }}
      animate={{
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : directions[direction].x,
        y: isInView ? 0 : directions[direction].y,
        filter: isInView ? "blur(0px)" : "blur(10px)",
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Cubic bezier for that GSAP-like silky smooth feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
