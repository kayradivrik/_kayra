"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

interface JourneyItem {
  id: number;
  period: string;
  isCurrent: boolean;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

const JOURNEY_DATA: JourneyItem[] = [
  {
    id: 1,
    period: "2024 — Present",
    isCurrent: true,
    title: "Dogus University",
    subtitle: "Information Security & Technologies",
    description: "Undergraduate studies focused on system security, penetration testing, network protocols, cyber defense architectures, and malware analysis.",
    tags: ["Information Security", "Penetration Testing", "Network Security", "Linux Hardening", "Cryptography"]
  },
  {
    id: 2,
    period: "2020 — 2024",
    isCurrent: false,
    title: "Madenler Vocational High School",
    subtitle: "Information Technology Department",
    description: "Foundational technical education covering software development fundamentals, database management, C++ programming, and computer network infrastructure.",
    tags: ["Information Technology", "C++ Programming", "Network Systems", "Databases"]
  }
];

export default function ExperienceSection() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-20 relative z-20">
      {/* Clean Minimalist Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 text-xs font-mono tracking-wider uppercase mb-3">
          <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
          <span>EDUCATION &amp; JOURNEY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Academic Background
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-md">
          My academic roadmap and specialization steps in IT &amp; Cybersecurity.
        </p>
      </motion.div>

      {/* Sleek Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-10 ml-2 sm:ml-4">
        {JOURNEY_DATA.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="relative group"
          >
            {/* Glowing Node Dot on Timeline */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex items-center justify-center">
              <div
                className={`w-3.5 h-3.5 rounded-full border-2 border-black transition-all duration-300 ${
                  item.isCurrent
                    ? "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] ring-4 ring-cyan-500/20"
                    : "bg-zinc-600 group-hover:bg-zinc-300"
                }`}
              />
            </div>

            {/* Minimal Card Container */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500">
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                    {item.isCurrent && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-mono text-cyan-300/90 mt-1">
                    {item.subtitle}
                  </p>
                </div>

                <div className="text-xs font-mono text-zinc-400 bg-white/[0.03] border border-white/[0.07] px-3 py-1 rounded-lg self-start sm:self-auto">
                  {item.period}
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                {item.description}
              </p>

              {/* Minimal Tag Pills */}
              <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[11px] font-mono text-zinc-400 bg-white/[0.03] border border-white/[0.08] rounded-md hover:border-white/20 hover:text-zinc-200 transition-all duration-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

