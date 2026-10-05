import Navbar from '../components/Navigation/Navbar';
import Footer from '../components/Footer/Footer';
import Link from 'next/link';
import { FadeIn } from '../components/UI/FadeIn';

interface SanityPost {
  _id: string;
  title: string;
  excerpt: string;
  slug: { current: string };
  publishedAt: string;
  category: string;
  readTime: string;
  body?: any;
  imageUrl?: string;
}

async function getPosts(): Promise<SanityPost[]> {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ie0q0xx6';
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
    
    if (!projectId) return [];
    
    const query = encodeURIComponent(`*[_type=="post"] | order(publishedAt desc)[0...4]`);
    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;
    
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.result || [];
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-32 sm:py-48 flex-grow w-full">
        {/* HERO SECTION */}
        <section id="hero" className="mb-32">
          <FadeIn delay={0.1}>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter mb-6">
              Kayra Divrik.
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h2 className="text-xl sm:text-2xl text-zinc-500 dark:text-zinc-400 font-light tracking-tight mb-8">
              Sistem Mühendisi & Siber Güvenlik Araştırmacısı
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl font-light">
              <p>
                Güvenli mimariler kuruyor ve sistemlerin derinliklerini keşfediyorum. Modern web teknolojileri ile düşük seviyeli sistem programlama arasındaki köprüyü oluşturuyorum.
              </p>
              <p>
                Şu sıralar Linux ortamlarına, ofansif güvenliğe ve minimalist dijital deneyimler üretmeye odaklanıyorum.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.4} className="mt-12">
            <div className="flex items-center gap-6">
              <Link href="/hakkimda" className="text-sm font-medium border-b border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-white transition-colors pb-1">
                Hikayemi Oku
              </Link>
              <Link href="/projeler" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                Projeler &rarr;
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* BLOG SECTION */}
        <section id="blog" className="scroll-mt-32">
          <FadeIn delay={0.1}>
            <div className="flex items-baseline justify-between mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Notlar
              </h2>
              <a href="https://kayradannotlar.com" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                Tümünü Gör &rarr;
              </a>
            </div>
          </FadeIn>

          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post, i) => (
                <FadeIn key={post._id} delay={0.1 + (i * 0.1)}>
                  <Link 
                    href={post.slug?.current ? `/blog/${post.slug.current}` : '#'} 
                    className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 hover:border-orange-500/30 dark:hover:border-orange-500/50 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-orange-500/5"
                  >
                    {/* Hover Gradient Background */}
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
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn delay={0.2}>
              <div className="py-12 text-zinc-500 italic font-light text-center border border-zinc-100 dark:border-zinc-900 rounded-2xl">
                Şu an gösterilecek yazı bulunmuyor.
              </div>
            </FadeIn>
          )}
        </section>

        {/* CTA SECTION */}
        <section className="mt-32 pt-24 pb-12 border-t border-zinc-100 dark:border-zinc-900">
          <FadeIn delay={0.2}>
            <div className="flex flex-col items-center text-center">
              <span className="text-sm font-mono tracking-widest uppercase text-orange-500 mb-6">{"İletişime Geçelim"}</span>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter mb-8 text-zinc-900 dark:text-white leading-[1.1]">
                Bir projen mi var?<br/>
                <span className="text-zinc-400 dark:text-zinc-600">Hadi konuşalım.</span>
              </h2>
              <p className="text-lg text-zinc-500 font-light max-w-xl mx-auto mb-12">
                Siber güvenlik sistemleri, altyapı güçlendirmeleri veya yenilikçi yazılım projeleri için her zaman yeni fırsatlara açığım.
              </p>
              
              <a 
                href="mailto:projects.kayra@gmail.com"
                className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-medium text-white bg-zinc-900 dark:text-zinc-900 dark:bg-white rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-zinc-900/20 dark:hover:shadow-white/20"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-3">
                  Bana Ulaş
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </div>
          </FadeIn>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
