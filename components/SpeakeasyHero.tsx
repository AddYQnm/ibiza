"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Playfair_Display, Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "900"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600"] });

type SpeakeasyHeroProps = {
  backgroundVideo?: {
    mp4: string;
    webm?: string;
    poster?: string;
  };
  backgroundImage?: string; // fallback si pas de vidéo
  subtitle?: string;
  title: string;
  description: string;
};

export default function SpeakeasyHero({
  backgroundVideo,
  backgroundImage,
  subtitle = "Lieu confidentiel",
  title,
  description,
}: SpeakeasyHeroProps) {
  const reduceMotion = useReducedMotion();

  // ✅ optionnel mais recommandé: coupe la vidéo sur mobile (iOS/Safari)
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true } as any);
    return () => window.removeEventListener("resize", check as any);
  }, []);

  const showVideo = Boolean(backgroundVideo) && !reduceMotion && !isMobile;

  return (
    <section
      className={cn(
        "relative isolate z-20 w-full overflow-hidden bg-black flex items-center",
        "min-h-[100vh] h-[100dvh]",
        "md:h-screen"
      )}
    >
      {/* 🎥 VIDEO (comme ton HeroVideoImmersive) */}
      {showVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          // ⚠️ ton exemple a preload="none" (ok), mais "metadata" est souvent plus smooth
          preload="metadata"
          poster={backgroundVideo?.poster}
        >
          {backgroundVideo?.webm ? (
            <source src={backgroundVideo.webm} type="video/webm" />
          ) : null}
          <source src={backgroundVideo!.mp4} type="video/mp4" />
        </video>
      ) : (
        // ✅ fallback image (poster > backgroundImage)
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundVideo?.poster || backgroundImage || ""})`,
          }}
        />
      )}

      {/* 🎞️ OVERLAYS (tu peux garder le même style que ton exemple) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />

      {/* ✅ BLOOMS (option: si tu veux les mêmes, garde-les; sinon je peux les rendre plus light) */}
      <div
        className={cn(
          "pointer-events-none absolute -top-40 left-1/3 h-[600px] w-[600px] rounded-full bg-purple-800/20 blur-[160px]",
          "transform-gpu"
        )}
        style={{ willChange: "transform" }}
      />
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-fuchsia-700/15 blur-[160px]",
          "transform-gpu"
        )}
        style={{ willChange: "transform" }}
      />

      {/* CONTENT (tes infos) */}
      <div className="relative z-10 px-6 md:px-24 max-w-5xl">
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`${montserrat.className} block text-xs uppercase tracking-[0.45em] text-white/60 mb-6`}
        >
          {subtitle}
        </motion.span>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 50 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`${playfair.className} text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.95] text-[#F5F4F2]`}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className={`${montserrat.className} mt-10 max-w-xl text-lg text-white/70 leading-relaxed`}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
