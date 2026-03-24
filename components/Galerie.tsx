/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [visible, setVisible] = useState(false);

  const cols = useMemo(() => [
    [IMAGES[0], IMAGES[1], IMAGES[2]],
    [IMAGES[3], IMAGES[4], IMAGES[5]],
    [IMAGES[6], IMAGES[7], IMAGES[8]],
    [IMAGES[7], IMAGES[8], IMAGES[9]],
  ], []);

  // Déclenche le rendu complet quand la section entre dans le viewport
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(gallery);
    return () => io.disconnect();
  }, []);

  // Parallax rAF — seulement si visible + motion autorisé
  useEffect(() => {
    if (!visible) return;
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

      // Amplitudes réduites pour éviter les débordements
      const offsets = [-0.12, -0.22, -0.10, -0.18];
      const amps    = [ 0.24,  0.44,  0.18,  0.38];

      const h = gallery.getBoundingClientRect().height || 1;

      colRefs.current.forEach((el, i) => {
        if (!el) return;
        const y = h * (offsets[i] + amps[i] * currentP);
        el.style.transform = `translate3d(0,${y}px,0)`;
      });
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
  }, [visible, reduceMotionRef]);

  return (
    // ✅ <section> sémantique, pas de <main>
    <section
      aria-label="Galerie photos"
      className="w-full overflow-hidden"
    >
      {/* Wrapper hauteur fixe — overflow hidden pour masquer le dépassement parallax */}
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
            {images.map((src, imgIdx) => (
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
                  // Priorité uniquement sur la première image de la première colonne
                  priority={colIdx === 0 && imgIdx === 0}
                  loading={colIdx === 0 && imgIdx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  quality={75}
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
