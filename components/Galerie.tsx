"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import Image from "next/image";
import { motion, MotionValue, useScroll, useTransform, useReducedMotion } from "framer-motion";

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

const Skiper30 = () => {
  const reduceMotion = useReducedMotion();
  const gallery = useRef<HTMLDivElement>(null);

  const [vh, setVh] = useState<number>(0);

  // ✅ useScroll ok
  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  // ✅ évite height=0 au début
  const height = vh || (typeof window !== "undefined" ? window.innerHeight : 0);

  // ✅ si reduceMotion, on neutralise (moins coûteux)
  const y = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : height * 3]);

  // ✅ colonnes memo (évite recréation array)
  const col1 = useMemo(() => [IMAGES[0], IMAGES[1], IMAGES[2]], []);
  const col2 = useMemo(() => [IMAGES[3], IMAGES[4], IMAGES[5]], []);
  const col3 = useMemo(() => [IMAGES[6], IMAGES[7], IMAGES[8]], []);
  const col4 = useMemo(() => [IMAGES[7], IMAGES[8], IMAGES[9]], []); // ✅ évite doublon exact

  useEffect(() => {
    // ✅ set vh au montage
    const update = () => setVh(window.innerHeight);
    update();

    window.addEventListener("resize", update);

    // ✅ Lenis seulement si on ne réduit pas les animations
    if (reduceMotion) {
      return () => window.removeEventListener("resize", update);
    }

    const lenis = new Lenis({
      // options utiles
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("resize", update);
      cancelAnimationFrame(rafId);     // ✅ stop RAF
      lenis.destroy();                 // ✅ cleanup Lenis
    };
  }, [reduceMotion]);

  return (
    <main className="w-full text-black">
      <div
        ref={gallery}
        className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden p-[2vw]"
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
        relative
        -top-[45%]
        flex
        h-full
        w-1/4
        min-w-[320px]
        flex-col
        gap-[1vw]
        first:top-[-45%]
        [&:nth-child(2)]:top-[-95%]
        [&:nth-child(3)]:top-[-45%]
        [&:nth-child(4)]:top-[-75%]
      "
      style={{ y, willChange: "transform" }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className="relative h-full w-full overflow-hidden rounded"
        >
          {/* ✅ next/image: meilleure perf + lazy */}
          <Image
            src={src}
            alt="image"
            fill
            className="pointer-events-none object-cover"
            sizes="(max-width: 768px) 320px, 25vw"
            priority={priorityFirst && i === 0} // ✅ une seule priorité
            loading={priorityFirst && i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </motion.div>
  );
};

export { Skiper30 };
