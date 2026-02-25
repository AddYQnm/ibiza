"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ShotgunLuxuryIframe() {
  const [mounted, setMounted] = useState(false);

  // Lazy "réel" : on ne crée l'iframe qu'après montage (et tu peux aller plus loin avec un bouton)
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative bg-black py-20 sm:py-28 lg:py-32 overflow-hidden">
      {/* GLOW AMBIANT */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] sm:h-[600px] sm:w-[600px] rounded-full bg-purple-700/15 blur-[180px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[420px] w-[420px] sm:h-[500px] sm:w-[500px] rounded-full bg-fuchsia-600/15 blur-[200px]" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6"
      >
        {/* IFRAME CONTAINER */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70 backdrop-blur-xl shadow-2xl">
          {/* FADE TOP & BOTTOM */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 sm:h-20 bg-gradient-to-b from-black/70 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-black/70 to-transparent z-10" />

          {/* Skeleton (affiché le temps que l'iframe soit montée) */}
          {!mounted && (
            <div className="h-[70vh] min-h-[520px] max-h-[900px] w-full animate-pulse bg-white/5" />
          )}

          {mounted && (
            <iframe
              src="https://shotgun.live/fr/venues/ibiza-club"
              title="Shotgun - Ibiza Club"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allow="fullscreen; payment; clipboard-write"
              className="w-full h-[80vh] min-h-[560px] max-h-[920px]"
            />
          )}
        </div>
      </motion.div>
    </section>
  );
}