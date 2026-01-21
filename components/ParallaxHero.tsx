"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function ParallaxHero() {
  const { scrollY } = useScroll();

  // Parallax layers
  const videoY = useTransform(scrollY, [0, 500], ["0%", "-15%"]);
  const textY = useTransform(scrollY, [0, 500], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollY, [0, 300], [0.6, 0.9]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <motion.video
        style={{ y: videoY }}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </motion.video>

      {/* Overlay Gradient */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black/60"
      />

      {/* Hero Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-6"
      >
        <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tight">
          Ibiza Club Rouen
        </h1>
        <p className="mt-4 text-2xl opacity-90">
          Discothèque & Speakeasy – Vibes internationales
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/reservation"
            className="px-8 py-3 bg-white text-black font-semibold uppercase hover:bg-opacity-80 transition"
          >
            Réserver
          </Link>

          <Link
            href="/prevente"
            className="px-8 py-3 border border-white uppercase hover:bg-white hover:text-black transition"
          >
            Shotgun
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
