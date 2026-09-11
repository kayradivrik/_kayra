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

      {/* Cards: Full-Width Stack for Maximum Readability */}
      <div className="flex flex-col gap-6">
        {JOURNEY_DATA.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500 w-full flex flex-col justify-between shadow-xl"
          >
            <div>
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base font-mono font-semibold text-cyan-400 mt-1">
                    {item.subtitle}
                  </p>
                </div>

                <div className="text-xs sm:text-sm font-mono text-zinc-300 bg-white/[0.06] border border-white/10 px-3 py-1.5 rounded-xl self-start sm:self-auto shrink-0 font-medium">
                  {item.period}
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>

            {/* Tag Pills */}
            <div className="mt-5 sm:mt-6 flex flex-wrap gap-2 pt-3 border-t border-white/[0.06]">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs sm:text-sm font-mono text-zinc-300 bg-white/[0.04] border border-white/10 rounded-lg hover:border-white/20 hover:text-white transition-all duration-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}



