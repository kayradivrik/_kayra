import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, Github, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

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
    description: "Cybersecurity toolkit designed for network scanning, port detection, and vulnerability analysis.",
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
    description: "Automated Linux server security hardening scripts, SSH configurations, and firewall rules.",
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
    description: "Modern developer portfolio website built with Next.js, Tailwind CSS, and Framer Motion.",
    html_url: "https://github.com/kayradivrik",
    stargazers_count: 6,
    forks_count: 1,
    language: "TypeScript",
    topics: ["portfolio", "react", "tailwindcss"],
    updated_at: "2026-09-11T12:00:00Z"
  }
];

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-400",
  JavaScript: "bg-teal-400",
  Python: "bg-emerald-400",
  Bash: "bg-emerald-500",
  Shell: "bg-teal-500",
  Go: "bg-cyan-400",
  "C++": "bg-cyan-500",
  C: "bg-indigo-400",
  HTML: "bg-sky-400",
  CSS: "bg-sky-500",
  Rust: "bg-teal-300",
};

export default function ProjectsSection() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true);
        const res = await fetch("https://api.github.com/users/kayradivrik/repos?sort=updated&per_page=6", {
          cache: 'no-store'
        });
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

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, clientWidth } = sliderRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.8 || 300));
    setActiveIndex(Math.min(index, repos.length - 1));
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.8 || 320;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const scrollToRepo = (index: number) => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.clientWidth * 0.8 || 320;
    sliderRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-16 relative z-20">
      {/* Header with Slider Controls on the Right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
      >
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Öne Çıkan Çalışmalar
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-lg">
            GitHub üzerinden doğrudan çekilen canlı açık kaynak depoları ve araçlar.
          </p>
        </div>

        {/* NetworkChuck Style Slider Controls (< ■ ■ ■ >) on Header Right */}
        {!loading && (
          <div className="flex items-center gap-3 self-center sm:self-end shrink-0">
            <button
              onClick={() => scroll('left')}
              className="p-1 text-zinc-400 hover:text-white transition-colors active:scale-95"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
            </button>

            {/* 3 Rounded Square Indicators */}
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((dotIdx) => {
                const targetIndex = repos.length > 3 ? dotIdx * 2 : dotIdx;
                const isSelected = repos.length > 3 
                  ? Math.floor(activeIndex / 2) === dotIdx
                  : activeIndex === dotIdx;
                return (
                  <button
                    key={dotIdx}
                    onClick={() => scrollToRepo(targetIndex)}
                    className={`w-3.5 h-3.5 rounded-[5px] transition-all duration-300 ${
                      isSelected
                        ? "bg-white scale-105 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                        : "bg-zinc-700/90 hover:bg-zinc-500"
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                );
              })}
            </div>

            <button
              onClick={() => scroll('right')}
              className="p-1 text-zinc-400 hover:text-white transition-colors active:scale-95"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.2]" />
            </button>
          </div>
        )}
      </motion.div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 text-zinc-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
          <span className="text-sm font-medium">GitHub depoları yükleniyor...</span>
        </div>
      )}

      {/* Projects Grid / Mobile Slider */}
      {!loading && (
        <div className="relative">
          <motion.div
            ref={sliderRef}
            onScroll={handleScroll}
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
                  hidden: { opacity: 0, scale: 0.95, y: 30 },
                  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 20 } }
                }}
                whileHover={{ y: -6, scale: 1.025 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/30 hover:bg-white/[0.06] transition-all duration-500 shadow-xl overflow-hidden min-h-[220px] w-[82vw] sm:w-[320px] shrink-0 snap-center md:w-auto md:shrink md:snap-align-none"
              >
                {/* Subtle Ambient Glow on Hover */}
                <div aria-hidden className="absolute -inset-px rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar: Icon & External Link */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-xl bg-white/[0.06] border border-white/10 text-white group-hover:scale-110 transition-transform duration-300">
                      <Github className="w-5 h-5" />
                    </div>
                    <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>

                  {/* Repo Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors tracking-tight line-clamp-1">
                    {repo.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                    {repo.description || "Açıklama bulunmuyor."}
                  </p>
                </div>

                {/* Bottom Metadata Bar */}
                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-400">
                  {/* Language Tag */}
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${repo.language ? LANGUAGE_COLORS[repo.language] || "bg-zinc-400" : "bg-zinc-400"}`} />
                    <span className="font-medium text-zinc-300">{repo.language || "Kod"}</span>
                  </div>

                  {/* Stars & Forks */}
                  <div className="flex items-center gap-3 font-mono">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
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
          <span>Tüm Depoları GitHub'da Görüntüle (@kayradivrik)</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>
    </section>
  );
}
