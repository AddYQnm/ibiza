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
    <section className="relative py-24 md:py-32 overflow-hidden">
      
      {/* BACKGROUND OPTIMISÉ */}
      <motion.div
        className="absolute inset-0 hidden md:block bg-gradient-to-b from-black via-purple-900 via-pink-900 to-black opacity-20 blur-3xl"
        initial={false}
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.03, 1] } // keyframes = + fluide
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        style={{ willChange: "transform" }}
      />

      {/* MOBILE STATIC */}
      <div className="absolute inset-0 md:hidden bg-gradient-to-b from-black via-purple-900 via-pink-900 to-black opacity-20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* HEADER */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-[2px] w-12 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-300" />
            <span className="text-xs uppercase tracking-[0.35em] text-white/70">
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
            <motion.a
              key={src}
              href="https://www.instagram.com/ibizaclubrouen/"
              target="_blank"
              rel="noopener noreferrer"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }} // stagger léger
              className="group relative aspect-square overflow-hidden rounded-xl will-change-transform"
            >
              {/* IMAGE */}
              <Image
                src={src}
                alt="Instagram post"
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={i < 2}
                loading={i < 2 ? "eager" : "lazy"}
                quality={75}
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* ICON */}
              <div className="absolute top-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                  <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="https://www.instagram.com/ibizaclubrouen/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={reduceMotion ? undefined : { scale: 1.05 }}
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          className="group relative mx-auto mt-12 inline-flex items-center gap-3 rounded-full px-8 py-3 text-sm md:text-base font-semibold text-white bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-lg shadow-pink-500/30 overflow-hidden"
        >
          <span className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />

          <svg width="20" height="20" fill="white" className="relative z-10" viewBox="0 0 24 24">
            <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10z" />
          </svg>

          <span className="relative z-10">Follow us on Instagram</span>
        </motion.a>
      </div>
    </section>
  );
};