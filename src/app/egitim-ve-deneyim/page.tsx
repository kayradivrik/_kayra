import type { Metadata } from 'next';
import Navbar from '../../components/Navigation/Navbar';
import Footer from '../../components/Footer/Footer';
import { FadeIn } from '../../components/UI/FadeIn';

export const metadata: Metadata = {
  title: "Eğitim & Deneyim",
  description: "Kayra Divrik (Sonsuscato) akademik ve teknik eğitim geçmişi.",
};

export default function EducationAndExperience() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 flex flex-col">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-32 sm:py-48 flex-grow w-full">
        <section id="experience">
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-16">
              Experience.
            </h1>
          </FadeIn>
          
          <div className="space-y-16">
            <FadeIn delay={0.2}>
              <article className="relative border-l border-zinc-200 dark:border-zinc-800 pl-8 pb-4">
                <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-900 dark:bg-white"></span>
                <div className="text-sm font-mono text-zinc-400 mb-3">2026 — Present</div>
                <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">
                  Doğuş Üniversitesi
                </h3>
                <h4 className="text-sm text-zinc-500 font-medium mb-4">Information Security Technology</h4>
                <p className="text-zinc-500 font-light leading-relaxed">
                  Focusing on system security, penetration testing, network protocols, cyber defense architectures, and malware analysis.
                </p>
              </article>
            </FadeIn>

            <FadeIn delay={0.3}>
              <article className="relative border-l border-zinc-200 dark:border-zinc-800 pl-8 pb-4">
                <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                <div className="text-sm font-mono text-zinc-400 mb-3">2022 — 2026</div>
                <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">
                  Madenler MTAL
                </h3>
                <h4 className="text-sm text-zinc-500 font-medium mb-4">Information Technologies</h4>
                <p className="text-zinc-500 font-light leading-relaxed">
                  Foundations of software development, database management, C++ programming, and computer network infrastructures.
                </p>
              </article>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
