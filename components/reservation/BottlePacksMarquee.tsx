"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Pack = {
  id: string;
  title: string;
  price?: string;
  imageSrc: string;
};

export default function BottlePacksMarquee({
  packs,
  speedSeconds = 22,
  reverse = false,
}: {
  packs: Pack[];
  speedSeconds?: number;
  reverse?: boolean;
}) {
  const track = [...packs, ...packs];

  const [hovered, setHovered] = useState<Pack | null>(null);
  const hideTimer = useRef<number | null>(null);

  const show = (p: Pack) => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    setHovered(p);
  };

  const hide = () => {
    // petit délai pour éviter que ça clignote quand on bouge la souris
    hideTimer.current = window.setTimeout(() => setHovered(null), 80);
  };

  return (
    <section className="relative">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-4">
        Packs Bouteilles
      </h2>

      {/* OVERLAY GÉANT (image seule) */}
      <div
        className={[
          "fixed inset-0 z-[60] pointer-events-none transition-opacity duration-200",
          hovered ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        {/* léger voile + blur */}
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

        {/* image pop-out */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div
            className={[
              "relative w-[92vw] max-w-4xl",
              "aspect-[4/3] sm:aspect-[16/10]",
              "rounded-3xl overflow-hidden",
              "border border-white/15",
              "shadow-[0_30px_120px_rgba(0,0,0,0.85)]",
              "transform transition-transform duration-200 ease-out",
              hovered ? "scale-100" : "scale-95",
            ].join(" ")}
          >
            {hovered && (
              <Image
                src={hovered.imageSrc}
                alt={hovered.title}
                fill
                className="object-cover"
                priority
              />
            )}

            {/* petit dégradé pour donner du relief (sans texte) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
          </div>
        </div>
      </div>

      {/* BANDE */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/80 to-transparent z-10" />

        <div
          className="flex w-max gap-6 py-6 px-6 will-change-transform hover:[animation-play-state:paused]"
          style={{
            animation: `marquee ${speedSeconds}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {track.map((p, idx) => (
            <div
              key={`${p.id}-${idx}`}
              className="shrink-0"
              onMouseEnter={() => show(p)}
              onMouseLeave={hide}
            >
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                {/* mini image dans la bande */}
                <div className="relative h-20 w-20 rounded-xl overflow-hidden border border-white/10 bg-black/50">
                  <Image src={p.imageSrc} alt={p.title} fill className="object-cover" />
                </div>

                {/* texte (reste fixe, ne pop pas) */}
                <div className="min-w-[180px]">
                  <div className="text-white font-medium leading-tight">{p.title}</div>
                  {p.price ? (
                    <div className="text-white/60 text-sm mt-1">{p.price}</div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
