import Link from 'next/link';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-900 mt-32 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-xs">
            <Link href="/" className="font-bold text-zinc-900 dark:text-white text-lg tracking-tighter block mb-4">
              Kayra Divrik.
            </Link>
            <p className="text-sm text-zinc-500 font-light leading-relaxed">
              Systems engineer exploring cybersecurity, low-level architecture, and minimalist web design.
            </p>
          </div>

          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">Navigation</span>
              <Link href="/" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">Home</Link>
              <Link href="/hakkimda" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">About</Link>
              <Link href="/projeler" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">Projects</Link>
            </div>
            
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">Connect</span>
              <a href="https://github.com/kayradivrik" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/kayradivrik" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">LinkedIn</a>
              <a href="mailto:projects.kayra@gmail.com" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">Email</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400 font-light">
          <p>&copy; {new Date().getFullYear()} Kayra Divrik. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <span className="font-mono">Next.js</span> & <span className="font-mono">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
