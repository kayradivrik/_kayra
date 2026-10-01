"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  SiArchlinux, SiNeovim, SiTmux, SiCplusplus, 
  SiPython, SiGo, SiTypescript, SiNextdotjs, 
  SiBurpsuite 
} from "react-icons/si";
import { FaNetworkWired } from "react-icons/fa6";

const tools = [
  { name: "Arch Linux", category: "OS / Env", icon: SiArchlinux },
  { name: "Neovim", category: "Editor", icon: SiNeovim },
  { name: "Tmux", category: "Terminal", icon: SiTmux },
  { name: "C++", category: "Language", icon: SiCplusplus },
  { name: "Python", category: "Language", icon: SiPython },
  { name: "Go", category: "Language", icon: SiGo },
  { name: "TypeScript", category: "Language", icon: SiTypescript },
  { name: "Next.js", category: "Framework", icon: SiNextdotjs },
  { name: "Burp Suite", category: "Security", icon: SiBurpsuite },
  { name: "Nmap", category: "Security", icon: FaNetworkWired },
];

export function StackTools() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" onMouseLeave={() => setHoveredIndex(null)}>
      {tools.map((tool, idx) => {
        const isHovered = hoveredIndex === idx;
        const isOtherHovered = hoveredIndex !== null && hoveredIndex !== idx;

        return (
          <motion.div
            key={tool.name}
            onMouseEnter={() => setHoveredIndex(idx)}
            animate={{
              opacity: isOtherHovered ? 0.4 : 1,
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`
              relative p-4 rounded-2xl border transition-colors duration-300
              ${isHovered 
                ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 shadow-xl shadow-orange-500/5 z-10" 
                : "bg-zinc-50 dark:bg-zinc-950/50 border-zinc-100 dark:border-zinc-800/50"
              }
            `}
          >
            <div className="flex flex-col gap-3">
              <div className="text-3xl mb-1 text-zinc-700 dark:text-zinc-300">
                <tool.icon />
              </div>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {tool.name}
              </h4>
              <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-400">
                {tool.category}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
