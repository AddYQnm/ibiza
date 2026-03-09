"use client";

import { motion, useReducedMotion, easeInOut } from "framer-motion";

const montserratClass = "font-montserrat";

export default function EventHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-black h-[100dvh] md:h-screen">
      {/* 🌌 BACKGROUND (mobile: statique + moins de blur) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Mobile lightweight blobs */}
        <div className="md:hidden absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-purple-700/18 blur-[110px]" />
        <div className="md:hidden absolute top-[34%] left-[10%] h-[320px] w-[320px] rounded-full bg-fuchsia-600/12 blur-[110px]" />

        {/* Desktop animated blobs (GPU transform only) */}
        {!reduceMotion && (
          <>
            <motion.div
              className="hidden md:block absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-purple-700/20 blur-[150px] transform-gpu"
              animate={{ y: [0, 18, 0] }}
              transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
              style={{ willChange: "transform" }}
            />
            <motion.div
              className="hidden md:block absolute top-1/3 left-1/4 h-[520px] w-[520px] rounded-full bg-fuchsia-600/14 blur-[160px] transform-gpu"
              animate={{ x: [0, 16, 0], y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              style={{ willChange: "transform" }}
            />
          </>
        )}

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_60%)]" />
      </div>

      {/* 🎥 GRAIN (sur mobile un poil moins fort) */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/images/grain.png')] opacity-[0.04] md:opacity-[0.06]" />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full items-center px-6">
        <div className="mx-auto max-w-6xl text-left">
          {/* EYEBROW */}
             <motion.div
                        {...fadeUp(!!reduceMotion, 0)}
                        className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4"
                      >
                        <span className="h-[2px] w-10 bg-gradient-to-r from-[#8F72FF] via-[#E05BAA] to-[#B89CFF] sm:w-14" />
                        <span
                          className={`${montserratClass} text-[10px] uppercase tracking-[0.28em] text-white/65 sm:text-xs sm:tracking-[0.45em]`}
                        >
                          Ibiza Club • Événements
                        </span>
                      </motion.div>

          {/* TITLE */}
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="text-[clamp(2.6rem,9vw,7rem)] font-extrabold leading-[0.95] tracking-tight text-white"
          >
            Le meilleur <br />
            <span className="relative inline-block">
              des soirées <br /> à Rouen
              {/* Glow plus léger sur mobile */}
              <span className="pointer-events-none absolute -inset-2 -z-10 bg-purple-600/16 blur-xl md:bg-purple-600/22" />
            </span>
          </motion.h1>

          {/* TEXT */}
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="mt-8 sm:mt-10 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed"
          >
            Chaque événement à l’Ibiza Club est une immersion sonore et visuelle.
            DJs invités, scénographies lumineuses et énergie brute pour vivre la
            nuit autrement.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-10 sm:mt-14 flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            <a
              href="#events"
              className="
                w-full sm:w-auto
                rounded-full bg-white px-8 py-4
                text-sm font-semibold uppercase tracking-wider text-black
                transition
                hover:bg-purple-600 hover:text-white
                transform-gpu
              "
            >
              Voir les événements
            </a>

            <a
              href="/reservation"
              className="
                w-full sm:w-auto
                rounded-full border border-white/30 px-8 py-4
                text-sm uppercase tracking-wider text-white
                transition
                hover:border-purple-500 hover:text-purple-300
                transform-gpu
              "
            >
              Réserver une table
            </a>
          </motion.div>
        </div>
      </div>

      {/* ⬇️ SCROLL (désactivé si reduceMotion + plus léger sur mobile) */}
      {!reduceMotion && (
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 text-white/55 text-[10px] md:text-xs tracking-widest"
          style={{ willChange: "transform" }}
        >
          SCROLL
        </motion.div>
      )}
    </section>
  );
}

function fadeUp(reduceMotion: boolean, delay: number) {
  return {
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: reduceMotion ? undefined : { opacity: 1, y: 0 },
    transition: { delay, duration: 0.65, ease: easeInOut },
  };
}
