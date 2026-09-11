"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, Menu, X } from "lucide-react";

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
          ? "bg-zinc-950/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5 sm:py-4"
          : "bg-transparent py-5 sm:py-6"
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
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-zinc-300 hover:text-white p-1"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-zinc-950/95 border-b border-white/10 px-6 py-6 backdrop-blur-2xl flex flex-col gap-4 text-base font-bold text-zinc-200"
        >
          <button
            onClick={() => scrollToSection("hero")}
            className="text-left hover:text-cyan-400 py-1"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("experience")}
            className="text-left hover:text-cyan-400 py-1"
          >
            Education &amp; Experience
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="text-left hover:text-cyan-400 py-1"
          >
            Featured Projects
          </button>
          <button
            onClick={onOpenContact}
            className="text-left hover:text-cyan-400 py-1"
          >
            Contact
          </button>

          <div className="pt-2 flex justify-start">
            <a
              href="https://github.com/kayradivrik"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-semibold"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
