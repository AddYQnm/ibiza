/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useRef } from "react";
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

function useMediaQueryRef(query: string) {
  const ref = useRef(false);

  useEffect(() => {
    const m = window.matchMedia(query);
    const update = () => (ref.current = m.matches);
    update();

    if (m.addEventListener) m.addEventListener("change", update);
    else m.addListener(update);

    return () => {
      if (m.removeEventListener) m.removeEventListener("change", update);
      else m.removeListener(update);
    };
  }, [query]);

  return ref;
}

function usePrefersReducedMotionRef() {
  const ref = useRef(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => (ref.current = m.matches);
    update();

    if (m.addEventListener) m.addEventListener("change", update);
    else m.addListener(update);

    return () => {
      if (m.removeEventListener) m.removeEventListener("change", update);
      else m.removeListener(update);
    };
  }, []);

  return ref;
}

/**
 * SkiperGalleryLite
 * - Ultra fluide: 1 seule boucle rAF, pas de state, pas de Framer/Lenis
 * - Animation "parallax columns" + léger easing
 * - GPU: translate3d + will-change
 */
export function SkiperGalleryLite() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobileRef = useMediaQueryRef("(max-width: 768px)");
  const reduceMotionRef = usePrefersReducedMotionRef();

  const col1 = useMemo(() => [IMAGES[0], IMAGES[1], IMAGES[2]], []);
  const col2 = useMemo(() => [IMAGES[3], IMAGES[4], IMAGES[5]], []);
  const col3 = useMemo(() => [IMAGES[6], IMAGES[7], IMAGES[8]], []);
  const col4 = useMemo(() => [IMAGES[7], IMAGES[8], IMAGES[9]], []);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let rafId = 0;
    let running = true;

    // easing state (smooth)
    let currentP = 0;
    let targetP = 0;

    const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const computeTargetProgress = () => {
      const rect = gallery.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // p=0 quand le top du bloc touche le bas du viewport
      // p=1 quand le bottom du bloc touche le haut du viewport
      const start = vh;
      const end = -rect.height;
      targetP = clamp01((start - rect.top) / (start - end));
    };

    const tick = () => {
      rafId = 0;
      if (!running) return;

      if (reduceMotionRef.current) {
        // reset propre
        currentP = 0;
        for (const el of colRefs.current) {
          if (el) el.style.transform = "translate3d(0,0,0)";
        }
        return;
      }

      // easing (plus petit = plus smooth)
      const ease = 0.085;
      currentP = lerp(currentP, targetP, ease);

      const mobile = isMobileRef.current;

      // offsets init (en % hauteur du conteneur) -> look "stacked columns"
      const baseTopDesktop = [-0.45, -0.95, -0.45, -0.75];
      const baseTopMobile = [-0.30, -0.70, -0.30, -0.55];

      // amplitudes par colonne (parallax)
      const ampsDesktop = [1.7, 2.6, 1.05, 2.4];
      const ampsMobile = [1.15, 1.75, 0.85, 1.55];

      const rect = gallery.getBoundingClientRect();
      const h = rect.height || 1;

      const tops = mobile ? baseTopMobile : baseTopDesktop;
      const amps = mobile ? ampsMobile : ampsDesktop;

      for (let i = 0; i < 4; i++) {
        const el = colRefs.current[i];
        if (!el) continue;

        const base = h * tops[i];
        const move = h * amps[i] * currentP;

        el.style.transform = `translate3d(0, ${base + move}px, 0)`;
      }
    };

    const schedule = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      computeTargetProgress();
      schedule();
    };

    const onResize = () => {
      computeTargetProgress();
      schedule();
    };

    // init
    computeTargetProgress();
    schedule();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    // pause quand onglet caché
    const onVis = () => {
      running = document.visibilityState !== "hidden";
      if (running) {
        computeTargetProgress();
        schedule();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobileRef, reduceMotionRef]);

  return (
    <main className="w-full text-black">
      <div
        ref={galleryRef}
        className="
          relative box-border flex h-[175vh] gap-[2vw] overflow-hidden p-[2vw]
          max-md:h-[160vh]
        "
      >
        <ColumnLite
          setRef={(el) => (colRefs.current[0] = el)}
          images={col1}
          priorityFirst
        />
        <ColumnLite setRef={(el) => (colRefs.current[1] = el)} images={col2} />
        <ColumnLite setRef={(el) => (colRefs.current[2] = el)} images={col3} />
        <ColumnLite setRef={(el) => (colRefs.current[3] = el)} images={col4} />
      </div>
    </main>
  );
}

function ColumnLite({
  images,
  setRef,
  priorityFirst,
}: {
  images: string[];
  setRef: (el: HTMLDivElement | null) => void;
  priorityFirst?: boolean;
}) {
  return (
    <div
      ref={setRef}
      className="
        relative flex h-full flex-col gap-[1vw]
        w-1/4 min-w-[320px]
        max-md:w-1/2 max-md:min-w-[160px] sm:max-md:min-w-[220px]
      "
      style={{
        willChange: "transform",
        transform: "translate3d(0,0,0)",
        contain: "layout paint style",
      }}
    >
      {images.map((src, i) => (
        <figure
          key={`${src}-${i}`}
          className="relative w-full flex-1 overflow-hidden rounded"
        >
          <Image
            src={src}
            alt="photo"
            fill
            className="pointer-events-none object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
            priority={priorityFirst && i === 0}
            loading={priorityFirst && i === 0 ? "eager" : "lazy"}
          />
        </figure>
      ))}
    </div>
  );
}