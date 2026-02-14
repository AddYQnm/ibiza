
"use client";

import { motion, useReducedMotion } from "framer-motion";
import TextVideoSection from "@/components/TextVideoSection";
import Image from "next/image";
import SpeakeasyHero from "@/components/SpeakeasyHero";
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "900"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600"] });

export default function SpeakeasyPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="overflow-x-hidden">
      {/* ================= HERO ================= */}
      <SpeakeasyHero
        backgroundVideo={{
          mp4: "/videos/2.mp4",
          webm: "/videos/2.webm",
          poster: "/images/speakeazy/hero-poster.png",
        }}
        title="Speakeasy"
        description={`Caché au premier étage de l’Ibiza Club, le Speakeasy
est un sanctuaire nocturne réservé aux amateurs d’expériences
confidentielles.`}
      />

      {/* ================= INTRO / CTA ================= */}
      <section className=" relative py-24 px-6 md:px-24 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 h-[320px] w-[320px] rounded-full bg-[#5B2EFF]/20 blur-[160px]" />
          <div className="absolute bottom-0 right-1/3 h-[280px] w-[280px] rounded-full bg-[#E05BAA]/15 blur-[160px]" />
        </div>

        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className={`${playfair.className} text-4xl md:text-5xl mb-6`}
        >
          Une nuit magnétique
        </motion.h2>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className={`${montserrat.className} max-w-2xl mx-auto text-white/70 text-lg leading-relaxed`}
        >
          Le Speakeasy révèle une autre facette de la nuit : plus intime, plus
          sensuelle, résolument exclusive.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-12"
        >
          <a
            href="/reservation"
            className={`${montserrat.className}
              inline-flex items-center justify-center
              px-12 py-4 rounded-full
              bg-gradient-to-r from-[#5B2EFF] to-[#E05BAA]
              text-white font-medium tracking-wide
              transition
              ${reduceMotion ? "" : "hover:scale-105 hover:shadow-[0_0_40px_rgba(224,91,170,0.4)]"}
            `}
          >
            Réserver une table
          </a>
        </motion.div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="py-24 px-6 md:px-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            "/images/speakeazy/1.png",
            "/images/speakeazy/2.png",
            "/images/speakeazy/3.png",
          ].map((src, i) => (
            <motion.div
              key={src}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              className="relative h-[440px] overflow-hidden rounded-3xl group"
            >
              <Image
                src={src}
                alt="Speakeasy Ibiza"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                priority={i === 0}
                className={`object-cover transition-transform duration-700 ${
                  reduceMotion ? "" : "group-hover:scale-110"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09070d]/70 via-transparent to-transparent opacity-90" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= VIDEO SECTION ================= */}
      <TextVideoSection
        title="Une atmosphère secrète"
        description={`Pensé comme un refuge nocturne, le Speakeasy mêle
lumières tamisées, matières nobles et musique envoûtante.
Chaque détail a été conçu pour créer une expérience immersive
et confidentielle.`}
        videoSrc="/videos/Speak.mp4"
      />

      {/* ================= FINAL CTA ================= */}
      <section className="relative py-32 text-center px-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09070d] via-[#09070d]/90 to-transparent" />

        <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-[#5B2EFF]/20 blur-[180px]" />
        <div className="pointer-events-none absolute top-10 right-1/4 h-[420px] w-[420px] rounded-full bg-[#E05BAA]/15 blur-[180px]" />

        <div className="relative z-10">
          <motion.h3
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className={`${playfair.className} text-3xl md:text-4xl mb-8`}
          >
            Accès sur réservation uniquement
          </motion.h3>

          <motion.a
            href="/reservation"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            whileHover={reduceMotion ? undefined : { scale: 1.06 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            className={`${montserrat.className}
              inline-flex items-center justify-center
              px-14 py-5 rounded-full
              bg-gradient-to-r from-[#5B2EFF] to-[#E05BAA]
              text-white font-medium tracking-wide
              shadow-[0_0_40px_rgba(91,46,255,0.25)]
              hover:shadow-[0_0_55px_rgba(224,91,170,0.40)]
              transition
            `}
          >
            Réserver maintenant
          </motion.a>
        </div>
      </section>
    </main>
  );
}  