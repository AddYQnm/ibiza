"use client";

import { motion } from "framer-motion";

export default function EventHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">

      {/* 🌌 BACKGROUND LIGHT PORTAL */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-purple-700/30 blur-[160px] animate-pulse-slow" />
        <div className="absolute top-1/3 left-1/4 h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[180px] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_60%)]" />
      </div>

      {/* 🎥 GRAIN / FILM TEXTURE */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/images/grain.png')] opacity-[0.05]" />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full items-center px-6">
        <div className="mx-auto max-w-6xl text-left">

          {/* EYEBROW */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="block mb-6 text-sm uppercase tracking-[0.35em] text-white/60"
          >
            Ibiza Club • Événements
          </motion.span>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[clamp(3rem,7vw,7rem)] font-extrabold leading-[0.95] tracking-tight text-white"
          >
            The Night <br />
            <span className="relative inline-block">
              Starts Here
              <span className="absolute -inset-2 bg-purple-600/20 blur-xl" />
            </span>
          </motion.h1>

          {/* TEXT */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-10 max-w-xl text-lg text-white/70 leading-relaxed"
          >
            Chaque événement à l’Ibiza Club est une immersion sonore et visuelle.
            DJs invités, scénographies lumineuses et énergie brute
            pour vivre la nuit autrement.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-14 flex gap-6"
          >
            <a
              href="#events"
              className="rounded-full bg-white px-8 py-4 text-sm font-semibold uppercase tracking-wider text-black hover:bg-purple-600 hover:text-white transition"
            >
              Voir les événements
            </a>

            <a
              href="/reservation"
              className="rounded-full border border-white/30 px-8 py-4 text-sm uppercase tracking-wider text-white hover:border-purple-500 hover:text-purple-400 transition"
            >
              Réserver une table
            </a>
          </motion.div>

        </div>
      </div>

      {/* ⬇️ SCROLL */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-widest"
      >
        SCROLL
      </motion.div>

    </section>
  );
}
