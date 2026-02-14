"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const instagramPosts = [
  "/images/instagram/1.jpeg",
  "/images/instagram/2.jpeg",
  "/images/instagram/3.png",
  "/images/instagram/4.png",
  "/images/instagram/5.png",
  "/images/instagram/6.jpeg",
  "/images/photo/A22A6829.jpeg",
  "/images/photo/A22A6919.jpeg",
];

export const InstagramSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative py-32 overflow-hidden">
      {/* LUMINOUS BACKGROUND (moins coûteux + désactivable) */}
      {reduceMotion ? (
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900 via-pink-900 to-black opacity-25 blur-3xl" />
      ) : (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black via-purple-900 via-pink-900 to-black opacity-25 blur-3xl"
          initial={{ scale: 1 }}
          animate={{ scale: 1.04 }}
          transition={{ repeat: Infinity, duration: 10, repeatType: "reverse", ease: "easeInOut" }}
          style={{ willChange: "transform" }}
        />
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-red-500" />
            <span className="text-sm uppercase tracking-widest text-white">
              Nos réseaux sociaux
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white">
            Un Instagram <br />
            <span className="text-purple-300">Pas comme les autres</span>
          </h2>
        </motion.div>

        {/* GRID */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((src, i) => (
            <motion.div
              key={src}
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              className="relative aspect-square overflow-hidden rounded group"
            >
              {/* next/image = lazy + optimisation */}
              <Image
                src={src}
                alt="Instagram post"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={i < 2} // charge 2 images en priorité (au-dessus de la ligne de flottaison)
                loading={i < 2 ? "eager" : "lazy"}
              />

              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* ICON */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="https://www.instagram.com/ibizaclubrouen/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={reduceMotion ? undefined : { scale: 1.06 }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          className="
            group relative mx-auto mt-12 inline-flex items-center gap-3
            rounded-full px-8 py-3
            text-sm md:text-base font-semibold text-white
            bg-gradient-to-r
            from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888]
            shadow-lg shadow-pink-500/30
            transition-all overflow-hidden
          "
        >
          {/* Glow */}
          <span
            className="
              absolute inset-0 rounded-full
              bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888]
              blur-xl opacity-0 group-hover:opacity-60 transition-opacity
            "
          />

          <svg className="relative z-10" width="20" height="20" fill="white" viewBox="0 0 24 24">
            <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
          </svg>

          <span className="relative z-10 tracking-wide">Follow us on Instagram</span>
        </motion.a>
      </div>
    </section>
  );
};
