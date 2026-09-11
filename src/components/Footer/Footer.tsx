"use client";

import { Github, Mail, Shield, Terminal, ArrowUp, Lock, CheckCircle2 } from "lucide-react";

interface FooterProps {
  onOpenContact: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-zinc-950/90 border-t border-white/[0.08] relative z-20 text-zinc-400 text-xs backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col items-center text-center gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-2.5 cursor-pointer group" onClick={scrollToTop}>
          <div className="flex flex-col text-center">
            <span className="font-extrabold text-white text-base tracking-tight leading-none group-hover:text-cyan-300 transition-colors">
              Sonsuscato
            </span>
            <span className="text-[10px] font-mono font-semibold text-cyan-400 tracking-widest mt-1 uppercase">
              KAYRA DİVRİK
            </span>
          </div>
        </div>

        {/* Minimal Horizontal Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 font-medium">
          <button onClick={scrollToTop} className="hover:text-white transition-colors">
            Ana Sayfa
          </button>
          <span className="text-zinc-700">•</span>
          <a href="https://github.com/kayradivrik" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            GitHub Repoları
          </a>
          <span className="text-zinc-700">•</span>
          <button onClick={onOpenContact} className="hover:text-white transition-colors">
            İletişim
          </button>
        </div>

        {/* Social Buttons & Back to Top */}
        <div className="flex items-center gap-3 pt-1">
          <a
            href="https://github.com/kayradivrik"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-zinc-300 hover:text-white transition-all backdrop-blur-md"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenContact}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-zinc-300 hover:text-white transition-all backdrop-blur-md"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </button>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-zinc-300 hover:text-white transition-all backdrop-blur-md flex items-center gap-1.5 px-3 text-[11px]"
            title="Yukarı Çık"
          >
            <span>Yukarı</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-white/[0.06] w-full text-[11px] text-zinc-500 font-mono">
          &copy; {new Date().getFullYear()} Sonsuscato (Kayra Divrik). Tüm Hakları Saklıdır.
        </div>

      </div>
    </footer>
  );
}
