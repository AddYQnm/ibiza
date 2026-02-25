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
 * SkiperGalleryLite (optimisée)
 * - Mobile: render progressif des images (évite 12 images d’un coup)
 * - Desktop: full render ok
 */
export function SkiperGalleryLite() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobileRef = useMediaQueryRef("(max-width: 768px)");
  const reduceMotionRef = usePrefersReducedMotionRef();

  // Colonnes
  const col1 = useMemo(() => [IMAGES[0], IMAGES[1], IMAGES[2]], []);
  const col2 = useMemo(() => [IMAGES[3], IMAGES[4], IMAGES[5]], []);
  const col3 = useMemo(() => [IMAGES[6], IMAGES[7], IMAGES[8]], []);
  const col4 = useMemo(() => [IMAGES[7], IMAGES[8], IMAGES[9]], []);

  // ✅ rendu progressif : combien d’images par colonne on affiche
  const [visibleCount, setVisibleCount] = useState(() => {
    // SSR safe: on commence “light”, puis on upgrade côté client
    return 2;
  });

  // ✅ quand la section entre dans le viewport, on charge le reste en idle
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const isMobileNow = () => isMobileRef.current;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e?.isIntersecting) return;

        // Desktop: on peut afficher tout de suite
        if (!isMobileNow()) {
          setVisibleCount(3);
          io.disconnect();
          return;
        }

        // Mobile: d’abord 2 images/colonne, puis 3 après un moment “idle”
        setVisibleCount(2);

        const schedule = () => setVisibleCount(3);

        // requestIdleCallback si dispo, sinon timeout
        if ("requestIdleCallback" in window) {
          (window as any).requestIdleCallback(schedule, { timeout: 1200 });
        } else {
          setTimeout(schedule, 500);
        }

        io.disconnect();
      },
      { root: null, threshold: 0.15 }
    );

    io.observe(gallery);
    return () => io.disconnect();
  }, [isMobileRef]);

  // rAF parallax (inchangé, mais un poil optimisé)
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let rafId = 0;
    let running = true;

    let currentP = 0;
    let targetP = 0;

    const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const computeTargetProgress = () => {
      const rect = gallery.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh;
      const end = -rect.height;
      targetP = clamp01((start - rect.top) / (start - end));
    };

    const tick = () => {
      rafId = 0;
      if (!running) return;

      if (reduceMotionRef.current) {
        currentP = 0;
        for (const el of colRefs.current) {
          if (el) el.style.transform = "translate3d(0,0,0)";
        }
        return;
      }

      currentP = lerp(currentP, targetP, 0.085);

      const mobile = isMobileRef.current;

      const baseTopDesktop = [-0.45, -0.95, -0.45, -0.75];
      const baseTopMobile = [-0.30, -0.70, -0.30, -0.55];

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

    computeTargetProgress();
    schedule();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

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
          visibleCount={visibleCount}
          priorityFirst
        />
        <ColumnLite
          setRef={(el) => (colRefs.current[1] = el)}
          images={col2}
          visibleCount={visibleCount}
        />
        <ColumnLite
          setRef={(el) => (colRefs.current[2] = el)}
          images={col3}
          visibleCount={visibleCount}
        />
        <ColumnLite
          setRef={(el) => (colRefs.current[3] = el)}
          images={col4}
          visibleCount={visibleCount}
        />
      </div>
    </main>
  );
}

function ColumnLite({
  images,
  setRef,
  priorityFirst,
  visibleCount,
}: {
  images: string[];
  setRef: (el: HTMLDivElement | null) => void;
  priorityFirst?: boolean;
  visibleCount: number; // ✅ combien d’images rendre
}) {
  // ✅ ne rend que visibleCount images (mobile: 2 puis 3)
  const toRender = images.slice(0, visibleCount);

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
      {toRender.map((src, i) => (
        <figure key={`${src}-${i}`} className="relative w-full flex-1 overflow-hidden rounded">
          <Image
            src={src}
            alt="photo"
            fill
            className="pointer-events-none object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
            // ✅ charge juste la première image en priorité
            priority={priorityFirst && i === 0}
            loading={priorityFirst && i === 0 ? "eager" : "lazy"}
            // ✅ très bon pour fluidité
            decoding="async"
            // ✅ baisse un peu la qualité (gros gain mobile)
            quality={75}
          />
        </figure>
      ))}

      {/* ✅ placeholders pour garder les hauteurs/flow identiques quand on ajoute les images */}
      {images.length > toRender.length &&
        Array.from({ length: images.length - toRender.length }).map((_, idx) => (
          <div
            key={`ph-${idx}`}
            className="relative w-full flex-1 rounded bg-white/5"
            aria-hidden="true"
          />
        ))}
    </div>
  );
}