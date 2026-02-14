'use client';

import dynamic from "next/dynamic";

import HeroVideo from "@/components/HeroVideo";
import EditorialSection from "@/components/EditorialSection";
import AboutIbizaSection from "@/components/AboutIbizaSection";

const Skiper48 = dynamic(
  () => import("@/components/HiIbizaStackCards").then(m => m.Skiper48),
  { ssr: false, loading: () => <div className="h-40" /> }
);

const Skiper30 = dynamic(
  () => import("@/components/Galerie").then(m => m.Skiper30),
  { ssr: false, loading: () => <div className="h-40" /> }
);

const InstagramSection = dynamic(
  () => import("@/components/InstagramSection").then(m => m.InstagramSection),
  { ssr: false, loading: () => <div className="h-40" /> }
);

export default function Home() {
  return (
    <div className="mt-[-55px]">
      <HeroVideo />
      <EditorialSection />
      <Skiper48 />
      <AboutIbizaSection />
      <main>
        <Skiper30 />
      </main>
      <InstagramSection />
    </div>
  );
}
