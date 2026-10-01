import type { Metadata } from 'next';
import Navbar from '../../components/Navigation/Navbar';
import Footer from '../../components/Footer/Footer';
import { FadeIn } from '../../components/UI/FadeIn';
import { StackTools } from '../../components/About/StackTools';

export const metadata: Metadata = {
  title: "Hakkımda",
  description: "Kayra Divrik (Sonsuscato) kimdir? Doğuş Üniversitesi Bilişim Güvenliği öğrencisi, siber güvenlik araştırmacısı ve Linux sistem mühendisi.",
};

export default function AboutMe() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 flex flex-col">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-32 sm:py-48 flex-grow w-full">
        <section id="about">
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-12">
              About.
            </h1>
          </FadeIn>
          
          <div className="space-y-12">
            <FadeIn delay={0.2}>
              <div className="aspect-[21/9] w-full overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900">
                <img 
                  src="https://avatars.githubusercontent.com/u/81221998?v=4" 
                  alt="Kayra Divrik" 
                  className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="space-y-6 text-base sm:text-lg leading-relaxed text-zinc-500 font-light">
                <p>
                  I'm Kayra, a systems engineer and cybersecurity researcher. I spend my time breaking things to understand how they work, and then building them back stronger.
                </p>
                <p>
                  My expertise lies at the intersection of low-level system programming (C++, Bash), offensive security, and modern web architectures. I thrive in Linux environments and constantly seek to optimize and secure infrastructures.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="pt-12 border-t border-zinc-100 dark:border-zinc-900">
                <h3 className="text-xl font-semibold tracking-tight mb-8">Stack & Tools</h3>
                <StackTools />
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
