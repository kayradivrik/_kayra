"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Github, Mail, Terminal, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-3 group text-left"
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/20 group-hover:ring-cyan-400 transition-all duration-300">
            <Image
              src="/profile.jpg"
              alt="Sonsuscato"
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-white text-base tracking-tight leading-none group-hover:text-cyan-300 transition-colors">
              Sonsuscato
            </span>
            <span className="text-[10px] font-mono font-medium text-cyan-400/90 tracking-wider">
              KAYRA DİVRİK
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <button
            onClick={() => scrollToSection("hero")}
            className="hover:text-white transition-colors"
          >
            Ana Sayfa
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="hover:text-white transition-colors"
          >
            Öne Çıkan Çalışmalar
          </button>
          <button
            onClick={onOpenContact}
            className="hover:text-white transition-colors"
          >
            İletişim
          </button>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/kayradivrik"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/30 text-xs font-semibold text-white transition-all backdrop-blur-md"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <button
            onClick={onOpenContact}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black hover:bg-white/85 text-xs font-bold transition-all active:scale-95 shadow-lg"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Bana Ulaş</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-zinc-300 hover:text-white p-1"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-zinc-950/95 border-b border-white/10 px-4 py-6 backdrop-blur-2xl flex flex-col gap-4 text-sm text-zinc-200"
        >
          <button
            onClick={() => scrollToSection("hero")}
            className="text-left font-medium hover:text-cyan-400 py-1"
          >
            Ana Sayfa
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="text-left font-medium hover:text-cyan-400 py-1"
          >
            Öne Çıkan Çalışmalar
          </button>
          <button
            onClick={onOpenContact}
            className="text-left font-medium hover:text-cyan-400 py-1"
          >
            İletişim
          </button>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="https://github.com/kayradivrik"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white text-xs font-semibold"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Profilini Gör</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white text-black text-xs font-bold"
            >
              <Mail className="w-4 h-4" />
              <span>Bana Ulaş</span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
