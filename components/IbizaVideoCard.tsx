"use client";

import { motion } from "framer-motion";
import { FaSpotify, FaInstagram, FaFacebookF } from "react-icons/fa";

export default function IbizaVideoCard() {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* IMAGE BLUR BACKGROUND */}
      <img
        src="/images/ibiza-bg.jpg"
        alt="Ibiza background"
        className="absolute inset-0 h-full w-full object-cover scale-110 blur-2xl opacity-40"
      />

      {/* VIDEO */}
      <video
        src="/videos/ibiza.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* OVERLAYS */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 flex h-full items-end px-6 pb-14 md:pb-24">
        <div className="max-w-6xl w-full mx-auto flex justify-between items-end">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-left"
          >
            <p className="mb-4 text-sm tracking-widest text-white/70">
              IBIZA · CLUB · EXPERIENCE
            </p>

            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">
              Vibration <br />
              <span className="text-purple-400">Ibiza</span>
            </h1>

            <p className="mt-6 max-w-xl text-white/70 text-sm md:text-base">
              Soirées exclusives, DJs internationaux et expériences VIP
              au cœur de la nuit ibizienne.
            </p>

            <div className="mt-10 flex gap-4">
              <button className="rounded-full bg-white px-8 py-4 text-xs md:text-sm font-bold text-black hover:opacity-90 transition">
                Réserver
              </button>

              <button className="rounded-full bg-white/20 backdrop-blur-xl px-8 py-4 text-xs md:text-sm font-semibold tracking-widest text-white border border-white/30 hover:bg-white/30 transition">
                Découvrir
              </button>
            </div>
          </motion.div>

          {/* RIGHT SOCIAL ICONS */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden md:flex flex-col gap-6 items-center"
          >
            {[FaSpotify, FaInstagram, FaFacebookF].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                className="text-white/70 hover:text-white transition text-xl"
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
