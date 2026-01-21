"use client";

import { motion } from "framer-motion";

export default function ShotgunLuxuryIframe() {
  return (
    <section className="relative bg-black py-32 overflow-hidden">

      {/* GLOW AMBIANT */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-black-700/25 blur-[180px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[200px]" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-7xl px-6"
      >
        {/* HEADER */}


        {/* IFRAME CONTAINER */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70 backdrop-blur-xl shadow-2xl">

          {/* FADE TOP & BOTTOM */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent z-10" />

          <iframe
            src="https://shotgun.live/fr/venues/ibiza-club"
            className="w-full min-h-[1100px]"
            loading="lazy"
          />
        </div>
      </motion.div>
    </section>
  );
}
