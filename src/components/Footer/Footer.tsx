"use client";

import { Github, Mail, ArrowUp, ShieldCheck, Terminal, Heart } from "lucide-react";

interface FooterProps {
  onOpenContact: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      scrollToTop();
    }
  };

  return (
    <footer className="w-full bg-zinc-950 border-t border-white/10 relative z-20 text-zinc-400 text-xs backdrop-blur-2xl">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/[0.08]">
          
          {/* Brand & Mission (5 Cols) */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={scrollToTop}>
              <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10 group-hover:border-cyan-400/50 transition-colors">
                <Terminal className="w-5 h-5 text-white group-hover:text-cyan-300 transition-colors" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-white text-lg tracking-tight leading-none group-hover:text-cyan-300 transition-colors">
                  Sonsuscato
                </span>
                <span className="text-[10px] font-mono font-semibold text-cyan-400 tracking-widest mt-1 uppercase">
                  KAYRA DİVRİK
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Siber Güvenlik &amp; Linux Sistem Mühendisliği portfolyosu. Doğuş Üniversitesi Bilişim Güvenliği öğrencisi ve freelance geliştirici.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Sistem Durumu: Aktif &amp; Korumalı</span>
            </div>
          </div>

          {/* Nav Links (3 Cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest font-mono">
              Navigasyon
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => scrollToSection("hero")} className="hover:text-white transition-colors">
                  Ana Sayfa
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("experience")} className="hover:text-white transition-colors">
                  Eğitim &amp; Yolculuk
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("projects")} className="hover:text-white transition-colors">
                  Öne Çıkan Çalışmalar
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors">
                  İletişim &amp; Destek
                </button>
              </li>
            </ul>
          </div>

          {/* Socials & Actions (4 Cols) */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest font-mono">
              Bağlantılar &amp; İletişim
            </h4>
            
            <div className="space-y-2 text-xs">
              <a
                href="https://github.com/kayradivrik"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub (@kayradivrik)</span>
              </a>

              <button
                onClick={onOpenContact}
                className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors text-left"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>projects.kayra@gmail.com</span>
              </button>
            </div>

            <div className="mt-2 pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/30 text-zinc-200 hover:text-white transition-all text-xs font-medium backdrop-blur-md shadow-lg"
              >
                <span>Yukarı Çık</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-zinc-300">Sonsuscato (Kayra Divrik)</strong>. Tüm Hakları Saklıdır.
          </div>

          <div className="flex items-center gap-1 text-zinc-500">
            <span>Next.js &amp; Tailwind CSS ile geliştirildi.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
