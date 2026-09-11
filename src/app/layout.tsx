import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Sonsuscato | Kayra Divrik — Cybersecurity & Linux Systems Engineer",
  description: "Official portfolio of Sonsuscato (Kayra Divrik) — Cybersecurity & Linux Systems Engineer. Specializing in system security, penetration testing, network infrastructure, and open-source tools.",
  keywords: [
    "Sonsuscato",
    "Kayra Divrik",
    "Cybersecurity Engineer",
    "Linux Systems Engineer",
    "Information Security",
    "Penetration Testing",
    "Network Security",
    "Linux Hardening",
    "C++",
    "Python",
    "Bash",
    "Dogus University"
  ],
  authors: [{ name: "Kayra Divrik (Sonsuscato)", url: "https://github.com/kayradivrik" }],
  creator: "Kayra Divrik",
  publisher: "Sonsuscato",
  metadataBase: new URL("https://kayradivrik.github.io"),
  openGraph: {
    title: "Sonsuscato | Kayra Divrik — Cybersecurity & Linux Systems Engineer",
    description: "Official portfolio of Sonsuscato (Kayra Divrik). Exploring cybersecurity, Linux system hardening, penetration testing, and open-source development.",
    url: "https://kayradivrik.github.io",
    siteName: "Sonsuscato Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Sonsuscato (Kayra Divrik) — Cybersecurity & Linux Systems Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonsuscato | Kayra Divrik — Cybersecurity & Linux Systems Engineer",
    description: "Official portfolio of Sonsuscato (Kayra Divrik). Exploring cybersecurity, Linux system hardening, and open-source development.",
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Kayra Divrik",
  "alternateName": "Sonsuscato",
  "url": "https://github.com/kayradivrik",
  "image": "https://github.com/kayradivrik.png",
  "jobTitle": "Cybersecurity & Linux Systems Engineer",
  "worksFor": {
    "@type": "EducationalOrganization",
    "name": "Dogus University"
  },
  "sameAs": [
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
    "System Hardening"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased bg-black text-white selection:bg-cyan-500 selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
