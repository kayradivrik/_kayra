import Link from 'next/link';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-800 mt-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Kayra Divrik</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Siber güvenlik, Linux sistemleri ve modern web mimarileri üzerine teknik araştırmalar, projeler ve <a href="https://kayradannotlar.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 font-semibold hover:underline">Kayradan Notlar</a>.
            </p>
          </div>

          {/* Navigasyon */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Site Haritası</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-orange-500 transition-colors">Ana Sayfa</Link></li>
              <li><Link href="/hakkimda" className="hover:text-orange-500 transition-colors">Hakkımda</Link></li>
              <li><Link href="/egitim-ve-deneyim" className="hover:text-orange-500 transition-colors">Eğitim & Deneyim</Link></li>
              <li><Link href="/projeler" className="hover:text-orange-500 transition-colors">Projeler</Link></li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Bağlantılar</h4>
            <div className="flex space-x-4">
              <a href="https://github.com/kayradivrik" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors" title="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/kayradivrik" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors" title="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/kayradivrik" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors" title="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:projects.kayra@gmail.com" className="text-gray-400 hover:text-orange-500 transition-colors" title="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-400 dark:text-gray-500">
          <p>&copy; {new Date().getFullYear()} Kayra Divrik. Tüm hakları saklıdır.</p>
          <p>Built with Next.js & TailwindCSS.</p>
        </div>
      </div>
    </footer>
  );
}
