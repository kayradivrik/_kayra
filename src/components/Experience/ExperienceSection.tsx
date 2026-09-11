"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    period: "2024 — 2026 (Present)",
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
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, clientWidth } = sliderRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.85 || 280));
    setActiveIndex(Math.min(index, JOURNEY_DATA.length - 1));
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.85 || 280;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const scrollToCard = (index: number) => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.clientWidth * 0.85 || 280;
    sliderRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16 relative z-20">
      {/* Clean Minimalist Header (Pill badge removed) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center mb-10"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Academic Background
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-md">
          My academic roadmap and specialization steps in IT &amp; Cybersecurity.
        </p>
      </motion.div>

      {/* Cards: Cool Mobile Horizontal Slider / Desktop Vertical Stack */}
      <div className="relative">
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pt-1 px-4 -mx-4 scrollbar-none md:flex-col md:space-y-6 md:gap-0 md:overflow-visible md:px-0 md:mx-0 md:pb-0"
        >
          {JOURNEY_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-5 sm:p-8 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 w-[85vw] sm:w-[340px] shrink-0 snap-center md:w-full md:shrink md:snap-align-none flex flex-col justify-between"
            >
              <div>
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-cyan-300/90 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="text-[11px] sm:text-xs font-mono text-zinc-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-lg self-start sm:self-auto shrink-0 mt-1 sm:mt-0">
                    {item.period}
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {/* Minimal Tag Pills */}
              <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-mono text-zinc-400 bg-white/[0.03] border border-white/[0.08] rounded-md hover:border-white/20 hover:text-zinc-200 transition-all duration-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Slider Indicators (< ■ ■ >) */}
        <div className="flex md:hidden justify-center items-center gap-3 mt-4">
          <button
            onClick={() => scroll('left')}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all active:scale-95"
            aria-label="Previous Education Card"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {JOURNEY_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToCard(idx)}
                className={`w-2.5 h-2.5 rounded-sm transition-all duration-300 ${
                  activeIndex === idx
                    ? "bg-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    : "bg-zinc-700/80 hover:bg-zinc-500"
                }`}
                aria-label={`Go to card ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all active:scale-95"
            aria-label="Next Education Card"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}



