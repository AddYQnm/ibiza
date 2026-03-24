// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { NavbarDemo } from "@/components/NavbarDemo";
import { BackgroundGlobal } from "@/components/BackgroundGlobal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ibiza Club Rouen — Tables VIP, Soirées & Privatisations",
  description:
    "Ibiza Club Rouen : club sur deux étages, tables VIP, Speakeasy privatisable, DJs d'exception. Réservez votre soirée dès maintenant.",
  keywords: [
    "club rouen",
    "ibiza club rouen",
    "soirée rouen",
    "table vip rouen",
    "speakeasy rouen",
    "privatisation rouen",
    "nightclub rouen",
  ],
  openGraph: {
    title: "Ibiza Club Rouen",
    description:
      "Tables VIP, Speakeasy & privatisations. Vivez une expérience nocturne inoubliable à Rouen.",
    url: "https://ibizaclubrouen.fr",
    siteName: "Ibiza Club Rouen",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ibiza Club Rouen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibiza Club Rouen",
    description: "Tables VIP, Speakeasy & privatisations à Rouen.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://ibizaclubrouen.fr",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <BackgroundGlobal />

        {/* NAVBAR fixe */}
        <header className="fixed top-0 left-0 w-full z-50">
          <NavbarDemo />
        </header>

        {/* CONTENU — un seul wrapper, pas de <main> ici */}
        <div className="pt-[55px]">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
