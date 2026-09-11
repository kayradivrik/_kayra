"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenContact: () => void;
  onExpandSections?: () => void;
}

export default function Navbar({ onOpenContact, onExpandSections }: NavbarProps) {
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
    if (id !== "hero") {
      onExpandSections?.();
    }
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/60 md:bg-zinc-950/85 backdrop-blur-md md:backdrop-blur-xl border-b border-white/5 md:border-white/10 shadow-2xl py-2.5 md:py-5 sm:py-6"
          : "bg-transparent py-3.5 md:py-8 sm:py-10"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2.5 group text-left"
        >
          <div className="flex flex-col">
            <span className="font-black text-white text-xl sm:text-2xl tracking-tight leading-none group-hover:text-cyan-300 transition-colors">
              Sonsuscato
            </span>
            <span className="text-xs font-mono font-bold text-cyan-400 tracking-widest mt-1 uppercase">
              KAYRA DİVRİK
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links - Large Font */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-base sm:text-lg font-bold text-zinc-200">
          <button
            onClick={() => scrollToSection("hero")}
            className="hover:text-white transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("experience")}
            className="hover:text-white transition-colors"
          >
            Education &amp; Experience
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="hover:text-white transition-colors"
          >
            Featured Projects
          </button>
          <button
            onClick={onOpenContact}
            className="hover:text-white transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Right Actions: Only GitHub Logo Icon */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/kayradivrik"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="p-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300"
          >
            <Github className="w-5 h-5 text-white filter drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.06] border border-white/15 text-white shadow-lg backdrop-blur-md active:bg-white/10 transition-all duration-300"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Menu className="w-5 h-5 text-white" />
          )}
        </motion.button>
      </div>

      {/* Mobile Glass Drawer Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="md:hidden mx-4 mt-3 p-5 rounded-2xl bg-zinc-950/95 border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-3"
        >
          {/* Top subtle cyan accent bar */}
          <div className="w-10 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 mb-1 opacity-80" />

          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center justify-between py-2.5 px-3.5 rounded-xl text-left text-base font-bold text-zinc-200 hover:text-white hover:bg-white/[0.06] active:bg-white/10 transition-all"
          >
            <span>Home</span>
            <span className="text-xs font-mono text-cyan-400/80">01</span>
          </button>

          <button
            onClick={() => scrollToSection("experience")}
            className="flex items-center justify-between py-2.5 px-3.5 rounded-xl text-left text-base font-bold text-zinc-200 hover:text-white hover:bg-white/[0.06] active:bg-white/10 transition-all"
          >
            <span>Education &amp; Experience</span>
            <span className="text-xs font-mono text-cyan-400/80">02</span>
          </button>

          <button
            onClick={() => scrollToSection("projects")}
            className="flex items-center justify-between py-2.5 px-3.5 rounded-xl text-left text-base font-bold text-zinc-200 hover:text-white hover:bg-white/[0.06] active:bg-white/10 transition-all"
          >
            <span>Featured Projects</span>
            <span className="text-xs font-mono text-cyan-400/80">03</span>
          </button>

          <button
            onClick={onOpenContact}
            className="flex items-center justify-between py-2.5 px-3.5 rounded-xl text-left text-base font-bold text-zinc-200 hover:text-white hover:bg-white/[0.06] active:bg-white/10 transition-all"
          >
            <span>Contact</span>
            <span className="text-xs font-mono text-cyan-400/80">04</span>
          </button>

          <div className="pt-3 mt-1 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">@kayradivrik</span>
            <a
              href="https://github.com/kayradivrik"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-semibold hover:bg-white/20 transition-all shadow-md"
            >
              <Github className="w-4 h-4 text-white filter drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
