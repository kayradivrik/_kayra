import Navbar from '../components/Navigation/Navbar';
import Footer from '../components/Footer/Footer';
import Link from 'next/link';

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
    
    const query = encodeURIComponent(`*[_type=="post"] | order(publishedAt desc)[0...5]`);
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
    <div className="min-h-screen text-gray-800 dark:text-gray-200 font-sans flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-24 sm:py-32 flex-grow w-full">
        <section id="hero" className="mb-24">
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 text-gray-900 dark:text-gray-100 tracking-tight">
            Sonsuscato — Kayra Divrik
          </h1>
          <h2 className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-8 font-light">
            Yazılım Geliştirme, Sistem Mühendisliği & Siber Güvenlik
          </h2>
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            <p>
              Merhaba, ben Kayra. Yazılım geliştirme, gömülü sistemler ve teknolojiyle iç içe bir yolculuğun ortasındayım. Bir yandan modern web teknolojileri (<span className="font-mono text-sm bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-gray-800 dark:text-gray-200">React</span>, <span className="font-mono text-sm bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-gray-800 dark:text-gray-200">Next.js</span>, <span className="font-mono text-sm bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-gray-800 dark:text-gray-200">Node.js</span>) ile projeler inşa ederken, diğer yandan mikrodenetleyiciler ve <span className="font-mono text-sm bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-gray-800 dark:text-gray-200">C++</span> ile sistemin mutfağında çalışmayı seviyorum.
            </p>
            <p>
              Doğuş Üniversitesi Bilişim Güvenliği Teknolojisi öğrencisiyim; lisede bilişim teknolojileri okudum ve Balparmak'ta IT stajı yaptım. Güvenlik, ağ protokolleri ve Linux sistemlerine olan merakım sayesinde, sistemlerin nasıl çalıştığını en derin seviyede anlamaya ve sağlam mimariler kurmaya odaklanıyorum.
            </p>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b pb-4 border-gray-200 dark:border-zinc-800 gap-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
              <span className="text-orange-500">#</span> Kayradan Notlar
            </h2>
            <a href="https://kayradannotlar.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1">
              kayradannotlar.com'a Git &rarr;
            </a>
          </div>

          <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Bu portfolyodaki yazılar <a href="https://kayradannotlar.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 dark:text-orange-400 font-medium hover:underline">kayradannotlar.com</a> üzerinden çekilmektedir. Siber güvenlik ve sistem notlarımın tamamı için asıl siteyi ziyaret edebilirsiniz.
            </p>
            <a href="https://kayradannotlar.com" target="_blank" rel="noopener noreferrer" className="shrink-0 px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-zinc-700 hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg transition-colors">
              Siteye Git &rarr;
            </a>
          </div>
          
          {posts.length > 0 ? (
            <div className="space-y-10">
              {posts.map((post) => (
                <Link key={post._id} href={post.slug?.current ? `/blog/${post.slug.current}` : '#'} className="group cursor-pointer flex flex-col md:flex-row md:items-center gap-6 border border-transparent hover:border-gray-100 dark:hover:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900/50 rounded-2xl p-5 -mx-5 transition-all duration-300 relative z-10">
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2 gap-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">
                        {post.title}
                      </h3>
                      <span className="text-gray-400 dark:text-gray-500 text-sm font-mono shrink-0 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-zinc-600 group-hover:bg-orange-400 transition-colors"></span>
                        {new Date(post.publishedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    {post.category && (
                      <div className="mb-4 flex items-center gap-2 text-xs font-mono font-medium text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                        <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-950/30 rounded-md">{post.category}</span>
                        {post.readTime && <span className="text-gray-400 dark:text-gray-500">• {post.readTime}</span>}
                      </div>
                    )}
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                      {post.excerpt || (post.body && typeof post.body === 'string' ? post.body.substring(0, 150) + '...' : post.title)}
                    </p>
                  </div>
                  {post.imageUrl && (
                    <div className="shrink-0 w-full md:w-32 h-48 md:h-24 rounded-lg overflow-hidden border border-gray-100 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-lg p-6 text-gray-600 dark:text-gray-400 italic">
              Henüz blog yazısı bulunmuyor veya Sanity bağlantısında bir sorun oluştu.
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
