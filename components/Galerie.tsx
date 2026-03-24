"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

export function SkiperGalleryLite() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<HTMLDivElement[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const gallery = galleryRef.current;
    if (!gallery) return;

    let rafId = 0;
    let current = 0;
    let target = 0;

    const speeds = [0.15, 0.35, 0.1, 0.25];

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const update = () => {
      rafId = 0;

      current = lerp(current, target, 0.08);

      colRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.transform = `translate3d(0, ${current * speeds[i]}px, 0)`;
      });

      if (Math.abs(current - target) > 0.1) {
        rafId = requestAnimationFrame(update);
      }
    };

    const onScroll = () => {
      const rect = gallery.getBoundingClientRect();
      const vh = window.innerHeight;

      // progression locale (super important)
      const progress = (vh - rect.top) / (vh + rect.height);

      target = progress * 300; // intensité contrôlée

      if (!rafId) rafId = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
          onScroll();
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { threshold: 0 }
    );

    io.observe(gallery);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  const cols = [
    [IMAGES[0], IMAGES[1], IMAGES[2]],
    [IMAGES[3], IMAGES[4], IMAGES[5]],
    [IMAGES[6], IMAGES[7], IMAGES[8]],
    [IMAGES[7], IMAGES[8], IMAGES[9]],
  ];

  // 📱 MOBILE (inchangé, ultra clean)
  if (isMobile) {
    return (
      <section className="w-full px-3">
        <div className="grid grid-cols-2 gap-3">
          {IMAGES.map((src) => (
            <div
              key={src}
              className="relative aspect-[3/4] overflow-hidden rounded-lg"
            >
              <Image
                src={src}
                alt="Ibiza Club"
                fill
                className="object-cover"
                sizes="50vw"
                quality={60}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 💻 DESKTOP ULTRA SMOOTH
  return (
    <section ref={galleryRef} className="w-full overflow-hidden">
      <div className="flex h-[100vh] gap-[1vw] px-[1vw]">
        {cols.map((images, colIdx) => (
          <div
            key={colIdx}
            ref={(el) => {
              if (el) colRefs.current[colIdx] = el;
            }}
            className="flex flex-col w-1/4 gap-[1vw]"
            style={{ willChange: "transform" }}
          >
            {images.map((src) => (
              <div
                key={src}
                className="relative flex-1 overflow-hidden rounded-lg"
              >
                <Image
                  src={src}
                  alt="Ibiza Club"
                  fill
                  className="object-cover"
                  sizes="25vw"
                  quality={60}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}