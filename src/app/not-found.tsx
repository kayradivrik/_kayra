import Link from 'next/link';
import Navbar from '../components/Navigation/Navbar';
import Footer from '../components/Footer/Footer';
import { ShieldAlert, ArrowLeft, Terminal, Compass, ExternalLink } from 'lucide-react';

export const metadata = {
  title: '404 - Sinyal Kaybı / Paket Düşürüldü',
  description: 'Aradığınız sayfa silinmiş, taşınmış veya ağ güvenlik duvarı tarafından engellenmiş olabilir.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 font-sans flex flex-col justify-between">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-28 sm:py-36 flex-grow w-full flex flex-col items-center justify-center text-center">
        {/* Hacker Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60 mb-6">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>ERR_HTTP_404 // PACKET_DROPPED</span>
        </div>

        {/* Big Code */}
        <h1 className="text-7xl sm:text-9xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-2 selection:bg-orange-500">
          4<span className="text-orange-500">0</span>4
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
          Sinyal Kaybı: Sayfa Bulunamadı
        </h2>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-lg mb-8 leading-relaxed">
          Ulaşmaya çalıştığınız ağ rotası mevcut değil, taşınmış veya güvenlik duvarı kuralları tarafından filtrelenmiş olabilir.
        </p>

        {/* Terminal Diagnostic Block */}
        <div className="w-full max-w-lg text-left bg-gray-950 text-gray-300 font-mono text-xs sm:text-sm p-4 rounded-xl border border-zinc-800 shadow-xl mb-10 overflow-x-auto">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-zinc-800 text-zinc-500">
            <Terminal className="w-4 h-4 text-orange-500" />
            <span>diagnostic_terminal.sh</span>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
            </div>
          </div>
          <p className="text-zinc-500">$ curl -I https://kayradivrik.com.tr/request_target</p>
          <p className="text-red-400 mt-1">HTTP/2 404 NOT FOUND</p>
          <p className="text-zinc-400 mt-1">status: route_unreachable</p>
          <p className="text-orange-400 mt-1">&gt; failover recommendation: reroute to index</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-medium shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
          </Link>

          <Link
            href="/#blog"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 hover:border-orange-500 dark:hover:border-orange-500 text-gray-800 dark:text-gray-200 font-medium transition-all"
          >
            <Compass className="w-4 h-4 text-orange-500" /> Yazılara Göz At
          </Link>

          <a
            href="https://kayradannotlar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl text-orange-600 dark:text-orange-400 hover:underline font-medium text-sm"
          >
            kayradannotlar.com <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
