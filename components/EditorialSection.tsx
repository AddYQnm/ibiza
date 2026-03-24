"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function EditorialSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-28 md:py-32">
      {/* BACKGROUND — CSS-only blobs, zero Framer motion here */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -top-40 left-[-10%] h-[520px] w-[520px] rounded-full bg-purple-600/20 blur-[140px]"
          style={{ animation: reduceMotion ? "none" : "heroFloatXY 14s ease-in-out infinite" }}
        />
        <div
          className="absolute top-32 right-[-10%] h-[560px] w-[560px] rounded-full bg-fuchsia-500/15 blur-[160px]"
          style={{ animation: reduceMotion ? "none" : "heroFloatY 16s ease-in-out infinite reverse" }}
        />
        <div
          className="absolute bottom-[-35%] left-[25%] h-[520px] w-[520px] rounded-full bg-indigo-500/15 blur-[170px]"
          style={{ animation: reduceMotion ? "none" : "heroFloatY 18s ease-in-out infinite" }}
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="h-[2px] w-12 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-300" />
          <span className="text-xs uppercase tracking-[0.35em] text-white/70">L'expérience</span>
        </motion.div>

        {/* Title — h2 for SEO hierarchy */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-10 text-5xl font-extrabold tracking-tight text-white md:text-7xl"
        >
          Ibiza Club{" "}
          <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent">
            Rouen
          </span>
        </motion.h2>

        {/* Body */}
        <motion.div
          className="space-y-6 text-base leading-relaxed text-white/80 md:text-xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
        >
          <p>
            Bienvenue à <strong className="text-white">Ibiza Club Rouen</strong>, un complexe
            nocturne unique sur deux étages. Au rez-de-chaussée, plonge dans l'énergie des DJ sets
            enflammés, tandis qu'au premier étage, découvre l'ambiance intimiste et exclusive du
            Speakeasy.
          </p>
          <p>
            Réserve ta table VIP pour des soirées mémorables chaque week-end ou privatise le
            Speakeasy pour tes événements exclusifs.
          </p>
          <p>
            Ibiza Club est l'endroit idéal pour décompresser après la semaine et profiter d'une
            atmosphère chaleureuse, élégante et festive.
          </p>
          <p className="font-medium text-white">
            Vivez une expérience inoubliable au cœur de Rouen.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.12, ease: "easeOut" }}
        >
          <a
            href="/reservation"
            className="group relative inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-white/90 md:text-base"
          >
            Réserver une table
            <span className="inline-block translate-x-0 opacity-70 transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:opacity-100">
              →
            </span>
            <span className="pointer-events-none absolute left-0 -bottom-2 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
