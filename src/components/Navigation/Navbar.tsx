"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, Menu, X, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

interface NavbarProps {}

export default function Navbar({}: NavbarProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-orange-500 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center">
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center group text-left"
              >
                <span className="font-medium text-white text-lg tracking-wide hover:text-orange-100 transition-colors">
                  Kayra Divrik
                </span>
              </Link>

              <nav className="hidden md:flex ml-10 space-x-6 text-sm font-medium text-white/90">
                <Link
                  href="/"
                  className="hover:text-white transition-colors"
                >
                  Ana Sayfa
                </Link>
                <Link
                  href="/hakkimda"
                  className="hover:text-white transition-colors"
                >
                  Hakkımda
                </Link>
                <Link
                  href="/egitim-ve-deneyim"
                  className="hover:text-white transition-colors"
                >
                  Eğitim & Deneyim
                </Link>
                <Link
                  href="/projeler"
                  className="hover:text-white transition-colors"
                >
                  Projeler
                </Link>
                <Link
                  href="/#blog"
                  className="text-orange-200 hover:text-white transition-colors font-semibold"
                >
                  Kayradan Notlar
                </Link>
              </nav>
            </div>

            <div className="hidden md:flex items-center space-x-5 text-white/90">
              <a
                href="https://github.com/kayradivrik"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hover:text-white transition-colors" 
                title="Gece/Gündüz Modu" 
                aria-label="Toggle Theme"
              >
                {mounted && theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="text-white/90 hover:text-white" 
                aria-label="Toggle Theme"
              >
                {mounted && theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="text-white/90 hover:text-white"
                aria-label="Open Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-orange-500 md:hidden flex flex-col p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-medium text-white text-lg tracking-wide">
                Kayra Divrik
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-white"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col space-y-6 text-white/90 text-lg">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-left hover:text-white"
              >
                Ana Sayfa
              </Link>
              <Link
                href="/hakkimda"
                onClick={() => setMobileMenuOpen(false)}
                className="text-left hover:text-white"
              >
                Hakkımda
              </Link>
              <Link
                href="/egitim-ve-deneyim"
                onClick={() => setMobileMenuOpen(false)}
                className="text-left hover:text-white"
              >
                Eğitim & Deneyim
              </Link>
              <Link
                href="/projeler"
                onClick={() => setMobileMenuOpen(false)}
                className="text-left hover:text-white"
              >
                Projeler
              </Link>
              <Link
                href="/#blog"
                onClick={() => setMobileMenuOpen(false)}
                className="text-left text-orange-200 hover:text-white font-semibold"
              >
                Kayradan Notlar
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
