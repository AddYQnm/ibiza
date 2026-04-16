"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const IMAGES = [
  "/images/photo/A22A6636.jpeg",
  "/images/photo/A22A6709.jpeg",
  "/images/photo/A22A6810.jpeg",
  "/images/photo/A22A6817.jpeg",
  "/images/photo/A22A6829.jpeg",
  "/images/photo/A22A6848.jpeg",
  "/images/photo/A22A6888.jpeg",
  "/images/photo/A22A6904.jpeg",
  "/images/photo/A22A6907.jpeg",
  "/images/photo/A22A6909.jpeg",
];

export function SkiperGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Détecte la photo visible via IntersectionObserver
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setActiveIndex(index);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    const slides = container.querySelectorAll("[data-index]");
    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const slide = container.querySelector<HTMLElement>(`[data-index="${index}"]`);
    slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section className="w-full py-6">

      {/* ── Mobile : carousel plein-largeur avec snap ── */}
      <div className="block md:hidden relative">

        {/* Compteur */}
        <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-sm text-white/90 text-xs font-medium px-2.5 py-1 rounded-full">
          {activeIndex + 1} / {IMAGES.length}
        </div>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-2 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {IMAGES.map((src, i) => (
            <div
              key={`${src}-${i}`}
              data-index={i}
              className="flex-none snap-center w-[85vw] rounded-2xl overflow-hidden bg-zinc-900 relative"
              style={{ aspectRatio: "3/4" }}
            >
              <Image
                src={src}
                alt={`Ibiza Club Rouen - photo ${i + 1}`}
                fill
                className="object-cover"
                sizes="85vw"
                quality={75}
                priority={i < 2}
                loading={i < 2 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Dots de navigation */}
        <div className="flex justify-center gap-1.5 mt-3 px-4">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Aller à la photo ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-5 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Desktop : masonry classique ── */}
      <div className="hidden md:block px-4">
        <div className="columns-3 lg:columns-4 gap-3 space-y-3">
          {IMAGES.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative break-inside-avoid overflow-hidden rounded-xl bg-zinc-900"
            >
              <Image
                src={src}
                alt={`Ibiza Club Rouen - photo ${i + 1}`}
                width={600}
                height={900}
                className="w-full h-auto block hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 33vw, 25vw"
                quality={70}
                priority={i < 2}
                loading={i < 2 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}