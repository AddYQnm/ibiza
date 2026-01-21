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

export default function HeroVideoImmersive() {
  return (
    <section className="relative z-20 h-screen w-full overflow-hidden bg-black">
      {/* 🎥 VIDEO */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/ibiza.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* 🌑 CINEMATIC OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

      {/* 💜 LIGHT BLOOM */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full bg-purple-700/25 blur-[180px]" />
      <div className="absolute top-1/3 left-1/4 h-[500px] w-[500px] rounded-full bg-fuchsia-600/15 blur-[200px]" />

      {/* 🎞️ GRAIN */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/images/grain.png')] opacity-[0.04]" />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full items-center px-6 md:px-24">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${montserrat.className} mb-6 block text-xs uppercase tracking-[0.45em] text-[rgba(245,244,242,0.6)]`}
          >
            Rouen · Club & Experience
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={`${playfair.className} text-[clamp(3.5rem,7vw,6.5rem)] font-black leading-[0.95] text-[#F5F4F2]`}
          >
            Ibiza
            <br />
            <span className="relative inline-block">
              Club
              <span className="absolute -inset-4 -z-10 bg-purple-600/20 blur-2xl" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className={`${montserrat.className} mt-10 max-w-xl text-lg leading-relaxed text-[rgba(245,244,242,0.7)]`}
          >
            <span className="italic">The Night Starts Here.</span>
            <br />
            Tables VIP, privatisations exclusives et DJs d’exception.
            Chaque nuit est pensée comme une expérience sensorielle,
            intense et élégante.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-14 flex gap-6"
          >
            <a
              href="#reservation"
              className={`${montserrat.className} rounded-full bg-[#F5F4F2] px-10 py-4 text-sm font-semibold uppercase tracking-widest text-black transition hover:bg-purple-600 hover:text-white`}
            >
              Réserver
            </a>

            <a
              href="#events"
              className={`${montserrat.className} rounded-full border border-[rgba(245,244,242,0.3)] px-10 py-4 text-sm uppercase tracking-widest text-[#F5F4F2] hover:border-purple-500 hover:text-purple-400 transition`}
            >
              Événements
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[rgba(245,244,242,0.5)] text-xs tracking-[0.3em]"
      >
        SCROLL
      </motion.div>
    </section>
  );
}
