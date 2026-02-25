"use client";

import { motion, useReducedMotion } from "framer-motion";
import TextVideoSection from "@/components/TextVideoSection";
import Image from "next/image";
import SpeakeasyHero from "@/components/SpeakeasyHero";

const fadeUp = (reduce: boolean, delay = 0) => ({
  initial: reduce ? false : { opacity: 0, y: 16 },
  whileInView: reduce ? undefined : { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.55, ease: "easeOut" as const, delay },
});

export default function SpeakeasyPageClient() {
  const reduceMotion = useReducedMotion();

  // ⚠️ Remplace par tes vraies classes font (idéalement passées depuis un Server component)
  const playfairClass = "playfair";
  const montserratClass = "montserrat";

  return (
    <main className="overflow-x-hidden -mt-[53px]">
      {/* ================= HERO ================= */}
      <SpeakeasyHero
        backgroundVideo={{
          mp4: "https://res.cloudinary.com/dba299maa/video/upload/f_auto,q_auto/v1771904303/2_aiffkh.mp4",
          poster: "/images/speakeazy/hero-poster.png",
        }}
        title="Speakeasy"
        description={`Caché au premier étage de l’Ibiza Club, le Speakeasy
est un sanctuaire nocturne réservé aux amateurs d’expériences
confidentielles.`}
      />

      {/* ================= INTRO / CTA ================= */}
      <section className="relative py-20 sm:py-24 px-6 md:px-24 text-center overflow-hidden">
        {/* ✅ Background glow: plus léger sur mobile */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-8 left-1/2 -translate-x-1/2 h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] rounded-full bg-[#5B2EFF]/16 blur-[110px] sm:blur-[140px] md:blur-[160px]" />
          <div className="absolute -bottom-10 right-[20%] h-[240px] w-[240px] sm:h-[280px] sm:w-[280px] rounded-full bg-[#E05BAA]/12 blur-[110px] sm:blur-[140px] md:blur-[160px]" />
        </div>

        <motion.h2
          {...fadeUp(!!reduceMotion, 0)}
          className={`${playfairClass} text-3xl sm:text-4xl md:text-5xl mb-5 sm:mb-6`}
        >
          Une nuit magnétique
        </motion.h2>

        <motion.p
          {...fadeUp(!!reduceMotion, 0.06)}
          className={`${montserratClass} max-w-2xl mx-auto text-white/70 text-base sm:text-lg leading-relaxed`}
        >
          Le Speakeasy révèle une autre facette de la nuit : plus intime, plus
          sensuelle, résolument exclusive.
        </motion.p>

        <motion.div {...fadeUp(!!reduceMotion, 0.12)} className="mt-10 sm:mt-12">
          <a
            href="/reservation"
            className={`${montserratClass}
              inline-flex items-center justify-center
              px-10 sm:px-12 py-4 rounded-full
              bg-gradient-to-r from-[#5B2EFF] to-[#E05BAA]
              text-white font-medium tracking-wide
              transition-transform transform-gpu
              ${reduceMotion ? "" : "hover:scale-[1.03]"}
            `}
          >
            Réserver une table
          </a>
        </motion.div>
      </section>

     {/* ================= GALLERY ================= */}
<section className="py-20 sm:py-24 px-6 md:px-24">
  <motion.div
    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
  >
    {[
      "/images/speakeazy/1.png",
      "/images/speakeazy/2.png",
      "/images/speakeazy/3.png",
    ].map((src, i) => (
      <div
        key={src}
        className="
          relative overflow-hidden rounded-3xl group
          h-[320px] sm:h-[380px] md:h-[440px]
          transform-gpu
        "
      >
        <Image
          src={src}
          alt="Speakeasy Ibiza"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
          priority={i === 0}
          quality={80}
          className={`
            object-cover transform-gpu
            transition-transform duration-700 ease-out
            ${reduceMotion ? "" : "md:group-hover:scale-[1.06]"} 
          `}
          // ✅ si tu peux, ajoute un blur placeholder (voir note)
          // placeholder="blur"
          // blurDataURL="data:image/svg+xml;base64,..."
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09070d]/70 via-transparent to-transparent opacity-90" />

        {/* optionnel: petit shine léger au hover desktop */}
        {!reduceMotion && (
          <div
            className="
              pointer-events-none absolute inset-0 opacity-0
              md:group-hover:opacity-100 transition-opacity duration-500
              bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_45%)]
            "
          />
        )}
      </div>
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
        videoSrc="https://res.cloudinary.com/dba299maa/video/upload/f_auto,q_auto/v1771903983/Speak_sh8fmo.mp4"
        // ✅ si ton composant le supporte, passe aussi poster
        // poster="/images/speakeazy/video-poster.jpg"
      />

      {/* ================= FINAL CTA ================= */}
      <section className="relative py-24 sm:py-32 text-center px-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09070d] via-[#09070d]/90 to-transparent" />

        {/* ✅ glows plus légers sur mobile */}
        <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 h-[420px] w-[420px] sm:h-[520px] sm:w-[520px] rounded-full bg-[#5B2EFF]/16 blur-[120px] sm:blur-[160px] md:blur-[180px]" />
        <div className="pointer-events-none absolute top-8 sm:top-10 right-[12%] sm:right-1/4 h-[320px] w-[320px] sm:h-[420px] sm:w-[420px] rounded-full bg-[#E05BAA]/12 blur-[120px] sm:blur-[160px] md:blur-[180px]" />

        <div className="relative z-10">
          <motion.h3
            {...fadeUp(!!reduceMotion, 0)}
            className={`${playfairClass} text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8`}
          >
            Accès sur réservation uniquement
          </motion.h3>

          <motion.a
            href="/reservation"
            {...fadeUp(!!reduceMotion, 0.08)}
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.99 }}
            className={`${montserratClass}
              inline-flex items-center justify-center
              px-10 sm:px-14 py-4 sm:py-5 rounded-full
              bg-gradient-to-r from-[#5B2EFF] to-[#E05BAA]
              text-white font-medium tracking-wide
              shadow-[0_0_30px_rgba(91,46,255,0.22)]
              hover:shadow-[0_0_45px_rgba(224,91,170,0.35)]
              transition-transform transform-gpu
            `}
          >
            Réserver maintenant
          </motion.a>
        </div>
      </section>
    </main>
  );
}