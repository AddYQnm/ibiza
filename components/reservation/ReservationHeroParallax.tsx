"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function ReservationHeroParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative h-[80vh] overflow-hidden flex items-center justify-center"
    >
      {/* IMAGE PARALLAX */}
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/images/ibiza-reservation.jpg" // image temporaire
          alt="Ibiza Club"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* TEXTE */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-4xl md:text-7xl font-extrabold mb-6">
          Réservez une expérience
        </h1>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
          Table VIP, événement privé ou privatisation complète.  
          Vivez l’expérience Ibiza Club.
        </p>
      </div>
    </section>
  );
}
