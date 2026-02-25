"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function AboutIbizaSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate w-full overflow-hidden  py-32 px-6 md:px-16">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        {!reduceMotion && (
          <div className="absolute inset-0 opacity-100 max-md:opacity-70">
            <div className="ibz-orb ibz-orb-1" />
            <div className="ibz-orb ibz-orb-2" />
            <div className="ibz-orb ibz-orb-3" />
            <div className="ibz-orb ibz-orb-4" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-20 items-start lg:grid-cols-2">
        {/* LEFT */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 50 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="h-[2px] w-12 bg-gradient-to-r from-purple-400 to-fuchsia-400" />
            <span className="text-xs uppercase tracking-[0.3em] text-white/70">
              La privatisation
            </span>
          </div>

          <h2 className="text-5xl font-extrabold leading-tight text-white md:text-7xl">
            SPEAK <br />
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent">
              EASY
            </span>
          </h2>

          {/* IMAGES */}
          <motion.div
            className="mt-14 grid grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={
              reduceMotion
                ? undefined
                : { visible: { transition: { staggerChildren: 0.14 } } }
            }
          >
            {["/images/speakeazy/1.png", "/images/speakeazy/2.png", "/images/speakeazy/3.png"].map(
              (src, i) => (
                <motion.div
                  key={src}
                  className="relative h-44 w-full overflow-hidden rounded-2xl shadow-xl transform-gpu"
                  variants={
                    reduceMotion
                      ? undefined
                      : {
                          hidden: { opacity: 0, y: 18 },
                          visible: { opacity: 1, y: 0 },
                        }
                  }
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  <Image
                    src={src}
                    alt="Ibiza Speakeasy"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 33vw, 220px"
                    priority={i === 0}
                  />
                </motion.div>
              )
            )}
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 50 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
          className="text-base leading-relaxed text-white/85 md:text-xl"
        >
          <p className="mb-6">
            <strong className="text-white">Le Speakeasy de l’Ibiza Club Rouen</strong>{" "}
            est un lieu confidentiel, pensé comme une parenthèse hors du temps. Inspiré
            des bars clandestins, il mélange élégance rétro et énergie nocturne contemporaine.
          </p>

          <p>
            Un éclairage doux, une ambiance feutrée et une atmosphère exclusive font du
            Speakeasy l’espace idéal pour des soirées privées, des moments privilégiés ou
            une privatisation sur mesure.
          </p>

          <motion.div
            className="mt-10"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <a
              href="/speakeazy"
              className="group relative inline-block text-sm font-medium tracking-wide text-white/90 md:text-base"
            >
              En savoir plus
              <span
                className="
                  pointer-events-none absolute left-0 -bottom-2 h-[2px] w-full
                  origin-left scale-x-0 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
                  transition-transform duration-500 ease-out group-hover:scale-x-100
                "
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}