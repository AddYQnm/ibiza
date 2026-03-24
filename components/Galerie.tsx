"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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

function usePrefersReducedMotionRef() {
  const ref = useRef(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { ref.current = m.matches; };
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);
  return ref;
}

export function SkiperGalleryLite() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduceMotionRef = usePrefersReducedMotionRef();
  const [parallaxReady, setParallaxReady] = useState(false);

  const cols = useMemo(() => [
    [IMAGES[0], IMAGES[1], IMAGES[2]],
    [IMAGES[3], IMAGES[4], IMAGES[5]],
    [IMAGES[6], IMAGES[7], IMAGES[8]],
    [IMAGES[7], IMAGES[8], IMAGES[9]],
  ], []);

  // Lance le parallax dès qu'un pixel de la section est visible
  // Les images elles-mêmes sont rendues IMMÉDIATEMENT — pas de gate
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setParallaxReady(true);
          io.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "200px" } // précharge 200px avant l'entrée dans le viewport
    );
    io.observe(gallery);
    return () => io.disconnect();
  }, []);

  // Parallax rAF — seulement après visibilité
  useEffect(() => {
    if (!parallaxReady) return;
    const gallery = galleryRef.current;
    if (!gallery) return;

    let rafId = 0;
    let running = true;
    let currentP = 0;
    let targetP = 0;

    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const computeTarget = () => {
      const rect = gallery.getBoundingClientRect();
      const vh = window.innerHeight;
      targetP = clamp01((vh - rect.top) / (vh + rect.height));
    };

    const tick = () => {
      rafId = 0;
      if (!running) return;

      if (reduceMotionRef.current) {
        colRefs.current.forEach((el) => {
          if (el) el.style.transform = "translate3d(0,0,0)";
        });
        return;
      }

      currentP = lerp(currentP, targetP, 0.08);

      const offsets = [-0.12, -0.22, -0.10, -0.18];
      const amps    = [ 0.24,  0.44,  0.18,  0.38];
      const h = gallery.getBoundingClientRect().height || 1;

      colRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.transform = `translate3d(0,${h * (offsets[i] + amps[i] * currentP)}px,0)`;
      });

      // Relance le rAF seulement si on n'a pas encore convergé
      if (Math.abs(currentP - targetP) > 0.0005) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const schedule = () => { if (!rafId) rafId = requestAnimationFrame(tick); };
    const onScroll = () => { computeTarget(); schedule(); };
    const onResize = () => { computeTarget(); schedule(); };
    const onVis = () => {
      running = document.visibilityState !== "hidden";
      if (running) { computeTarget(); schedule(); }
    };

    computeTarget();
    schedule();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [parallaxReady, reduceMotionRef]);

  return (
    <section aria-label="Galerie photos" className="w-full overflow-hidden">
      <div
        ref={galleryRef}
        className="relative flex h-[80vh] gap-[1vw] overflow-hidden px-[1vw] md:h-[100vh]"
      >
        {cols.map((images, colIdx) => (
          <div
            key={colIdx}
            ref={(el) => { colRefs.current[colIdx] = el; }}
            className="relative flex h-full w-1/4 flex-shrink-0 flex-col gap-[1vw]"
            style={{ willChange: "transform" }}
          >
            {images.map((src, imgIdx) => {
              // Premières images des 2 premières colonnes = potentiellement above-the-fold
              const isEager = colIdx < 2 && imgIdx === 0;
              return (
                <figure
                  key={src}
                  className="relative min-h-0 flex-1 overflow-hidden rounded-lg"
                >
                  <Image
                    src={src}
                    alt={`Photo Ibiza Club ${colIdx * 3 + imgIdx + 1}`}
                    fill
                    className="object-cover"
                    sizes="25vw"
                    priority={isEager}
                    loading={isEager ? "eager" : "lazy"}
                    decoding="async"
                    quality={75}
                  />
                </figure>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}