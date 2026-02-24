/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import Image from "next/image";
import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

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

/** --------- tiny hooks --------- */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, [query]);

  return matches;
}

function useWindowHeight() {
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return vh;
}

/** --------- Lenis singleton (1 seul RAF global) --------- */
let lenisSingleton: Lenis | null = null;
let lenisRafId = 0;
let lenisUsers = 0;

function ensureLenis() {
  if (lenisSingleton) return lenisSingleton;

  const lenis = new Lenis({
    smoothWheel: true,
    // tu peux ajouter d'autres options si besoin
  });

  const raf = (time: number) => {
    lenis.raf(time);
    lenisRafId = requestAnimationFrame(raf);
  };
  lenisRafId = requestAnimationFrame(raf);

  // pause quand onglet caché (gros gain sur mobile)
  const onVis = () => {
    if (document.visibilityState === "hidden") lenis.stop();
    else lenis.start();
  };
  document.addEventListener("visibilitychange", onVis);

  lenisSingleton = lenis;

  // cleanup global si plus personne ne l'utilise
  const cleanup = () => {
    document.removeEventListener("visibilitychange", onVis);
    cancelAnimationFrame(lenisRafId);
    lenis.destroy();
    lenisSingleton = null;
  };

  // on stocke le cleanup sur l'instance
  (lenis as any).__cleanup = cleanup;

  return lenisSingleton;
}

function releaseLenis() {
  if (!lenisSingleton) return;
  // si plus d'utilisateurs, on détruit proprement
  if (lenisUsers <= 0) {
    (lenisSingleton as any).__cleanup?.();
  }
}

const Skiper30 = () => {
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const gallery = useRef<HTMLDivElement>(null);

  const vh = useWindowHeight();
  const height = vh || (typeof window !== "undefined" ? window.innerHeight : 0);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  // Sur mobile: mêmes mouvements mais amplitudes un peu réduites -> moins coûteux
  const amp = reduceMotion ? 0 : isMobile ? 1.35 : 2;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * amp]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * (isMobile ? 2.0 : 3.3)]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * (isMobile ? 0.9 : 1.25)]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * (isMobile ? 1.8 : 3)]);

  // colonnes memo
  const col1 = useMemo(() => [IMAGES[0], IMAGES[1], IMAGES[2]], []);
  const col2 = useMemo(() => [IMAGES[3], IMAGES[4], IMAGES[5]], []);
  const col3 = useMemo(() => [IMAGES[6], IMAGES[7], IMAGES[8]], []);
  const col4 = useMemo(() => [IMAGES[7], IMAGES[8], IMAGES[9]], []);

  useEffect(() => {
    if (reduceMotion) return;

    // Lenis global (évite multiples RAF)
    lenisUsers += 1;
    ensureLenis();

    return () => {
      lenisUsers -= 1;
      releaseLenis();
    };
  }, [reduceMotion]);

  return (
    <main className="w-full text-black">
      <div
        ref={gallery}
        className="
          relative box-border flex h-[175vh] gap-[2vw] overflow-hidden p-[2vw]
          max-md:h-[160vh]
        "
      >
        <Column images={col1} y={y} priorityFirst />
        <Column images={col2} y={y2} />
        <Column images={col3} y={y3} />
        <Column images={col4} y={y4} />
      </div>
    </main>
  );
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
  priorityFirst?: boolean;
};

const Column = ({ images, y, priorityFirst }: ColumnProps) => {
  return (
    <motion.div
      className="
        relative -top-[45%] flex h-full flex-col gap-[1vw]
        w-1/4
        min-w-[320px]
        first:top-[-45%]
        [&:nth-child(2)]:top-[-95%]
        [&:nth-child(3)]:top-[-45%]
        [&:nth-child(4)]:top-[-75%]

        /* ✅ Mobile: garde l'esthétique (colonnes), mais évite l'overflow */
        max-md:w-1/2
        max-md:min-w-[160px]
        sm:max-md:min-w-[220px]
      "
      style={{
        y,
        willChange: "transform",
        transform: "translateZ(0)", // petit boost GPU
      }}
    >
      {images.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="relative w-full flex-1 overflow-hidden rounded" // ✅ au lieu de h-full (énorme reflow)
        >
          <Image
            src={src}
            alt="image"
            fill
            className="pointer-events-none object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
            priority={priorityFirst && i === 0}
            loading={priorityFirst && i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </motion.div>
  );
};

export { Skiper30 };