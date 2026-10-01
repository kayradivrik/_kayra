"use client";

import { motion } from "framer-motion";

export function CatLogo() {
  return (
    <div className="relative flex items-end font-bold text-zinc-900 dark:text-white tracking-tighter" style={{ fontSize: "1.75rem", lineHeight: "1" }}>
      {/* The 'k' and 'd' */}
      <span className="relative z-10">k</span>
      
      <div className="relative">
        <span className="relative z-10">d</span>
        
        {/* Cat Ears on top of 'd' */}
        <svg 
          width="16" 
          height="10" 
          viewBox="0 0 16 10" 
          className="absolute -top-1.5 left-0.5 text-zinc-900 dark:text-white"
          fill="currentColor"
        >
          <path d="M2,8 L0,0 L6,5 Z" />
          <path d="M12,5 L16,0 L14,8 Z" />
        </svg>
      </div>

      {/* The hanging right paw (replaces the dot) */}
      <motion.div 
        className="ml-1 flex flex-col items-center justify-start origin-top"
        initial={{ rotate: -10 }}
        animate={{ rotate: 10 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1.5,
          ease: "easeInOut"
        }}
        style={{ marginTop: "12px" }}
      >
        <svg width="8" height="16" viewBox="0 0 8 16" fill="currentColor" className="text-zinc-900 dark:text-white">
          <path d="M2,0 C2,0 0,8 1,13 C1.5,15.5 6.5,15.5 7,13 C8,8 6,0 6,0 Z" />
        </svg>
      </motion.div>
    </div>
  );
}
