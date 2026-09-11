"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, Terminal } from "lucide-react";

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
    period: "GÜNCEL // DEVAM EDİYOR",
    isCurrent: true,
    title: "Doğuş Üniversitesi",
    subtitle: "Bilişim Güvenliği ve Teknolojileri",
    description: "Sistem güvenliği, sızma testleri (pentesting), ağ protokolleri, siber savunma mimarileri ve zararlı yazılım analizi üzerine lisans eğitimi.",
    tags: ["Bilişim Güvenliği", "Sızma Testi", "Ağ Güvenliği", "Linux Hardening", "Kriptografi"]
  },
  {
    id: 2,
    period: "MEZUN",
    isCurrent: false,
    title: "Madenler Meslek Lisesi",
    subtitle: "Bilişim Teknolojileri Bölümü",
    description: "Yazılım geliştirme temelleri, veritabanı yönetimi, C++ programlama ve bilgisayar ağ altyapıları üzerine ilk teknik uzmanlık eğitimi.",
    tags: ["Bilişim Teknolojileri", "C++ Programlama", "Ağ Sistemleri", "Veritabanı"]
  }
];

export default function ExperienceSection() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-16 relative z-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/90 text-xs font-mono font-semibold tracking-wider uppercase mb-3 backdrop-blur-md">
          <GraduationCap className="w-3.5 h-3.5 text-white" />
          <span>EĞİTİM &amp; YOLCULUK</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          JOURNEY <span className="text-white/40">&amp;</span> EXPERIENCE
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-lg">
          Akademik geçmişim, bilişim ve siber güvenlik alanındaki uzmanlaşma adımlarım.
        </p>
      </motion.div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-2 sm:before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-white/50 before:via-white/20 before:to-white/5">
        {JOURNEY_DATA.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="relative group"
          >
            {/* Timeline Dot Node */}
            <div className="absolute -left-[27px] sm:-left-[35px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-white flex items-center justify-center shadow-[0_0_12px_rgba(255,255,255,0.6)] group-hover:scale-125 transition-transform duration-300">
              <div className={`w-1.5 h-1.5 rounded-full ${item.isCurrent ? "bg-white animate-pulse" : "bg-zinc-400"}`} />
            </div>

            {/* Timeline Card */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 shadow-2xl overflow-hidden">
              {/* Top Status Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-md text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase border ${
                  item.isCurrent
                    ? "bg-white text-black border-white shadow-md"
                    : "bg-white/[0.05] text-zinc-300 border-white/10"
                }`}>
                  {item.period}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.isCurrent ? "2024 — Günümüz" : "Mezun"}</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-cyan-400/90 font-mono mt-0.5">
                {item.subtitle}
              </p>

              {/* Description */}
              <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {item.description}
              </p>

              {/* Tech / Subject Tags */}
              <div className="mt-5 pt-4 border-t border-white/[0.08] flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-md bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white transition-colors"
                  >
                    {tag}
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
