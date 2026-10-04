import type { Metadata } from 'next';
import Navbar from '../../components/Navigation/Navbar';
import Footer from '../../components/Footer/Footer';
import { FadeIn } from '../../components/UI/FadeIn';

export const metadata: Metadata = {
  title: "Setup & Araçlarım | Kayra Divrik",
  description: "Günlük olarak kullandığım donanım, yazılım ve geliştirme ortamım.",
  alternates: {
    canonical: "/uses",
  },
};

const hardware = [
  {
    name: "HP Victus 15",
    description: "Intel Core i5-13500H & RTX 4050 Laptop GPU (Ana bilgisayarım)",
    image: "💻"
  },
  {
    name: "Asus TUF Gaming Monitör",
    description: "24 inç, 180Hz yenileme hızıyla akıcı deneyim",
    image: "🖥️"
  },
  {
    name: "Redragon K617 Fizz",
    description: "Mekanik Klavye - %60 kompakt tasarım",
    image: "⌨️"
  },
  {
    name: "Razer Viper",
    description: "Ultra hafif ve hassas oyuncu mouse'u",
    image: "🖱️"
  },
  {
    name: "SteelSeries Arctis 1",
    description: "Oyuncu Kulaklığı",
    image: "🎧"
  }
];

const software = [
  {
    name: "Arch Linux",
    icon: "https://cdn.simpleicons.org/archlinux/1793D1",
    description: "Sistem seviyesi testler ve siber güvenlik araştırmaları için ana Linux ortamım."
  },
  {
    name: "Windows 11",
    icon: "https://cdn.simpleicons.org/windows11/0078D4",
    description: "Günlük kullanım ve bazı spesifik oyun/araçlar için."
  },
  {
    name: "Visual Studio Code",
    icon: "https://cdn.simpleicons.org/visualstudiocode/007ACC",
    description: "Vazgeçilmez kod editörüm. Antigravity IDE eklentisiyle birlikte."
  },
  {
    name: "Next.js",
    icon: "https://cdn.simpleicons.org/nextdotjs/white",
    description: "Bu siteyi de geliştirdiğim modern React framework'ü."
  },
  {
    name: "TypeScript",
    icon: "https://cdn.simpleicons.org/typescript/3178C6",
    description: "JavaScript'e tip güvenliği getirerek projelerimi daha sağlam kılıyor."
  },
  {
    name: "Python",
    icon: "https://cdn.simpleicons.org/python/3776AB",
    description: "Scripting, otomasyon ve güvenlik araçları yazmak için."
  }
];

export default function Uses() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-32 sm:py-48 flex-grow w-full">
        <section id="uses">
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-6">
              Setup & Araçlar.
            </h1>
            <p className="text-lg text-zinc-500 font-light mb-16 max-w-2xl">
              Siber güvenlik testlerimi yaparken, sistemleri yönetirken ve kod yazarken günlük olarak tercih ettiğim donanım ve yazılımların bir listesi.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.2} className="mb-20">
            <h2 className="text-2xl font-bold mb-8 tracking-tight flex items-center gap-3">
              <span className="w-8 h-[1px] bg-zinc-300 dark:bg-zinc-700"></span>
              Donanım & Ekipman
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hardware.map((item, i) => (
                <div 
                  key={i}
                  className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/50 flex gap-4 items-start"
                >
                  <div className="text-3xl">{item.image}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{item.name}</h3>
                    <p className="text-sm text-zinc-500 font-light">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h2 className="text-2xl font-bold mb-8 tracking-tight flex items-center gap-3">
              <span className="w-8 h-[1px] bg-zinc-300 dark:bg-zinc-700"></span>
              Yazılım & Ortam
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {software.map((item, i) => (
                <div 
                  key={i}
                  className="group p-6 rounded-2xl border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#0a0a0a] hover:border-orange-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform duration-300">
                      <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-500 font-light">{item.description}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </div>
  );
}
