// app/layout.tsx
// 👉 layout GLOBAL (pour toutes les autres pages)

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { NavbarDemo } from "@/components/NavbarDemo";
import { BackgroundGlobal } from "@/components/BackgroundGlobal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackgroundGlobal />

        {/* NAVBAR */}
        <div className="fixed top-0 left-0 w-full z-50">
          <NavbarDemo />
        </div>

        {/* CONTENU */}
        <main className="pt-[55px]">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
