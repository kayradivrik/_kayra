"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { FadeIn } from '../../components/UI/FadeIn';

interface SanityPost {
  _id: string;
  title: string;
  excerpt: string;
  slug: { current: string };
  publishedAt: string;
  category: string;
  readTime: string;
}

export default function BlogSearch({ initialPosts }: { initialPosts: SanityPost[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    initialPosts.forEach(post => {
      if (post.category) cats.add(post.category);
    });
    return Array.from(cats);
  }, [initialPosts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return initialPosts.filter(post => {
      const matchesSearch = 
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [initialPosts, searchQuery, selectedCategory]);

  return (
    <section>
      <FadeIn delay={0.1}>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-6">
          Notlar.
        </h1>
        <p className="text-lg text-zinc-500 font-light mb-12 max-w-2xl">
          Sistem yönetimi, siber güvenlik, yazılım geliştirme ve teknoloji üzerine karalamalarım.
        </p>
      </FadeIn>

      <FadeIn delay={0.2} className="mb-12 space-y-6">
        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-orange-500 transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Yazılarda ara..."
            className="w-full pl-12 pr-10 py-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === null
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              Tümü
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </FadeIn>

      <div className="space-y-4 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, i) => (
              <motion.div
                key={post._id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Link 
                  href={post.slug?.current ? `/blog/${post.slug.current}` : '#'} 
                  className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 hover:border-orange-500/30 dark:hover:border-orange-500/50 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-orange-500/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-transparent transition-all duration-500 z-0"></div>
                  
                  <div className="relative z-10 flex-grow space-y-2">
                    <div className="flex items-center gap-3 mb-1">
                      {post.category && (
                        <span className="px-2.5 py-1 text-[10px] font-mono font-medium tracking-widest uppercase bg-zinc-100 dark:bg-zinc-900 text-zinc-500 rounded-md border border-zinc-200/50 dark:border-zinc-800/50">
                          {post.category}
                        </span>
                      )}
                      <span className="text-xs text-zinc-400 font-mono">
                        {new Date(post.publishedAt).toLocaleDateString('tr-TR')}
                      </span>
                      {post.readTime && (
                        <span className="text-xs text-zinc-400 font-mono">
                          • {post.readTime}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="text-zinc-500 dark:text-zinc-400 font-light line-clamp-2 text-sm leading-relaxed max-w-2xl">
                      {post.excerpt || "Bu yazıyı okumak için tıklayın..."}
                    </p>
                  </div>
                  
                  <div className="relative z-10 shrink-0 self-start sm:self-center mt-4 sm:mt-0 w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500 group-hover:scale-110">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="py-20 text-center text-zinc-500 font-light border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl"
            >
              <div className="text-4xl mb-4">🔍</div>
              <p>"{searchQuery}" aramasına uygun bir yazı bulunamadı.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
                className="mt-4 text-orange-500 hover:underline text-sm"
              >
                Tüm yazıları göster
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
