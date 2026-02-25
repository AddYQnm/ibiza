/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef } from "react";
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
  backgroundImage?: string;
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
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /* ✅ Force play sur mobile (iOS/Safari safe) */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const p = video.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        // Autoplay peut être bloqué → poster visible, play au premier scroll/tap
      });
    }
  }, []);

  return (
    <section
      className={cn(
        "relative isolate z-20 w-full overflow-hidden bg-black flex items-center",
        "min-h-[100vh] h-[100dvh] md:h-screen"
      )}
    >
      {/* 🎥 VIDEO (desktop + mobile) */}
      {backgroundVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={backgroundVideo.poster}
          disablePictureInPicture
          webkit-playsinline="true"
        >
          {backgroundVideo.webm && (
            <source src={backgroundVideo.webm} type="video/webm" />
          )}
          <source src={backgroundVideo.mp4} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage || ""})`,
          }}
        />
      )}

      {/* 🎞️ OVERLAY */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />

      {/* 🌈 BLOOMS (mobile allégés) */}
      <div
        className="
          pointer-events-none absolute -top-32 left-1/3
          h-[420px] w-[420px] md:h-[600px] md:w-[600px]
          bg-purple-800/16 md:bg-purple-800/20
          blur-[110px] md:blur-[160px]
        "
      />
      <div
        className="
          pointer-events-none absolute bottom-0 right-1/4
          h-[360px] w-[360px] md:h-[500px] md:w-[500px]
          bg-fuchsia-700/12 md:bg-fuchsia-700/15
          blur-[110px] md:blur-[160px]
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 px-6 md:px-24 max-w-5xl">
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${montserrat.className} block text-xs uppercase tracking-[0.45em] text-white/60 mb-6`}
        >
          {subtitle}
        </motion.span>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`${playfair.className} text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] text-[#F5F4F2]`}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className={`${montserrat.className} mt-8 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed`}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}