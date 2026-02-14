"use client";

import { motion } from "framer-motion";

interface TextVideoSectionProps {
  title: string;
  description: string;
  videoSrc: string;
}

export default function TextVideoSection({
  title,
  description,
  videoSrc,
}: TextVideoSectionProps) {
  return (
    // ✅ relative/isolate pour éviter que les overlays d'ailleurs passent au-dessus
    <section className="relative isolate w-full max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* TEXTE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.35 }} // ✅ plus stable au scroll
          className="relative z-10" // ✅ garantit que le texte reste au-dessus
        >
          <h2 className="text-4xl font-bold mb-4 text-white">{title}</h2>
          <p className="text-lg text-white/70 leading-relaxed">{description}</p>
        </motion.div>

        {/* VIDEO */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, amount: 0.35 }}
          className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
        >
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover aspect-video lg:aspect-[9/16]"
          />
        </motion.div>
      </div>
    </section>
  );
}
