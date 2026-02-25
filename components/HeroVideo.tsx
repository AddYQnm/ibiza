"use client";

import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Playfair_Display, Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "900"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600"] });

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.10, delayChildren: 0.10 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
};

export default function HeroVideoImmersive() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // iOS/Safari: on “prépare” le player au maximum
    v.muted = true;
    v.playsInline = true;

    // Tentative autoplay immédiate (ok sur desktop + certains Android)
    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        // Safari iOS peut bloquer tant qu’il n’y a pas eu une interaction utilisateur
      }
    };

    tryPlay();

    // “Unlock” au 1er geste utilisateur (tap/scroll/click) n’importe où
    const unlock = () => {
      tryPlay();
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("click", unlock);
      window.removeEventListener("scroll", unlock);
    };

    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("click", unlock, { passive: true });
    window.addEventListener("scroll", unlock, { passive: true });

    // Quand on revient sur l’onglet (iOS peut pause), on retente
    const onVis = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cleanup();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <section
      className={cn(
        "relative isolate z-20 w-full overflow-hidden bg-black",
        "min-h-[100vh] h-[100dvh] md:h-[100svh]"
      )}
    >
      {/* 🎥 VIDEO */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        // @ts-ignore (Safari legacy)
        webkit-playsinline="true"
      >
        <source
          src="https://res.cloudinary.com/dba299maa/video/upload/f_auto,q_auto/v1771902683/mojo_video_r1ppim.mp4"
          type="video/mp4"
        />
      </video>

      {/* OVERLAYS */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_55%_at_50%_45%,black,transparent)] bg-black/60" />

      {/* 💜 BLOOMS */}
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full transform-gpu",
          "-top-44 h-[420px] w-[420px] bg-purple-700/16 blur-[110px]",
          "md:-top-48 md:h-[600px] md:w-[600px] md:bg-purple-700/18 md:blur-[140px]",
          !reduceMotion ? "hidden md:block animate-[heroFloatY_10s_ease-in-out_infinite]" : ""
        )}
        style={{ willChange: reduceMotion ? undefined : "transform" }}
      />

      <div
        className={cn(
          "pointer-events-none absolute rounded-full transform-gpu",
          "top-[32%] left-[8%] h-[320px] w-[320px] bg-fuchsia-600/10 blur-[115px]",
          "md:top-[28%] md:left-[18%] md:h-[440px] md:w-[440px] md:bg-fuchsia-600/12 md:blur-[150px]",
          !reduceMotion ? "hidden md:block animate-[heroFloatXY_11s_ease-in-out_infinite]" : ""
        )}
        style={{ willChange: reduceMotion ? undefined : "transform" }}
      />

      {/* ✨ TOP HIGHLIGHT */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 md:h-40 bg-gradient-to-b from-white/10 to-transparent" />

      {/* 🎞️ GRAIN */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/images/grain.png')] opacity-[0.05]" />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full items-center px-5 sm:px-6 md:px-24">
        <motion.div
          variants={container}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.6 }}
          className="w-full max-w-4xl"
        >
          <motion.div variants={item} className="mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
            <span className="h-[2px] w-10 sm:w-14 bg-gradient-to-r from-purple-300 via-fuchsia-400 to-indigo-300" />
            <span
              className={cn(
                montserrat.className,
                "text-[10px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.45em] text-[rgba(245,244,242,0.68)]"
              )}
            >
              Rouen · Club & Experience
            </span>
          </motion.div>

          <motion.h1
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
              <span className="pointer-events-none absolute -inset-5 md:-inset-6 -z-10 bg-purple-600/16 blur-3xl" />
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className={cn(
              montserrat.className,
              "mt-6 sm:mt-8 md:mt-10 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-[rgba(245,244,242,0.74)]"
            )}
          >
            <span className="italic text-[rgba(245,244,242,0.86)]">The Night Starts Here.</span>
            <br />
            Tables VIP, privatisations exclusives et DJs d’exception — chaque nuit est pensée comme une expérience
            sensorielle, intense et élégante.
          </motion.p>

          <motion.div variants={item} className="mt-10 sm:mt-12 md:mt-14 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5">
            <a
              href="/reservation"
              className={cn(
                montserrat.className,
                "group relative inline-flex items-center justify-center",
                "w-full sm:w-auto rounded-full px-8 sm:px-10 py-4",
                "text-sm font-semibold uppercase tracking-widest",
                "bg-[#F5F4F2] text-black",
                "transition-transform duration-300 transform-gpu sm:hover:-translate-y-0.5"
              )}
            >
              <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-70 bg-purple-500/25" />
              <span className="relative">Réserver</span>
            </a>

            <a
              href="#events"
              className={cn(
                montserrat.className,
                "group relative inline-flex items-center justify-center sm:justify-start gap-3",
                "w-full sm:w-auto rounded-full px-3 py-4",
                "text-sm uppercase tracking-widest text-[#F5F4F2]"
              )}
            >
              Événements
              <span className="opacity-70 transition-all duration-500 group-hover:translate-x-2 group-hover:opacity-100">→</span>
              <span
                className="
                  pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full
                  origin-left scale-x-0
                  bg-gradient-to-r from-purple-300 via-fuchsia-400 to-indigo-300
                  transition-transform duration-500 ease-out
                  group-hover:scale-x-100
                "
              />
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-8 sm:mt-10 flex flex-wrap gap-2 sm:gap-3 text-[11px] sm:text-xs">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 sm:px-4 py-2 text-white/75 backdrop-blur">
              VIP Tables
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 sm:px-4 py-2 text-white/75 backdrop-blur">
              Privatisations
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 sm:px-4 py-2 text-white/75 backdrop-blur">
              DJs & Events
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      {reduceMotion ? (
        <div
          className={cn(
            montserrat.className,
            "absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2",
            "text-[rgba(245,244,242,0.55)] text-[10px] sm:text-xs tracking-[0.28em] sm:tracking-[0.35em]"
          )}
        >
          SCROLL
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ opacity: { delay: 0.8 }, y: { repeat: Infinity, duration: 2.2 } }}
          className={cn(
            montserrat.className,
            "absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2",
            "text-[rgba(245,244,242,0.55)] text-[10px] sm:text-xs tracking-[0.28em] sm:tracking-[0.35em]"
          )}
        >
          SCROLL
        </motion.div>
      )}
    </section>
  );
}