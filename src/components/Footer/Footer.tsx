"use client";

import Image from "next/image";
import { Github, Mail, Shield, Terminal, ArrowUp, Lock, CheckCircle2 } from "lucide-react";

interface FooterProps {
  onOpenContact: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-zinc-950 border-t border-white/10 relative z-20 text-zinc-400 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Brand & Avatar */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden p-[2px] bg-white shadow-lg">
                <div className="w-full h-full rounded-full overflow-hidden bg-black">
                  <Image
                    src="/profile.jpg"
                    alt="Sonsuscato"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-xl tracking-tight leading-none">
                  Sonsuscato
                </span>
                <span className="text-xs font-mono font-semibold text-cyan-400 tracking-wider mt-1">
                  KAYRA DİVRİK
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Siber Güvenlik &amp; Linux Sistem Yönetimi alanında geliştirilmiş kişisel portfolyo. Sızma testleri, sistem otomasyonu ve güvenli web mimarileri.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Sistem Durumu: Aktif &amp; Korumalı</span>
            </div>
          </div>

          {/* Middle Column: Quick Links */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-mono">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  Ana Sayfa
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/kayradivrik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>GitHub Repoları</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-white transition-colors"
                >
                  İletişim &amp; PGP Anahtarı
                </button>
              </li>
            </ul>
          </div>

          {/* Right Column: Socials & Support */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-mono">
              Takip Et &amp; Bağlantılar
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/kayradivrik"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 hover:border-white/30 text-white transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenContact}
                className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 hover:border-white/30 text-white transition-all hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-zinc-300">Sonsuscato (Kayra Divrik)</strong>. Tüm Hakları Saklıdır.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/10 transition-all text-xs"
          >
            <span>Yukarı Çık</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
