import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Sonsuscato | Kayra Divrik",
  description: "Sonsuscato (Kayra Divrik) Portfolio Website.",
  icons: {
    icon: [
      { url: "/favicon.png?v=6", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png?v=6",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black">
      <body className={`${spaceGrotesk.variable} antialiased bg-black text-white selection:bg-cyan-500 selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
