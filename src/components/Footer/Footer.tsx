"use client";

import { Github, Mail, ArrowUp, Instagram } from "lucide-react";

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
    <footer className="w-full bg-[#0d0d0d] border-t border-white/10 relative z-20 text-white pt-16 pb-12 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

        {/* Left Column: Brand Text (No logo icon, Large Bold Font) */}
        <div className="flex flex-col items-start gap-2">
          <h3
            onClick={scrollToTop}
            className="text-3xl sm:text-4xl font-black tracking-tight text-white cursor-pointer hover:text-cyan-400 transition-colors"
          >
            Sonsuscato
          </h3>
          <p className="text-sm font-mono font-semibold text-cyan-400 uppercase tracking-widest mt-1">
            KAYRA DİVRİK
          </p>
          <p className="text-sm text-zinc-300 mt-2 max-w-xs leading-relaxed font-normal">
            Cybersecurity &amp; Linux Systems Engineering portfolio.
          </p>
        </div>

        {/* Middle Column: Support & Navigation Links (Large & Readable) */}
        <div className="flex flex-col items-start gap-4">
          <h4 className="text-base sm:text-lg font-extrabold text-white tracking-wider uppercase">
            Navigation
          </h4>
          <ul className="flex flex-col gap-3 text-sm sm:text-base font-semibold text-zinc-300">
            <li>
              <button
                onClick={() => scrollToSection("hero")}
                className="hover:text-white transition-colors text-left"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("experience")}
                className="hover:text-white transition-colors text-left"
              >
                Education &amp; Experience
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("projects")}
                className="hover:text-white transition-colors text-left"
              >
                Featured Projects
              </button>
            </li>
            <li>
              <button
                onClick={onOpenContact}
                className="hover:text-white transition-colors text-left"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Right Column: Follow us / Contact (Large Glowing White & Neon Icons) */}
        <div className="flex flex-col items-start gap-4">
          <h4 className="text-base sm:text-lg font-extrabold text-white tracking-wider uppercase">
            Follow &amp; Contact
          </h4>
          <div className="flex items-center gap-5 text-white mt-1">
            <a
              href="https://github.com/kayradivrik"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="text-white hover:text-cyan-400 hover:scale-110 transition-all duration-200"
            >
              <Github className="w-7 h-7 text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
            </a>

            <a
              href="https://instagram.com/kayradivrik"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              className="text-white hover:text-cyan-400 hover:scale-110 transition-all duration-200"
            >
              <Instagram className="w-7 h-7 text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
            </a>

            <button
              onClick={onOpenContact}
              title="Contact"
              className="text-white hover:text-cyan-400 hover:scale-110 transition-all duration-200"
            >
              <Mail className="w-7 h-7 text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
            </button>

            <button
              onClick={scrollToTop}
              title="Back to Top"
              className="text-white hover:text-cyan-400 hover:scale-110 transition-all duration-200"
            >
              <ArrowUp className="w-7 h-7 text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Centered Copyright Line (Larger Text) */}
      <div className="mt-14 pt-8  text-center text-sm font-medium text-zinc-400">
        &copy; {new Date().getFullYear()} <strong className="text-white font-bold">Sonsuscato.</strong> | All Rights Reserved.
      </div>
    </footer>
  );
}


