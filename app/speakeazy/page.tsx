"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const fadeUp = (reduce: boolean, delay = 0) => ({
  initial: reduce ? false : { opacity: 0, y: 16 },
  whileInView: reduce ? undefined : { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.55, ease: "easeOut" as const, delay },
});

const HERO_VIDEO_ID = "v32QmlMitrA";
const SHORT_VIDEO_ID = "Dcg_KYSP-HI";

function YoutubeBackground({ videoId }: { videoId: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <iframe
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120vh] w-[220vw] max-w-none -translate-x-1/2 -translate-y-1/2 md:h-[140vh] md:w-[140vw]"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&disablekb=1`}
        title="Speakeasy background video"
        allow="autoplay; fullscreen; encrypted-media"
        allowFullScreen
      />
    </div>
  );
}

function YoutubeShortCard({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[360px]">
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.38)]">
        <div className="relative aspect-[9/16]">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1&rel=0&playsinline=1`}
            title={title}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default function SpeakeasyPageClient() {
  const reduceMotion = useReducedMotion();

  const playfairClass = "playfair";
  const montserratClass = "montserrat";

  return (
    <main className="overflow-x-hidden -mt-[53px] bg-[#09070d] text-white">
      <section className="relative isolate min-h-[100vh] overflow-hidden bg-black">
        <YoutubeBackground videoId={HERO_VIDEO_ID} />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09070d] via-black/45 to-black/25" />
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_55%_at_50%_45%,black,transparent)] bg-black/60" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/10 to-transparent md:h-40" />

        <div className="pointer-events-none absolute left-1/2 top-[-90px] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[#5B2EFF]/20 blur-[100px] sm:h-[420px] sm:w-[420px] sm:blur-[120px] md:h-[560px] md:w-[560px] md:blur-[140px]" />
        <div className="pointer-events-none absolute left-[12%] top-[28%] h-[240px] w-[240px] rounded-full bg-[#E05BAA]/14 blur-[100px] sm:h-[300px] sm:w-[300px] md:h-[420px] md:w-[420px] md:blur-[140px]" />

        <div className="pointer-events-none absolute inset-0 bg-[url('/images/grain.png')] opacity-[0.05]" />

        <div className="relative z-10 flex min-h-[100vh] items-center px-6 pt-24 pb-12 md:px-24">
          <div className="max-w-4xl">
            <motion.div
              {...fadeUp(!!reduceMotion, 0)}
              className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4"
            >
              <span className="h-[2px] w-10 bg-gradient-to-r from-[#8F72FF] via-[#E05BAA] to-[#B89CFF] sm:w-14" />
              <span
                className={`${montserratClass} text-[10px] uppercase tracking-[0.28em] text-white/65 sm:text-xs sm:tracking-[0.45em]`}
              >
                Rouen · Speakeasy Experience
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(!!reduceMotion, 0.05)}
              className={`${playfairClass} text-[clamp(3rem,10vw,6.5rem)] font-black leading-[0.92] text-[#F5F4F2]`}
            >
              Speakeasy
            </motion.h1>

            <motion.p
              {...fadeUp(!!reduceMotion, 0.1)}
              className={`${montserratClass} mt-6 max-w-2xl text-base leading-relaxed text-white/74 sm:mt-8 sm:text-lg md:mt-10 md:text-xl`}
            >
              <span className="italic text-white/90">
                Hidden above the noise.
              </span>
              <br />
              Caché au premier étage de l’Ibiza Club, le Speakeasy est un
              sanctuaire nocturne réservé aux amateurs d’expériences
              confidentielles.
            </motion.p>

            <motion.div
              {...fadeUp(!!reduceMotion, 0.15)}
              className="mt-10 flex flex-col flex-wrap gap-4 sm:mt-12 sm:flex-row sm:gap-5 md:mt-14"
            >
              <a
                href="/reservation"
                className={`${montserratClass} inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#5B2EFF] to-[#E05BAA] px-10 py-4 text-sm font-medium uppercase tracking-widest text-white transition-transform duration-300 sm:w-auto sm:px-12 ${
                  reduceMotion ? "" : "transform-gpu hover:scale-[1.03]"
                }`}
              >
                Réserver une table
              </a>

              <a
                href="#videos"
                className={`${montserratClass} inline-flex w-full items-center justify-center gap-3 rounded-full px-3 py-4 text-sm uppercase tracking-widest text-[#F5F4F2] sm:w-auto`}
              >
                Découvrir l’ambiance
                <span className="opacity-70 transition-all duration-500">
                  →
                </span>
              </a>
            </motion.div>

            <motion.div
              {...fadeUp(!!reduceMotion, 0.2)}
              className="mt-8 flex flex-wrap gap-2 text-[11px] sm:mt-10 sm:gap-3 sm:text-xs"
            >
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-white/75 backdrop-blur sm:px-4">
                Cocktails Signature
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-white/75 backdrop-blur sm:px-4">
                Accès Réservé
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-white/75 backdrop-blur sm:px-4">
                Ambiance Exclusive
              </span>
            </motion.div>
          </div>
        </div>

        <div
          className={`${montserratClass} absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] tracking-[0.28em] text-white/55 sm:bottom-8 sm:text-xs sm:tracking-[0.35em] md:bottom-10`}
        >
          SCROLL
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20 text-center sm:py-24 md:px-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-8 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[#5B2EFF]/16 blur-[110px] sm:h-[320px] sm:w-[320px] sm:blur-[140px] md:blur-[160px]" />
          <div className="absolute bottom-[-40px] right-[20%] h-[240px] w-[240px] rounded-full bg-[#E05BAA]/12 blur-[110px] sm:h-[280px] sm:w-[280px] sm:blur-[140px] md:blur-[160px]" />
        </div>

        <motion.h2
          {...fadeUp(!!reduceMotion, 0)}
          className={`${playfairClass} relative z-10 mb-5 text-3xl sm:mb-6 sm:text-4xl md:text-5xl`}
        >
          Une nuit magnétique
        </motion.h2>

        <motion.p
          {...fadeUp(!!reduceMotion, 0.06)}
          className={`${montserratClass} relative z-10 mx-auto max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg`}
        >
          Le Speakeasy révèle une autre facette de la nuit : plus intime, plus
          sensuelle, résolument exclusive.
        </motion.p>

        <motion.div
          {...fadeUp(!!reduceMotion, 0.12)}
          className="relative z-10 mt-10 sm:mt-12"
        >
          <a
            href="/reservation"
            className={`${montserratClass} inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#5B2EFF] to-[#E05BAA] px-10 py-4 font-medium tracking-wide text-white transition-transform sm:px-12 ${
              reduceMotion ? "" : "transform-gpu hover:scale-[1.03]"
            }`}
          >
            Réserver une table
          </a>
        </motion.div>
      </section>

      <section className="px-6 -mt-20 py-20 sm:py-24 md:px-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6"
        >
          {[
            "/images/speakeazy/1.png",
            "/images/speakeazy/2.png",
            "/images/speakeazy/3.png",
          ].map((src, i) => (
            <div
              key={src}
              className="group relative h-[320px] overflow-hidden rounded-3xl transform-gpu sm:h-[380px] md:h-[440px]"
            >
              <Image
                src={src}
                alt="Speakeasy Ibiza"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                priority={i === 0}
                quality={80}
                className={`object-cover transition-transform duration-700 ease-out ${
                  reduceMotion ? "" : "transform-gpu md:group-hover:scale-[1.06]"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09070d]/70 via-transparent to-transparent opacity-90" />
              {!reduceMotion && (
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_45%)] opacity-0 transition-opacity duration-500 md:group-hover:opacity-100" />
              )}
            </div>
          ))}
        </motion.div>
      </section>

      <section
        id="videos"
        className="relative overflow-hidden px-6 py-20 sm:py-24 md:px-24"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[12%] top-[15%] h-[260px] w-[260px] rounded-full bg-[#5B2EFF]/12 blur-[120px]" />
          <div className="absolute bottom-[5%] right-[10%] h-[260px] w-[260px] rounded-full bg-[#E05BAA]/10 blur-[120px]" />
        </div>

        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
              <motion.div
              {...fadeUp(!!reduceMotion, 0)}
              className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4"
            >
              <span className="h-[2px] w-10 bg-gradient-to-r from-[#8F72FF] via-[#E05BAA] to-[#B89CFF] sm:w-14" />
              <span
                className={`${montserratClass} text-[10px] uppercase tracking-[0.28em] text-white/65 sm:text-xs sm:tracking-[0.45em]`}
              >
                Rouen · Speakeasy Experience
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(!!reduceMotion, 0.05)}
              className={`${playfairClass} text-[clamp(3rem,10vw,6.5rem)] font-black leading-[0.92] text-[#F5F4F2]`}
            >
              Une atmosphère secrète
            </motion.h1>

            <motion.p
              {...fadeUp(!!reduceMotion, 0.06)}
              className={`${montserratClass} mt-6 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg`}
            >
              Pensé comme un refuge nocturne, le Speakeasy mêle lumières
              tamisées, matières nobles et musique envoûtante. Chaque détail a
              été conçu pour créer une expérience immersive et confidentielle.
            </motion.p>

            <motion.div
              {...fadeUp(!!reduceMotion, 0.1)}
              className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
              <p
                className={`${montserratClass} text-sm uppercase tracking-[0.28em] text-white/50`}
              >
                Expérience
              </p>
              <p
                className={`${montserratClass} mt-4 max-w-xl text-white/75 leading-relaxed`}
              >
Entre matières sombres, reflets subtils et énergie nocturne, l’expérience devient plus intime, plus élégante, plus secrète.
              </p>
            </motion.div>
          </div>

          <motion.div {...fadeUp(!!reduceMotion, 0.14)}>
            <YoutubeShortCard
              videoId={SHORT_VIDEO_ID}
              title="Speakeasy short"
            />
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-24 text-center sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09070d] via-[#09070d]/90 to-transparent" />
        <div className="pointer-events-none absolute bottom-[-96px] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#5B2EFF]/16 blur-[120px] sm:h-[520px] sm:w-[520px] sm:blur-[160px] md:blur-[180px]" />
        <div className="pointer-events-none absolute right-[12%] top-8 h-[320px] w-[320px] rounded-full bg-[#E05BAA]/12 blur-[120px] sm:right-1/4 sm:top-10 sm:h-[420px] sm:w-[420px] sm:blur-[160px] md:blur-[180px]" />

        <div className="relative z-10">
          <motion.h3
            {...fadeUp(!!reduceMotion, 0)}
            className={`${playfairClass} mb-6 text-2xl sm:mb-8 sm:text-3xl md:text-4xl`}
          >
            Accès sur réservation uniquement
          </motion.h3>

          <motion.a
            href="/reservation"
            {...fadeUp(!!reduceMotion, 0.08)}
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.99 }}
            className={`${montserratClass} inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#5B2EFF] to-[#E05BAA] px-10 py-4 font-medium tracking-wide text-white shadow-[0_0_30px_rgba(91,46,255,0.22)] transition-transform hover:shadow-[0_0_45px_rgba(224,91,170,0.35)] sm:px-14 sm:py-5`}
          >
            Réserver maintenant
          </motion.a>
        </div>
      </section>
    </main>
  );
}