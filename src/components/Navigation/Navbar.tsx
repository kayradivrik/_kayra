"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, Menu, X, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { CatLogo } from "../UI/CatLogo";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/hakkimda", label: "About" },
    { href: "/egitim-ve-deneyim", label: "Experience" },
    { href: "/projeler", label: "Projects" },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-900 py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="flex items-center group text-left"
            >
              <CatLogo />
            </Link>

            <nav className="hidden md:flex items-center space-x-1 bg-zinc-100/50 dark:bg-zinc-900/50 rounded-full px-3 py-1.5 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-800/50">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-xs font-medium transition-colors ${
                    pathname === link.href 
                      ? "text-zinc-900 dark:text-white" 
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-full shadow-sm border border-zinc-200/50 dark:border-zinc-700/50"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <a
                href="https://github.com/kayradivrik"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                aria-label="Toggle Theme"
              >
                {mounted && theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                {mounted && theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="text-zinc-900 dark:text-white"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-white/90 dark:bg-[#0a0a0a]/90 flex flex-col p-6"
          >
            <div className="flex items-center justify-between mb-12 mt-2">
              <CatLogo />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col space-y-6 text-2xl font-light tracking-tight">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`${pathname === link.href ? "text-zinc-900 dark:text-white font-medium" : "text-zinc-500"}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
