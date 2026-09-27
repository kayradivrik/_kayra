import type { Metadata } from 'next';
import Navbar from '../../components/Navigation/Navbar';
import Footer from '../../components/Footer/Footer';

export const metadata: Metadata = {
  title: "Hakkımda",
  description: "Kayra Divrik (Sonsuscato) kimdir? Doğuş Üniversitesi Bilişim Güvenliği öğrencisi, siber güvenlik araştırmacısı ve Linux sistem mühendisi.",
  alternates: {
    canonical: "/hakkimda",
  },
  openGraph: {
    title: "Hakkımda | Kayra Divrik (Sonsuscato)",
    description: "Siber güvenlik, Linux sistem mimarisi ve teknik araştırmalar yürüten Kayra Divrik hakkında detaylı bilgi.",
    url: "https://kayradivrik.com.tr/hakkimda",
  },
};

export default function AboutMe() {
  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 font-sans flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-24 sm:py-32 flex-grow w-full">
        <section id="about">
          <h1 className="text-3xl font-semibold mb-10 text-gray-900 dark:text-gray-100 border-b pb-3 border-gray-200 dark:border-zinc-800">
            Hakkımda
          </h1>
          
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Fotoğraf */}
            <div className="w-full md:w-1/3 shrink-0">
              <div className="aspect-square relative overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800 shadow-sm border border-gray-200 dark:border-zinc-800">
                <img 
                  src="https://avatars.githubusercontent.com/u/81221998?v=4" 
                  alt="Kayra Divrik (Sonsuscato)" 
                  loading="lazy"
                  decoding="async"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Metin */}
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Sonsuscato — Kayra Divrik
              </h2>
              <h3 className="text-lg text-gray-500 dark:text-gray-400 mb-6 font-light">
                Cybersecurity & Linux Systems Engineer
              </h3>
              
              <div className="space-y-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                  Merhaba, ben Kayra. Bilgisayar ağları, sistem güvenliği, sızma testleri ve açık kaynaklı araçlar üzerine odaklanan bir siber güvenlik ve Linux sistem mühendisiyim.
                </p>
                <p>
                  Sistemlerin nasıl çalıştığını en alt seviyeden başlayarak anlamak, güvenlik açıklarını tespit etmek ve altyapıları sağlamlaştırmak en büyük tutkum. C++, Python, Bash gibi dillerle çalışıyor ve Linux tabanlı sistemlerde güvenlik süreçleri tasarlıyorum.
                </p>
                <p>
                  Bu siteyi hem akademik ve profesyonel geçmişimi derlediğim bir portfolyo, hem de edindiğim tecrübeleri, teknik notları ve siber güvenlik alanındaki yazılarımı paylaştığım kişisel bir alan olarak oluşturdum.
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100 dark:border-zinc-800">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">İletişim & Sosyal Medya</h4>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>E-posta:</strong> <a href="mailto:projects.kayra@gmail.com" className="text-orange-600 hover:underline">projects.kayra@gmail.com</a>
                  </li>
                  <li>
                    <strong>GitHub:</strong> <a href="https://github.com/kayradivrik" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">github.com/kayradivrik</a>
                  </li>
                  <li>
                    <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/kayradivrik" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">linkedin.com/in/kayradivrik</a>
                  </li>
                  <li>
                    <strong>Instagram:</strong> <a href="https://instagram.com/kayradivrik" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">instagram.com/kayradivrik</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
