import type { Metadata } from 'next';
import Navbar from '../../components/Navigation/Navbar';
import Footer from '../../components/Footer/Footer';

export const metadata: Metadata = {
  title: "Projeler & Açık Kaynak",
  description: "Kayra Divrik (Sonsuscato) tarafından geliştirilen siber güvenlik, Linux sistem araçları, C++ ve açık kaynak GitHub projeleri.",
  alternates: {
    canonical: "/projeler",
  },
  openGraph: {
    title: "Projeler & Açık Kaynak | Kayra Divrik (Sonsuscato)",
    description: "Açık kaynak siber güvenlik, Linux araçları ve sistem yazılımları.",
    url: "https://kayradivrik.github.io/projeler",
  },
};

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  updated_at: string;
}

async function getRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch('https://api.github.com/users/kayradivrik/repos?sort=updated&per_page=12', {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.filter((repo: any) => !repo.fork);
  } catch (error) {
    console.error('Error fetching github repos:', error);
    return [];
  }
}

export default async function Projects() {
  const repos = await getRepos();

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 font-sans flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-24 sm:py-32 flex-grow w-full">
        <section id="projects">
          <h1 className="text-3xl font-semibold mb-10 text-gray-900 dark:text-gray-100 border-b pb-3 border-gray-200 dark:border-zinc-800">
            Projeler
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Aşağıda GitHub profilimdeki (<a href="https://github.com/kayradivrik" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">@kayradivrik</a>) açık kaynak kodlu ve son güncellenen projelerimi bulabilirsiniz. Veriler GitHub API üzerinden anlık olarak çekilmektedir.
          </p>
          
          {repos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {repos.map((repo) => (
                <a 
                  key={repo.id} 
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col h-full border border-gray-200 dark:border-zinc-800 hover:border-orange-300 dark:hover:border-orange-500 hover:bg-orange-50/30 dark:hover:bg-orange-950/20 rounded-xl p-6 transition-all duration-300 shadow-sm hover:shadow-md dark:bg-zinc-900/50"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors mb-3">
                    {repo.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                    {repo.description || "Bu proje için bir açıklama eklenmemiş."}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-mono text-gray-500 dark:text-gray-500 mt-auto pt-4 border-t border-gray-100 dark:border-zinc-800">
                    {repo.language && (
                      <span className="flex items-center gap-1.5 font-medium">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      ⭐ {repo.stargazers_count}
                    </span>
                    <span className="ml-auto opacity-75">
                      {new Date(repo.updated_at).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-lg p-6 text-gray-600 dark:text-gray-400 italic">
              Şu an gösterilecek proje bulunmuyor veya GitHub API bağlantısında bir sorun oluştu.
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
