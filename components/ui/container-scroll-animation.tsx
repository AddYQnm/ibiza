"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "motion/react";

/* =========================
   CONTAINER SCROLL
========================= */

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0.9, 1] : [1.05, 1]
  );
  const rotate = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[60rem] md:h-[80rem] items-center justify-center overflow-hidden p-4 md:p-20"
    >
      {/* =========================
          BACKGROUND IMAGE
      ========================= */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center blur-md"
          style={{
            backgroundImage: "url('/images/ibiza-bg.jpg')",
            imageRendering: "pixelated",
          }}
        />
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div
        className="relative w-full py-10 md:py-40"
        style={{ perspective: "1200px" }}
      >
        {titleComponent && (
          <Header translate={translate}>{titleComponent}</Header>
        )}

        {/* TITRE */}
        <h2 className="mb-10 text-center text-4xl md:text-8xl font-bold tracking-tight text-white">
          Ibiza Club
        </h2>

        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

/* =========================
   HEADER
========================= */

const Header = ({
  translate,
  children,
}: {
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="mx-auto mb-10 max-w-5xl text-center"
    >
      {children}
    </motion.div>
  );
};

/* =========================
   CARD
========================= */

const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 20px 50px rgba(0,0,0,0.6), 0 80px 120px rgba(0,0,0,0.35)",
      }}
      className="mx-auto h-[30rem] md:h-[50rem] w-full rounded-[36px] border-4 border-white/10 bg-zinc-900 p-3 md:p-6"
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        {children}
      </div>
    </motion.div>
  );
};
