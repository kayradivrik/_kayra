import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import SecurityShield from "../components/Security/SecurityShield";
import GitRainBackground from "../components/UI/GitRainBackground";
import GoogleAnalytics from "../components/Analytics/GoogleAnalytics";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kayradivrik.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sonsuscato | Kayra Divrik — Siber Güvenlik & Sistem Mühendisliği",
    template: "%s | Kayra Divrik (Sonsuscato)",
  },
  description: "Kayra Divrik (Sonsuscato) kişisel portfolyosu ve Kayradan Notlar teknik günlüğü. Siber güvenlik, Linux sistem mühendisliği, sızma testleri, C++, Python ve ağ mimarileri üzerine araştırmalar.",
  keywords: [
    "Sonsuscato",
    "Kayra Divrik",
    "Kayradan Notlar",
    "kayradannotlar.com",
    "Siber Güvenlik",
    "Cybersecurity Engineer",
    "Linux Systems Engineer",
    "Linux Hardening",
    "Penetration Testing",
    "Sızma Testi",
    "Ağ Güvenliği",
    "Network Security",
    "Doğuş Üniversitesi",
    "Bilişim Güvenliği Teknolojisi",
    "C++",
    "Python",
    "Bash Scripting",
    "Reverse Engineering"
  ],
  authors: [{ name: "Kayra Divrik (Sonsuscato)", url: "https://github.com/kayradivrik" }],
  creator: "Kayra Divrik",
  publisher: "Sonsuscato",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sonsuscato | Kayra Divrik — Siber Güvenlik & Sistem Mühendisliği",
    description: "Siber güvenlik araştırmaları, Linux sistem mimarisi, sızma testleri ve Kayradan Notlar teknik blogu.",
    url: siteUrl,
    siteName: "Kayra Divrik (Sonsuscato)",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Sonsuscato (Kayra Divrik) — Siber Güvenlik & Sistem Mühendisliği",
      },
    ],
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonsuscato | Kayra Divrik — Siber Güvenlik & Sistem Mühendisliği",
    description: "Siber güvenlik araştırmaları, Linux sistem mühendisliği ve Kayradan Notlar teknik arşivi.",
    images: ["/profile.jpg"],
    creator: "@kayradivrik",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png?v=6", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png?v=6",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "yLlKYDdKAqjl4RqIg_X2q6fNvFiN2_rcwq5FuDP6Ozk",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      "name": "Kayra Divrik",
      "alternateName": "Sonsuscato",
      "url": siteUrl,
      "image": "https://avatars.githubusercontent.com/u/81221998?v=4",
      "jobTitle": "Cybersecurity & Linux Systems Engineer",
      "worksFor": {
        "@type": "EducationalOrganization",
        "name": "Doğuş Üniversitesi"
      },
      "sameAs": [
        "https://kayradannotlar.com",
        "https://github.com/kayradivrik",
        "https://linkedin.com/in/kayradivrik",
        "https://instagram.com/kayradivrik"
      ],
      "knowsAbout": [
        "Cybersecurity",
        "Linux Systems Engineering",
        "Penetration Testing",
        "Network Security",
        "C++",
        "Python",
        "Bash",
        "System Hardening",
        "Information Security"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "Kayra Divrik (Sonsuscato) — Portfolyo & Blog",
      "description": "Siber güvenlik, Linux sistemleri ve açık kaynak projeler.",
      "publisher": {
        "@id": `${siteUrl}/#person`
      },
      "inLanguage": ["tr-TR", "en-US"]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "yLlKYDdKAqjl4RqIg_X2q6fNvFiN2_rcwq5FuDP6Ozk"}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleAnalytics />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-orange-500 selection:text-white transition-colors duration-300 relative`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SecurityShield />
          <GitRainBackground />
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
