"use client";

import { motion } from "framer-motion";

export default function EditorialSection() {
  return (
    <section className="relative py-32 overflow-hidden bg-black">

      {/* BACKGROUND GLOW – SUBTLE & PREMIUM */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-purple-900 via-pink-900 to-black opacity-25 blur-3xl"
        animate={{ opacity: [0.22, 0.32, 0.22] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-left">

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 text-5xl md:text-7xl font-extrabold tracking-tight text-white"
        >
          Ibiza Club
        </motion.h2>

        {/* TEXT */}
        <motion.div
          className="space-y-6 text-white/80 text-base md:text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
        >
          <p>
            Bienvenue à <strong className="text-white">Ibiza Club Rouen</strong>,
            un complexe nocturne unique sur deux étages.
            Au rez-de-chaussée, plonge dans l’énergie des DJ sets enflammés,
            tandis qu’au premier étage, découvre l’ambiance intimiste et exclusive du Speakeasy.
          </p>

          <p>
            Réserve ta table VIP pour des soirées mémorables chaque week-end
            ou privatise le Speakeasy pour tes événements exclusifs.
          </p>

          <p>
            Ibiza Club est l’endroit idéal pour décompresser après la semaine
            et profiter d’une atmosphère chaleureuse, élégante et festive.
          </p>

          <p className="text-white font-medium">
            Vivez une expérience inoubliable au cœur de Rouen.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="rounded-full border border-white/20 bg-white/5 px-10 py-4 text-sm font-semibold uppercase tracking-widest text-white backdrop-blur-md transition hover:bg-white/10 hover:border-white/40">
            Réserver une table
          </button>
        </motion.div>

      </div>
    </section>
  );
}
