"use client";

import { motion } from "motion/react";

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
  return (
    <section className="relative py-32  overflow-hidden">
    {/* LUMINOUS BACKGROUND */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black via-purple-900 via-pink-900 to-black opacity-30 blur-3xl animate-pulse-slow"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ repeat: Infinity, duration: 8, repeatType: "reverse" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* SMALL LABEL */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-red-500" />
            <span className="text-sm uppercase tracking-widest text-white">
              Nos reseaux sociaux
            </span>
          </div>

          {/* TITLE */}
          <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white">
            Un Instagram <br />
            <span className="text-purple-300">Pas comme les autres</span>
          </h2>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="relative aspect-square overflow-hidden group"
            >
              <img
                src={src}
                alt="Instagram post"
                className="h-full w-full object-cover"
              />

              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />

              {/* ICON */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                <svg
                  width="20"
                  height="20"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
          
          <a
            href="https://www.instagram.com/ibizaclubrouen/"
            target="_blank"
            className="px-8 py-3 rounded-full bg-white text-black font-semibold"
          >
            Follow on Instagram
          </a>
        </div>

      </div>
    </section>
  );
};
