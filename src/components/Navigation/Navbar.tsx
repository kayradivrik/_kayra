"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, Menu, X, Linkedin, Instagram } from "lucide-react";

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
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
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
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.06] border border-white/15 text-white shadow-lg backdrop-blur-md active:bg-white/10 transition-all duration-300"
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </motion.header>

      {/* Full-Screen Mobile Glass Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl md:hidden flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
          >
            {/* Top Bar: Brand & Close Button */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-black text-white text-2xl tracking-tight leading-none">
                  Sonsuscato
                </span>
                <span className="text-xs font-mono font-bold text-cyan-400 tracking-widest mt-1 uppercase">
                  KAYRA DİVRİK
                </span>
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-11 h-11 rounded-2xl bg-white/10 border border-white/20 text-white shadow-xl backdrop-blur-md active:bg-white/20 transition-all duration-300"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Middle Nav Links */}
            <div className="my-auto py-8 flex flex-col gap-4">
              {[
                { id: "hero", label: "Home", num: "01" },
                { id: "experience", label: "Education & Experience", num: "02" },
                { id: "projects", label: "Featured Projects", num: "03" },
                { id: "contact", label: "Contact", num: "04" },
              ].map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + idx * 0.06 }}
                  onClick={() => {
                    if (link.id === "contact") {
                      setMobileMenuOpen(false);
                      onOpenContact();
                    } else {
                      scrollToSection(link.id);
                    }
                  }}
                  className="flex items-center justify-between py-3.5 px-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-cyan-400/50 hover:bg-white/[0.08] active:bg-white/15 transition-all duration-300 group shadow-lg"
                >
                  <span className="text-lg sm:text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    {link.label}
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-400/80 group-hover:text-cyan-300">
                    {link.num}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Bottom Social Links Bar */}
            <div className="pt-6 border-t border-white/15 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                @kayradivrik
              </span>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/kayradivrik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all shadow-lg"
                  title="GitHub"
                >
                  <Github className="w-5 h-5 text-white filter drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                </a>
                <a
                  href="https://linkedin.com/in/kayradivrik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all shadow-lg"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-white filter drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                </a>
                <a
                  href="https://instagram.com/kayradivrik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all shadow-lg"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white filter drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
