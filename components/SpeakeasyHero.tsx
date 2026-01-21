"use client";

import { motion } from "framer-motion";
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
});

interface SpeakeasyHeroProps {
  backgroundImage: string;
  subtitle?: string;
  title: string;
  description: string;
}

export default function SpeakeasyHero({
  backgroundImage,
  subtitle = "Lieu confidentiel",
  title,
  description,
}: SpeakeasyHeroProps) {
  return (
    <section className="relative h-screen overflow-hidden bg-black flex items-center">
      
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/75" />

      {/* LIGHT BLOOMS */}
      <div className="absolute -top-40 left-1/3 h-[600px] w-[600px] rounded-full bg-purple-800/20 blur-[220px]" />
      <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-fuchsia-700/15 blur-[240px]" />

      {/* CONTENT */}
      <div className="relative z-10 px-6 md:px-24 max-w-5xl">
        
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`${montserrat.className} block text-xs uppercase tracking-[0.45em] text-white/60 mb-6`}
        >
          {subtitle}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`${playfair.className} text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.95] text-[#F5F4F2]`}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className={`${montserrat.className} mt-10 max-w-xl text-lg text-white/70 leading-relaxed`}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
