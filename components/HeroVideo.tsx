"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Playfair_Display, Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut" as const,
    },
  },
};

const YOUTUBE_ID = "OWmrwtdmHbM";

export default function HeroVideoImmersive() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={cn(
        "relative isolate z-20 w-full overflow-hidden bg-black",
        "min-h-[100vh] h-[100dvh] md:h-[100svh]"
      )}
    >
      {/* 🎥 YOUTUBE BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          className="absolute left-1/2 top-1/2 h-[120vh] w-[220vw] max-w-none -translate-x-1/2 -translate-y-1/2 pointer-events-none md:h-[140vh] md:w-[140vw]"
          src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_ID}&controls=0&modestbranding=1&playsinline=1&rel=0`}
          title="Background video"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>

      {/* OVERLAYS */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_55%_at_50%_45%,black,transparent)] bg-black/60" />

      {/* 💜 BLOOMS */}
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full transform-gpu",
          "-top-44 h-[420px] w-[420px] bg-purple-700/16 blur-[110px]",
          "md:-top-48 md:h-[600px] md:w-[600px] md:bg-purple-700/18 md:blur-[140px]",
          !reduceMotion
            ? "hidden md:block animate-[heroFloatY_10s_ease-in-out_infinite]"
            : ""
        )}
        style={{ willChange: reduceMotion ? undefined : "transform" }}
      />

      <div
        className={cn(
          "pointer-events-none absolute rounded-full transform-gpu",
          "top-[32%] left-[8%] h-[320px] w-[320px] bg-fuchsia-600/10 blur-[115px]",
          "md:top-[28%] md:left-[18%] md:h-[440px] md:w-[440px] md:bg-fuchsia-600/12 md:blur-[150px]",
          !reduceMotion
            ? "hidden md:block animate-[heroFloatXY_11s_ease-in-out_infinite]"
            : ""
        )}
        style={{ willChange: reduceMotion ? undefined : "transform" }}
      />

      {/* ✨ TOP HIGHLIGHT */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/10 to-transparent md:h-40" />

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
          <motion.div
            variants={item}
            className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4"
          >
            <span className="h-[2px] w-10 bg-gradient-to-r from-purple-300 via-fuchsia-400 to-indigo-300 sm:w-14" />
            <span
              className={cn(
                montserrat.className,
                "text-[10px] uppercase tracking-[0.28em] text-[rgba(245,244,242,0.68)] sm:text-xs sm:tracking-[0.45em]"
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
              <span className="pointer-events-none absolute -inset-5 -z-10 bg-purple-600/16 blur-3xl md:-inset-6" />
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className={cn(
              montserrat.className,
              "mt-6 max-w-2xl text-base leading-relaxed text-[rgba(245,244,242,0.74)] sm:mt-8 sm:text-lg md:mt-10 md:text-xl"
            )}
          >
            <span className="italic text-[rgba(245,244,242,0.86)]">
              The Night Starts Here.
            </span>
            <br />
            Tables VIP, privatisations exclusives et DJs d’exception — chaque
            nuit est pensée comme une expérience sensorielle, intense et
            élégante.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col flex-wrap gap-4 sm:mt-12 sm:flex-row sm:gap-5 md:mt-14"
          >
            <a
              href="/reservation"
              className={cn(
                montserrat.className,
                "group relative inline-flex w-full items-center justify-center rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-widest transition-transform duration-300 transform-gpu sm:w-auto sm:px-10 sm:hover:-translate-y-0.5",
                "bg-[#F5F4F2] text-black"
              )}
            >
              <span className="pointer-events-none absolute inset-0 rounded-full bg-purple-500/25 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-70" />
              <span className="relative">Réserver</span>
            </a>

            <a
              href="/events"
              className={cn(
                montserrat.className,
                "group relative inline-flex w-full items-center justify-center gap-3 rounded-full px-3 py-4 text-sm uppercase tracking-widest text-[#F5F4F2] sm:w-auto sm:justify-start"
              )}
            >
              Événements
              <span className="opacity-70 transition-all duration-500 group-hover:translate-x-2 group-hover:opacity-100">
                →
              </span>
              <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-purple-300 via-fuchsia-400 to-indigo-300 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap gap-2 text-[11px] sm:mt-10 sm:gap-3 sm:text-xs"
          >
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-white/75 backdrop-blur sm:px-4">
              VIP Tables
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-white/75 backdrop-blur sm:px-4">
              Privatisations
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-white/75 backdrop-blur sm:px-4">
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
            "absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.28em] text-[rgba(245,244,242,0.55)] sm:bottom-8 sm:text-xs sm:tracking-[0.35em] md:bottom-10"
          )}
        >
          SCROLL
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 0.8 },
            y: { repeat: Infinity, duration: 2.2 },
          }}
          className={cn(
            montserrat.className,
            "absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.28em] text-[rgba(245,244,242,0.55)] sm:bottom-8 sm:text-xs sm:tracking-[0.35em] md:bottom-10"
          )}
        >
          SCROLL
        </motion.div>
      )}
    </section>
  );
}