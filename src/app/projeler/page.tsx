import type { Metadata } from 'next';
import Navbar from '../../components/Navigation/Navbar';
import Footer from '../../components/Footer/Footer';
import { FadeIn } from '../../components/UI/FadeIn';

export const metadata: Metadata = {
  title: "Projeler & Açık Kaynak",
  description: "Kayra Divrik (Sonsuscato) tarafından geliştirilen siber güvenlik, Linux sistem araçları, C++ ve açık kaynak GitHub projeleri.",
  alternates: {
    canonical: "/projeler",
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
    const headers: HeadersInit = {};
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch('https://api.github.com/users/kayradivrik/repos?sort=updated&per_page=12', {
      headers
    });
    
    if (!res.ok) {
      console.error('GitHub API error:', res.status, res.statusText);
      return [];
    }
    
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
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-32 sm:py-48 flex-grow w-full">
        <section id="projects">
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-6">
              Projeler.
            </h1>
            <p className="text-lg text-zinc-500 font-light mb-16 max-w-2xl">
              GitHub üzerinden açık kaynaklı araçlar, sistem mimarisi deneyleri ve siber güvenlik araştırmaları.
            </p>
          </FadeIn>
          
          {repos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {repos.map((repo, i) => (
                <FadeIn key={repo.id} delay={0.2 + (i * 0.05)}>
                  <a 
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full p-6 rounded-2xl border border-zinc-200 dark:border-zinc-900 hover:border-zinc-900 dark:hover:border-white transition-all duration-500 bg-white dark:bg-zinc-950"
                  >
                    <div className="flex flex-col h-full">
                      <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2 group-hover:translate-x-1 transition-transform duration-300">
                        {repo.name}
                      </h3>
                      <p className="text-sm text-zinc-500 font-light leading-relaxed flex-grow line-clamp-3 mb-6">
                        {repo.description || "Açıklama bulunmuyor."}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-900">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100"></span>
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          ★ {repo.stargazers_count}
                        </span>
                      </div>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn delay={0.3}>
              <div className="p-8 text-center text-zinc-500 font-light border border-zinc-200 dark:border-zinc-900 rounded-2xl">
                Depo bulunamadı.
              </div>
            </FadeIn>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
