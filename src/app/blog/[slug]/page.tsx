import type { Metadata } from 'next';
import Navbar from '../../../components/Navigation/Navbar';
import Footer from '../../../components/Footer/Footer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface SanityPost {
  _id: string;
  title: string;
  content: string;
  publishedAt: string;
  category: string;
  readTime: string;
  imageUrl?: string;
  authorName?: string;
  authorImage?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kayradivrik.github.io';

async function getPost(slug: string): Promise<SanityPost | null> {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ie0q0xx6';
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
    
    const query = encodeURIComponent(`*[_type=="post" && slug.current == "${slug}"][0]{..., "imageUrl": coverImage.asset->url, "authorName": author->name, "authorImage": author->avatar.asset->url}`);
    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;
    
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    
    const data = await res.json();
    return data.result || null;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ie0q0xx6';
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
    
    const query = encodeURIComponent(`*[_type=="post"]{ "slug": slug.current }`);
    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;
    
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.result) {
      return data.result.filter((post: any) => post.slug).map((post: any) => ({
        slug: post.slug,
      }));
    }
  } catch (error) {
    console.error("Error generating static params:", error);
  }
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    return {
      title: "Yazı Bulunamadı",
      description: "Aradığınız blog yazısı mevcut değil veya yayından kaldırılmış olabilir.",
    };
  }

  const rawDesc = post.content 
    ? post.content.replace(/[#*`_~\[\]()>-]/g, '').replace(/\s+/g, ' ').trim()
    : 'Kayra Divrik (Sonsuscato) tarafından paylaşılan siber güvenlik ve teknik inceleme notları.';
  const description = rawDesc.length > 160 ? rawDesc.slice(0, 157) + '...' : rawDesc;

  const postUrl = `${baseUrl}/blog/${resolvedParams.slug}`;
  const ogImage = post.imageUrl || `${baseUrl}/profile.jpg`;

  return {
    title: `${post.title} | Kayradan Notlar`,
    description: description,
    authors: [{ name: post.authorName || 'Kayra Divrik', url: 'https://github.com/kayradivrik' }],
    keywords: [
      post.category || 'Siber Güvenlik',
      'Kayradan Notlar',
      'Kayra Divrik',
      'Sonsuscato',
      'Linux Sistemleri',
      'Cybersecurity',
      'Penetration Testing'
    ],
    alternates: {
      canonical: `/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      title: `${post.title} | Kayradan Notlar — Kayra Divrik`,
      description: description,
      url: postUrl,
      siteName: "Kayra Divrik (Sonsuscato)",
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.authorName || 'Kayra Divrik'],
      section: post.category,
      tags: [post.category, 'Kayradan Notlar', 'Siber Güvenlik', 'Linux'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Kayradan Notlar`,
      description: description,
      images: [ogImage],
      creator: "@kayradivrik",
    },
  };
}

export default async function BlogPost({ params }: any) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen text-gray-800 dark:text-gray-200 font-sans flex flex-col">
        <Navbar />
        <main className="max-w-3xl mx-auto px-6 py-32 flex-grow w-full text-center mt-20">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Yazı Bulunamadı</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Aradığınız blog yazısına ulaşılamıyor veya silinmiş olabilir.</p>
          <Link href="/" className="text-orange-500 hover:underline">Ana Sayfaya Dön</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const rawDesc = post.content 
    ? post.content.replace(/[#*`_~\[\]()>-]/g, '').replace(/\s+/g, ' ').trim()
    : 'Kayra Divrik (Sonsuscato) tarafından paylaşılan siber güvenlik ve teknik inceleme notları.';
  const postDescription = rawDesc.length > 160 ? rawDesc.slice(0, 157) + '...' : rawDesc;

  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": postDescription,
    "image": post.imageUrl ? [post.imageUrl] : [`${baseUrl}/profile.jpg`],
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.authorName || "Kayra Divrik",
      "url": "https://kayradannotlar.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kayradan Notlar",
      "url": "https://kayradannotlar.com",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/favicon.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`
    }
  };

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 font-sans flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-24 sm:py-32 flex-grow w-full mt-10">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Geri Dön
          </Link>
          <a href="https://kayradannotlar.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1">
            kayradannotlar.com &rarr;
          </a>
        </div>

        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Bu yazı <a href="https://kayradannotlar.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 dark:text-orange-400 font-medium hover:underline">Kayradan Notlar</a>'dan alınmıştır. Tüm makalelerim için platformu ziyaret edebilirsiniz.
          </p>
          <a href="https://kayradannotlar.com" target="_blank" rel="noopener noreferrer" className="shrink-0 px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-zinc-700 hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg transition-colors flex items-center gap-1.5">
            Orijinal Siteye Git <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        
        <article>
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-zinc-800 pb-8">
              <span>{new Date(post.publishedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              {post.category && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-zinc-600"></span>
                  <span className="text-orange-600 dark:text-orange-400 font-medium uppercase tracking-wider">{post.category}</span>
                </>
              )}
              {post.readTime && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-zinc-600"></span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>
          </header>

          {post.imageUrl && (
            <div className="w-full h-64 sm:h-80 md:h-96 relative mb-12 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert prose-orange max-w-none prose-headings:font-semibold prose-a:text-orange-600 hover:prose-a:text-orange-500 prose-img:rounded-xl">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ node, ...props }) => (
                  <img 
                    {...props} 
                    loading="lazy" 
                    decoding="async" 
                    className="rounded-xl max-w-full h-auto mx-auto my-6 border border-gray-100 dark:border-zinc-800 shadow-sm" 
                  />
                )
              }}
            >
              {post.content || ""}
            </ReactMarkdown>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-100 dark:border-zinc-800 flex items-center gap-4">
            <div className="shrink-0">
              <img 
                src={post.authorImage || (post.authorName && !post.authorName.toLowerCase().includes('kayra') ? `https://ui-avatars.com/api/?name=${encodeURIComponent(post.authorName)}&background=ea580c&color=fff` : "https://avatars.githubusercontent.com/u/81221998?v=4")} 
                alt={post.authorName || 'Kayra Divrik'} 
                loading="lazy"
                decoding="async"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shadow-sm ring-2 ring-gray-100 dark:ring-zinc-800" 
              />
            </div>
            <div>
              <p className="text-xs font-mono text-orange-600 dark:text-orange-500 uppercase tracking-wider font-semibold mb-1">Yazar</p>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{post.authorName || 'Kayra Divrik'}</h3>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
