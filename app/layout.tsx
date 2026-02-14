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

export const metadata: Metadata = {
  title: "Ibiza Club",
  description: "Ibiza Club Barcelona",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} mt-[-55px] antialiased`} 
      >
        <BackgroundGlobal />
        <NavbarDemo />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
