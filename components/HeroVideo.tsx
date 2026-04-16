"use client";

import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useReducedMotion } from "framer-motion";
import { Playfair_Display, Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

// ── Lazy-load framer-motion pour réduire le bundle initial (impact INP)
const MotionDiv = lazy(() =>
  import("framer-motion").then((m) => ({ default: m.motion.div }))
);
const MotionH1 = lazy(() =>
  import("framer-motion").then((m) => ({ default: m.motion.h1 }))
);
const MotionP = lazy(() =>
  import("framer-motion").then((m) => ({ default: m.motion.p }))
);
const MotionDivInner = lazy(() =>
  import("framer-motion").then((m) => ({ default: m.motion.div }))
);

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.03, delayChildren: 0 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

const YOUTUBE_ID = "OWmrwtdmHbM";

export default function HeroVideo() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => video.play().catch(() => {});
    video.addEventListener("canplay", play, { once: true });
    return () => video.removeEventListener("canplay", play);
  }, []);

  return (
    <section
      className={cn(
        "relative isolate z-20 w-full overflow-hidden bg-black",
        "min-h-[100svh]"
      )}
      aria-label="Ibiza Club Rouen — Hero"
    >
      {/* ─── VIDEO BACKGROUND ───────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        {mounted && !videoError ? (
          <video
            ref={videoRef}
            className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
            src="https://res.cloudinary.com/dnsdrqzi3/video/upload/v1774465869/mojo_video_czbwpy.mp4"
            // CORRECTIF LCP : poster = image statique affichée pendant le chargement vidéo.
            // Générer via : ffmpeg -ss 0.1 -i video.mp4 -vframes 1 -q:v 5 poster.webp
            // puis héberger sur Cloudinary : upload/f_auto,q_60/poster.webp
            poster="https://res.cloudinary.com/dnsdrqzi3/image/upload/f_auto,q_60/hero_poster.webp"
            autoPlay
            muted
            loop
            playsInline
            // CORRECTIF LCP : "auto" pour commencer à bufferiser plus tôt.
            // Attention : augmente légèrement la consommation data mobile.
            // Alternative conservatrice : garder "metadata" + ajouter le poster ci-dessus.
            preload="auto"
            onError={() => setVideoError(true)}
            aria-hidden="true"
          />
        ) : mounted && videoError ? (
          <iframe
            className="absolute left-1/2 top-1/2 h-[120vh] w-[220vw] max-w-none -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_ID}&controls=0&modestbranding=1&playsinline=1&rel=0`}
            title="Ibiza Club background"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 bg-black" />
        )}
      </div>

      {/* OVERLAYS */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
      <div className="pointer-events-none absolute inset-0 bg-black/30 [mask-image:radial-gradient(60%_55%_at_50%_45%,black,transparent)]" />

      {/*
        CORRECTIF INP : blobs CSS-only, inchangés.
        CORRECTIF : suppression du blob gauche sur mobile (hidden md:block) — déjà ok.
        On supprime juste le blur-[110px] sur mobile car c'est coûteux en paint.
      */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-44 h-[420px] w-[420px] rounded-full bg-purple-700/16 blur-[110px] hidden md:block"
        style={{ animation: reduceMotion ? "none" : "heroFloatY 10s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute top-[32%] left-[8%] h-[320px] w-[320px] rounded-full bg-fuchsia-600/10 blur-[115px] hidden md:block"
        style={{ animation: reduceMotion ? "none" : "heroFloatXY 11s ease-in-out infinite" }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/10 to-transparent md:h-40" />

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-[100svh] items-center px-5 sm:px-6 md:px-24">
        {/*
          CORRECTIF INP : on wrappe dans Suspense pour que Framer Motion soit lazy.
          Fallback = structure statique visible immédiatement (meilleur LCP + pas de CLS).
        */}
        <Suspense
          fallback={
            <div className="w-full max-w-4xl">
              <div className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4">
                <span className="h-[2px] w-10 bg-gradient-to-r from-purple-300 via-fuchsia-400 to-indigo-300 sm:w-14" />
                <span className={cn(montserrat.className, "text-[10px] uppercase tracking-[0.28em] text-white/68 sm:text-xs sm:tracking-[0.45em]")}>
                  Rouen · Club &amp; Experience
                </span>
              </div>
              <h1 className={cn(playfair.className, "text-[clamp(2.8rem,10vw,4.2rem)] sm:text-[clamp(3.4rem,8vw,5.2rem)] md:text-[clamp(3.6rem,7.2vw,7rem)]", "font-black leading-[0.92] text-[#F5F4F2]")}>
                Ibiza<br /><span className="relative inline-block">Club</span>
              </h1>
            </div>
          }
        >
          <MotionDiv
            variants={container}
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? undefined : "show"}
            className="w-full max-w-4xl"
          >
            <MotionDivInner variants={item} className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4">
              <span className="h-[2px] w-10 bg-gradient-to-r from-purple-300 via-fuchsia-400 to-indigo-300 sm:w-14" />
              <span className={cn(montserrat.className, "text-[10px] uppercase tracking-[0.28em] text-white/68 sm:text-xs sm:tracking-[0.45em]")}>
                Rouen · Club &amp; Experience
              </span>
            </MotionDivInner>

            <MotionH1
              variants={item}
              className={cn(
                playfair.className,
                "text-[clamp(2.8rem,10vw,4.2rem)] sm:text-[clamp(3.4rem,8vw,5.2rem)] md:text-[clamp(3.6rem,7.2vw,7rem)]",
                "font-black leading-[0.92] text-[#F5F4F2]"
              )}
            >
              Ibiza
              <br />
              <span className="relative inline-block">
                Club
                <span className="pointer-events-none absolute -inset-5 -z-10 bg-purple-600/16 blur-3xl md:-inset-6" />
              </span>
            </MotionH1>

            <MotionP
              variants={item}
              className={cn(montserrat.className, "mt-6 max-w-2xl text-base leading-relaxed text-white/74 sm:mt-8 sm:text-lg md:mt-10 md:text-xl")}
            >
              <span className="italic text-white/86">The Night Starts Here.</span>
              <br />
              Tables VIP, privatisations exclusives et DJs d'exception — chaque nuit est pensée
              comme une expérience sensorielle, intense et élégante.
            </MotionP>

            <MotionDivInner
              variants={item}
              className="mt-10 flex flex-col flex-wrap gap-4 sm:mt-12 sm:flex-row sm:gap-5 md:mt-14"
            >
              <a
                href="/reservation"
                className={cn(
                  montserrat.className,
                  "group relative inline-flex w-full items-center justify-center rounded-full px-8 py-4",
                  "text-sm font-semibold uppercase tracking-widest",
                  "bg-[#F5F4F2] text-black",
                  "transition-transform duration-300 sm:w-auto sm:px-10 sm:hover:-translate-y-0.5"
                )}
              >
                <span className="pointer-events-none absolute inset-0 rounded-full bg-purple-500/25 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-70" />
                <span className="relative">Réserver</span>
              </a>
              <a
                href="/events"
                className={cn(
                  montserrat.className,
                  "group relative inline-flex w-full items-center justify-center gap-3 rounded-full px-3 py-4",
                  "text-sm uppercase tracking-widest text-[#F5F4F2] sm:w-auto sm:justify-start"
                )}
              >
                Événements
                <span className="opacity-70 transition-all duration-500 group-hover:translate-x-2 group-hover:opacity-100">→</span>
                <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-purple-300 via-fuchsia-400 to-indigo-300 transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </a>
            </MotionDivInner>

            <MotionDivInner variants={item} className="mt-8 flex flex-wrap gap-2 text-[11px] sm:mt-10 sm:gap-3 sm:text-xs">
              {["VIP Tables", "Privatisations", "DJs & Events"].map((tag) => (
                <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-white/75 backdrop-blur sm:px-4">
                  {tag}
                </span>
              ))}
            </MotionDivInner>
          </MotionDiv>
        </Suspense>
      </div>

      <div
        className={cn(
          montserrat.className,
          "absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.28em] text-white/55 sm:bottom-8 sm:text-xs sm:tracking-[0.35em] md:bottom-10",
          reduceMotion ? "" : "animate-bounce"
        )}
        style={reduceMotion ? undefined : { animationDuration: "2.2s" }}
      >
        SCROLL
      </div>
    </section>
  );
}