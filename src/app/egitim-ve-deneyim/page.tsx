import type { Metadata } from 'next';
import Navbar from '../../components/Navigation/Navbar';
import Footer from '../../components/Footer/Footer';

export const metadata: Metadata = {
  title: "Eğitim & Deneyim",
  description: "Kayra Divrik (Sonsuscato) akademik ve teknik eğitim geçmişi: Doğuş Üniversitesi Bilişim Güvenliği Teknolojisi, Madenler MTAL.",
  alternates: {
    canonical: "/egitim-ve-deneyim",
  },
  openGraph: {
    title: "Eğitim & Deneyim | Kayra Divrik (Sonsuscato)",
    description: "Doğuş Üniversitesi Bilgi Güvenliği Teknolojisi ve bilişim sistemleri eğitim geçmişi.",
    url: "https://kayradivrik.com.tr/egitim-ve-deneyim",
  },
};

export default function EducationAndExperience() {
  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 font-sans flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-24 sm:py-32 flex-grow w-full">
        <section id="experience">
          <h1 className="text-3xl font-semibold mb-10 text-gray-900 dark:text-gray-100 border-b pb-3 border-gray-200 dark:border-zinc-800">
            Eğitim & Deneyim
          </h1>
          
          <div className="space-y-12">
            <article>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2 gap-1">
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">Doğuş Üniversitesi</h3>
                <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">2026 — 2028 (Günümüz)</span>
              </div>
              <h4 className="text-md text-gray-600 dark:text-gray-300 mb-4">Bilgi Güvenliği Teknolojisi</h4>
              <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-4">
                Sistem güvenliği, sızma testleri, ağ protokolleri, siber savunma mimarileri ve zararlı yazılım analizi üzerine odaklanan lisansüstü/önlisans çalışmaları.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 font-mono">
                #InformationSecurity #PenetrationTesting #NetworkSecurity #LinuxHardening
              </p>
            </article>

            <article>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2 gap-1">
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">Madenler Mesleki ve Teknik Anadolu Lisesi</h3>
                <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">2022 — 2026</span>
              </div>
              <h4 className="text-md text-gray-600 dark:text-gray-300 mb-4">Bilişim Teknolojileri</h4>
              <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-4">
                Yazılım geliştirme temelleri, veritabanı yönetimi, C++ programlama ve bilgisayar ağ altyapılarını kapsayan temel teknik eğitim.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 font-mono">
                #InformationTechnology #C++Programming #NetworkSystems #Databases
              </p>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
