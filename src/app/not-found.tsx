"use client";

import Link from 'next/link';
import Navbar from '../components/Navigation/Navbar';
import Footer from '../components/Footer/Footer';
import { Terminal, ArrowRight } from 'lucide-react';
import { FadeIn } from '../components/UI/FadeIn';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-28 sm:py-36 flex-grow w-full flex flex-col items-center justify-center text-center">
        
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center justify-center mb-8 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-xs font-mono text-zinc-500 tracking-widest uppercase">
            System Alert // 404
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="text-[8rem] sm:text-[12rem] font-bold tracking-tighter leading-none text-zinc-900 dark:text-white mb-4">
            4<span className="text-zinc-300 dark:text-zinc-800">0</span>4
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            Packet Dropped. Route Unreachable.
          </h2>
          <p className="text-lg text-zinc-500 font-light max-w-lg mb-12 mx-auto leading-relaxed">
            Aradığın sayfa sunucuda bulunamadı. Belki silinmiş, taşınmış veya ağ güvenlik duvarına takılmış olabilir.
          </p>
        </FadeIn>

        <FadeIn delay={0.4} className="w-full max-w-lg">
          <div className="text-left bg-[#111111] text-zinc-300 font-mono text-sm p-5 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-zinc-800/50">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/90"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/90"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/90"></span>
              </div>
              <div className="ml-auto flex items-center gap-2 text-zinc-600 text-xs">
                <Terminal className="w-3.5 h-3.5" />
                <span>diagnostic.sh</span>
              </div>
            </div>
            <div className="space-y-2 opacity-80">
              <p className="text-zinc-500">$ <span className="text-zinc-300">curl -I https://kayradivrik.com.tr/kayip-yol</span></p>
              <p className="text-red-400">HTTP/2 404 NOT FOUND</p>
              <p className="text-zinc-500">&gt; <span className="text-orange-400/80">failover recommendation:</span> reroute to index</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.5} className="mt-12">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium hover:scale-105 transition-transform duration-300 shadow-lg shadow-black/5 dark:shadow-white/5"
          >
            Ana Sayfaya Dön
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>

      </main>

      <Footer />
    </div>
  );
}
