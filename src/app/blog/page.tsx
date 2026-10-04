import type { Metadata } from 'next';
import Navbar from '../../components/Navigation/Navbar';
import Footer from '../../components/Footer/Footer';
import BlogSearch from './BlogSearch';

export const metadata: Metadata = {
  title: "Blog & Notlar | Kayra Divrik",
  description: "Siber güvenlik, sistem mühendisliği ve yazılım geliştirme üzerine notlarım.",
  alternates: {
    canonical: "/blog",
  },
};

interface SanityPost {
  _id: string;
  title: string;
  excerpt: string;
  slug: { current: string };
  publishedAt: string;
  category: string;
  readTime: string;
}

async function getAllPosts(): Promise<SanityPost[]> {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ie0q0xx6';
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
    
    if (!projectId) return [];
    
    const query = encodeURIComponent(`*[_type=="post"] | order(publishedAt desc)`);
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

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 flex flex-col">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-32 sm:py-48 flex-grow w-full">
        <BlogSearch initialPosts={posts} />
      </main>

      <Footer />
    </div>
  );
}
