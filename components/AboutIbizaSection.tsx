import Image from "next/image";

const IMAGES = [
  "/images/speakeazy/1.png",
  "/images/speakeazy/2.png",
  "/images/speakeazy/3.png",
];

export default function AboutIbizaSection() {
  return (
    <section className="relative isolate w-full overflow-hidden py-20 px-6 md:py-32 md:px-16">

      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-700/30 blur-[120px]" />
        <div className="absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-fuchsia-700/20 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-800/20 blur-[100px]" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 items-start lg:grid-cols-2 lg:gap-20">

        {/* LEFT */}
        <div>
          <div className="mb-6 flex items-center gap-4">
            <span className="h-[2px] w-12 bg-gradient-to-r from-purple-400 to-fuchsia-400" />
            <span className="text-xs uppercase tracking-[0.3em] text-white/70">La privatisation</span>
          </div>

          <h2 className="text-4xl font-extrabold leading-tight text-white md:text-7xl">
            SPEAK <br />
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent">
              EASY
            </span>
          </h2>

          {/* Images grid */}
          <div className="mt-10 grid grid-cols-3 gap-3 md:mt-14 md:gap-4">
            {IMAGES.map((src, i) => (
              <div
                key={src}
                className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-xl"
              >
                <Image
                  src={src}
                  alt={`Ibiza Speakeasy ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 33vw, 220px"
                  priority={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="text-base leading-relaxed text-white/85 md:text-xl">
          <p className="mb-6">
            <strong className="text-white">Le Speakeasy de l'Ibiza Club Rouen</strong> est un lieu
            confidentiel, pensé comme une parenthèse hors du temps. Inspiré des bars clandestins, il
            mélange élégance rétro et énergie nocturne contemporaine.
          </p>

          <p>
            Un éclairage doux, une ambiance feutrée et une atmosphère exclusive font du Speakeasy
            l'espace idéal pour des soirées privées, des moments privilégiés ou une privatisation sur
            mesure.
          </p>

          <div className="mt-10">
            <a
              href="/speakeazy"
              className="group relative inline-block text-sm font-medium tracking-wide text-white/90 md:text-base"
            >
              En savoir plus
              <span className="pointer-events-none absolute left-0 -bottom-2 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}