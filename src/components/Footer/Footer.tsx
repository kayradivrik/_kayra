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
              Siber güvenlik, düşük seviye mimari ve minimalist web tasarımı alanında çalışmalar yapan sistem mühendisi.
            </p>
          </div>

          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">Menü</span>
              <Link href="/" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">Ana Sayfa</Link>
              <Link href="/hakkimda" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">Hakkımda</Link>
              <Link href="/projeler" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">Projeler</Link>
            </div>
            
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">Bağlantılar</span>
              <a href="https://github.com/kayradivrik" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/kayradivrik" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">LinkedIn</a>
              <a href="mailto:projects.kayra@gmail.com" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">E-posta</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400 font-light">
          <p>&copy; {new Date().getFullYear()} Kayra Divrik. Tüm hakları saklıdır.</p>
          <p className="flex items-center gap-1">
            <span className="font-mono">Next.js</span> & <span className="font-mono">Framer Motion</span> ile hazırlandı
          </p>
        </div>
      </div>
    </footer>
  );
}
