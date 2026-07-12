"use client";

import Image from "next/image";
import { useRef, useState } from "react";

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

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const slideWidth = container.firstElementChild?.clientWidth ?? 1;
    const gap = 8; // gap-2 = 8px

    const index = Math.round(container.scrollLeft / (slideWidth + gap));

    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const scrollTo = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const slide = container.children[index] as HTMLElement;

    container.scrollTo({
      left: slide.offsetLeft - 16,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-6">
      {/* MOBILE */}
      <div className="block md:hidden relative">
        <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {activeIndex + 1} / {IMAGES.length}
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-2 px-4 scroll-smooth scrollbar-hide"
        >
          {IMAGES.map((src, i) => (
            <div
              key={src}
              className="relative flex-none w-[85vw] snap-center overflow-hidden rounded-2xl bg-zinc-900"
              style={{ aspectRatio: "3 / 4" }}
            >
              <Image
                src={src}
                alt={`Ibiza Club Rouen - photo ${i + 1}`}
                fill
                className="object-cover"
                sizes="85vw"
                quality={55}
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        <div className="mt-3 flex justify-center gap-2">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Photo ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === i
                  ? "w-5 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block px-4">
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
          {IMAGES.map((src, i) => (
            <div
              key={src}
              className="overflow-hidden rounded-xl bg-zinc-900"
            >
              <Image
                src={src}
                alt={`Ibiza Club Rouen - photo ${i + 1}`}
                width={600}
                height={900}
                className="block w-full h-auto"
                sizes="(max-width:1024px) 33vw, 25vw"
                quality={55}
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}