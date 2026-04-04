import Image from "next/image";

const HERO_VIDEO_ID  = "v32QmlMitrA";
const SHORT_VIDEO_ID = "Dcg_KYSP-HI";

// ─── YouTube iframe — needs client only to avoid hydration mismatch ──────────
// We use a plain <iframe> inside a Server Component is fine in Next.js App Router
// as long as we don't access window/document at render time. The iframe itself
// is static HTML; the browser handles it.

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

function YoutubeShortCard({ videoId, title }: { videoId: string; title: string }) {
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

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SpeakeasyPageClient() {
  return (
    <div className="overflow-x-hidden bg-[#09070d] text-white">

      {/* ── HERO — full viewport, video fills everything ──────────────────── */}
      <section
        className="relative isolate h-screen w-full overflow-hidden bg-black"
        aria-label="Speakeasy — Hero"
      >
        {/* Video background */}
        <YoutubeBackground videoId={HERO_VIDEO_ID} />

        {/* Overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09070d] via-black/45 to-black/20" />
        <div className="pointer-events-none absolute inset-0 bg-black/50 [mask-image:radial-gradient(60%_55%_at_50%_45%,black,transparent)]" />

        {/* CSS blobs */}
        <div className="pointer-events-none absolute left-1/2 top-[-90px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#5B2EFF]/20 blur-[100px]" />
        <div className="pointer-events-none absolute left-[12%] top-[28%] h-[420px] w-[420px] rounded-full bg-[#E05BAA]/14 blur-[100px]" />
        <div className="pointer-events-none absolute inset-0 bg-[url('/images/grain.png')] opacity-[0.05]" />

        {/* Content — vertically centered */}
        <div className="relative z-10 flex h-full flex-col items-start justify-center px-6 md:px-24">
          <div className="max-w-4xl">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-[2px] w-14 bg-gradient-to-r from-[#8F72FF] via-[#E05BAA] to-[#B89CFF]" />
              <span className="text-xs uppercase tracking-[0.45em] text-white/65">
                Rouen · Speakeasy Experience
              </span>
            </div>

            <h1 className="text-[clamp(3.5rem,11vw,7rem)] font-black leading-[0.90] text-[#F5F4F2]">
              Speakeasy
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/74 md:text-xl">
              <span className="italic text-white/90">Hidden above the noise.</span>
              <br />
              Caché au premier étage de l'Ibiza Club, le Speakeasy est un sanctuaire nocturne
              réservé aux amateurs d'expériences confidentielles.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-5">
              <a
                href="/reservation"
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#5B2EFF] to-[#E05BAA] px-12 py-4 text-sm font-medium uppercase tracking-widest text-white transition-transform duration-200 hover:scale-[1.03] sm:w-auto"
              >
                Réserver une table
              </a>
              <a
                href="#ambiance"
                className="inline-flex w-full items-center justify-center gap-3 rounded-full px-3 py-4 text-sm uppercase tracking-widest text-[#F5F4F2] sm:w-auto"
              >
                Découvrir l'ambiance
                <span className="opacity-70">→</span>
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-2 text-xs">
              {["Cocktails Signature", "Accès Réservé", "Ambiance Exclusive"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/75 backdrop-blur"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] tracking-[0.28em] text-white/55 sm:text-xs">
          SCROLL
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-20 text-center sm:py-24 md:px-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 top-8 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[#5B2EFF]/16 blur-[110px]" />
          <div className="absolute bottom-[-40px] right-[20%] h-[240px] w-[240px] rounded-full bg-[#E05BAA]/12 blur-[110px]" />
        </div>

        <h2 className="relative z-10 mb-5 text-3xl font-bold sm:mb-6 sm:text-4xl md:text-5xl">
          Une nuit magnétique
        </h2>

        <p className="relative z-10 mx-auto max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
          Le Speakeasy révèle une autre facette de la nuit : plus intime, plus sensuelle,
          résolument exclusive.
        </p>

        <div className="relative z-10 mt-10 sm:mt-12">
          <a
            href="/reservation"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#5B2EFF] to-[#E05BAA] px-10 py-4 font-medium tracking-wide text-white transition-transform hover:scale-[1.03] sm:px-12"
          >
            Réserver une table
          </a>
        </div>
      </section>

      {/* ── PHOTOS ───────────────────────────────────────────────────────── */}
      <section
        id="ambiance"
        className="px-6 py-16 sm:py-20 md:px-24"
        aria-label="Galerie Speakeasy"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {[
            "/images/speakeazy/1.png",
            "/images/speakeazy/2.png",
            "/images/speakeazy/3.png",
          ].map((src, i) => (
            <div
              key={src}
              className="group relative h-[320px] overflow-hidden rounded-3xl sm:h-[380px] md:h-[440px]"
            >
              <Image
                src={src}
                alt={`Speakeasy Ibiza Club Rouen — photo ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={i === 0}
                quality={80}
                className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09070d]/70 via-transparent to-transparent opacity-90" />
            </div>
          ))}
        </div>
      </section>

      {/* ── AMBIANCE + VIDEO ─────────────────────────────────────────────── */}
      <section
        id="videos"
        className="relative overflow-hidden px-6 py-20 sm:py-24 md:px-24"
        aria-label="Ambiance vidéo"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-[12%] top-[15%] h-[260px] w-[260px] rounded-full bg-[#5B2EFF]/12 blur-[120px]" />
          <div className="absolute bottom-[5%] right-[10%] h-[260px] w-[260px] rounded-full bg-[#E05BAA]/10 blur-[120px]" />
        </div>

        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <span className="h-[2px] w-14 bg-gradient-to-r from-[#8F72FF] via-[#E05BAA] to-[#B89CFF]" />
              <span className="text-xs uppercase tracking-[0.45em] text-white/65">
                Rouen · Speakeasy Experience
              </span>
            </div>

            <h2 className="text-[clamp(2rem,7vw,4.5rem)] font-black leading-[0.92] text-[#F5F4F2]">
              Une atmosphère secrète
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
              Pensé comme un refuge nocturne, le Speakeasy mêle lumières tamisées, matières nobles
              et musique envoûtante.
            </p>

            <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <p className="text-sm uppercase tracking-[0.28em] text-white/50">Expérience</p>
              <p className="mt-4 max-w-xl leading-relaxed text-white/75">
                Entre matières sombres, reflets subtils et énergie nocturne, l'expérience devient
                plus intime, plus élégante, plus secrète.
              </p>
            </div>
          </div>

          <YoutubeShortCard videoId={SHORT_VIDEO_ID} title="Speakeasy Ibiza Club Rouen" />
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-24 text-center sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09070d] via-[#09070d]/90 to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-[-96px] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#5B2EFF]/16 blur-[120px]" aria-hidden="true" />
        <div className="pointer-events-none absolute right-1/4 top-8 h-[420px] w-[420px] rounded-full bg-[#E05BAA]/12 blur-[120px]" aria-hidden="true" />

        <div className="relative z-10">
          <h2 className="mb-8 text-2xl font-bold sm:text-3xl md:text-4xl">
            Accès sur réservation uniquement
          </h2>

          <a
            href="/reservation"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#5B2EFF] to-[#E05BAA] px-10 py-4 font-medium tracking-wide text-white shadow-[0_0_30px_rgba(91,46,255,0.22)] transition-all hover:scale-[1.03] hover:shadow-[0_0_45px_rgba(224,91,170,0.35)] sm:px-14 sm:py-5"
          >
            Réserver maintenant
          </a>
        </div>
      </section>

    </div>
  );
}