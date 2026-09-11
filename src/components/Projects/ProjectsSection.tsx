"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, FolderGit2, Sparkles, Loader2 } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  updated_at: string;
}

const FALLBACK_REPOS: Repository[] = [
  {
    id: 1,
    name: "network-scanner-toolkit",
    description: "Ağ tarama, port tespiti ve zafiyet analizi için geliştirilmiş siber güvenlik araç kiti.",
    html_url: "https://github.com/kayradivrik",
    stargazers_count: 14,
    forks_count: 4,
    language: "Python",
    topics: ["security", "pentest", "python"],
    updated_at: "2026-09-10T12:00:00Z"
  },
  {
    id: 2,
    name: "linux-system-hardening",
    description: "Linux sunucu güvenlik sıkılaştırma, SSH konfigürasyon ve firewall otomatik betikleri.",
    html_url: "https://github.com/kayradivrik",
    stargazers_count: 9,
    forks_count: 3,
    language: "Bash",
    topics: ["linux", "sysadmin", "bash"],
    updated_at: "2026-09-08T12:00:00Z"
  },
  {
    id: 3,
    name: "portfolio-website",
    description: "Next.js, Tailwind CSS ve Framer Motion ile hazırlanmış kişisel portfolyo web sitesi.",
    html_url: "https://github.com/kayradivrik",
    stargazers_count: 6,
    forks_count: 1,
    language: "TypeScript",
    topics: ["portfolio", "react", "tailwindcss"],
    updated_at: "2026-09-11T12:00:00Z"
  }
];

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-emerald-500",
  Bash: "bg-green-600",
  Shell: "bg-emerald-600",
  Go: "bg-cyan-500",
  "C++": "bg-pink-500",
  C: "bg-purple-500",
  HTML: "bg-orange-500",
  CSS: "bg-sky-400",
  Rust: "bg-amber-600",
};

export default function ProjectsSection() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true);
        const res = await fetch("https://api.github.com/users/kayradivrik/repos?sort=updated&per_page=6");
        if (!res.ok) throw new Error("GitHub API failed");
        const data: Repository[] = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data);
        } else {
          setRepos(FALLBACK_REPOS);
        }
      } catch (err) {
        console.warn("GitHub repos load fallback active:", err);
        setRepos(FALLBACK_REPOS);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-16 relative z-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/80 text-xs font-semibold tracking-wider uppercase mb-3">

          <span>GitHub Projeleri</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Öne Çıkan Çalışmalar
        </h2>
        <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-lg">
          GitHub hesabından canlı çekilen son projeler ve açık kaynak kodlar.
        </p>
      </motion.div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 text-zinc-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
          <span className="text-sm font-medium">GitHub projeleri yükleniyor...</span>
        </div>
      )}

      {/* Projects Grid / Mobile Slider */}
      {!loading && (
        <div className="relative">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pt-1 px-4 -mx-4 scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:mx-0 md:pb-0"
          >
            {repos.map((repo) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/30 hover:bg-white/[0.06] transition-all duration-500 shadow-xl overflow-hidden min-h-[220px] w-[82vw] sm:w-[320px] shrink-0 snap-center md:w-auto md:shrink md:snap-align-none"
              >
                {/* Subtle Ambient Glow on Hover */}
                <div aria-hidden className="absolute -inset-px rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar: Icon & External Link */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-xl bg-white/[0.06] border border-white/10 text-white group-hover:scale-110 transition-transform duration-300">
                      <FolderGit2 className="w-5 h-5" />
                    </div>
                    <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>

                  {/* Repo Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors tracking-tight line-clamp-1">
                    {repo.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                    {repo.description || "Proje açıklaması henüz eklenmedi."}
                  </p>
                </div>

                {/* Bottom Metadata Bar */}
                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-400">
                  {/* Language Tag */}
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${repo.language ? LANGUAGE_COLORS[repo.language] || "bg-zinc-400" : "bg-zinc-400"}`} />
                    <span className="font-medium text-zinc-300">{repo.language || "Code"}</span>
                  </div>

                  {/* Stars & Forks */}
                  <div className="flex items-center gap-3 font-mono">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-400 transition-colors" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Mobile Swipe Hint */}
          <div className="flex md:hidden justify-center items-center gap-1.5 mt-2 text-[11px] font-mono text-zinc-500">
            <span>← Kaydırmak için sürükleyin →</span>
          </div>
        </div>
      )}

      {/* Bottom Link to GitHub Profile */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-10 flex justify-center"
      >
        <a
          href="https://github.com/kayradivrik"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white transition-all duration-300 shadow-lg"
        >
          <span>Tüm Repoları GitHub'da Gör (@kayradivrik)</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>
    </section>
  );
}
