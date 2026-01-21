"use client";

import { motion } from "framer-motion";

export default function AboutIbizaSection() {
  return (
    <section className="relative isolate w-full overflow-hidden py-32 px-6 md:px-16 bg-black">

      {/* ================== ANIMATED COLOR ORBS ================== */}
      <div className="pointer-events-none absolute inset-0">

        {/* ORB PURPLE */}
        <motion.div
          className="absolute top-[-20%] left-[5%] h-[520px] w-[520px] rounded-full bg-purple-600/40 blur-[160px]"
          animate={{
            x: [0, 80, -40, 0],
            y: [0, 60, 20, 0],
            scale: [1, 1.25, 1.1, 1],
            rotate: [0, 15, -10, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ORB FUCHSIA */}
        <motion.div
          className="absolute top-[30%] right-[0%] h-[600px] w-[600px] rounded-full bg-fuchsia-500/35 blur-[180px]"
          animate={{
            x: [0, -100, -40, 0],
            y: [0, 80, -30, 0],
            scale: [1, 1.3, 1.15, 1],
            rotate: [0, -20, 10, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ORB BLUE */}
        <motion.div
          className="absolute bottom-[-25%] left-[30%] h-[500px] w-[500px] rounded-full bg-indigo-600/35 blur-[170px]"
          animate={{
            x: [0, 60, -20, 0],
            y: [0, -80, 40, 0],
            scale: [1, 1.2, 1.05, 1],
            rotate: [0, 10, -15, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* EXTRA SMALL GLOW */}
        <motion.div
          className="absolute top-[45%] left-[45%] h-[260px] w-[260px] rounded-full bg-pink-400/30 blur-[120px]"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* ================== CONTENT ================== */}
      <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[2px] w-12 bg-gradient-to-r from-purple-400 to-fuchsia-400" />
            <span className="text-xs uppercase tracking-[0.3em] text-white/70">
              La privatisation
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight text-white">
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
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {[
              "/images/speakeazy/1.png",
              "/images/speakeazy/2.png",
              "/images/speakeazy/3.png",
            ].map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt="Ibiza Speakeasy"
                className="h-44 w-full rounded-2xl object-cover shadow-xl"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-white/85 text-base md:text-lg leading-relaxed"
        >
          <p className="mb-6">
            <strong className="text-white">
              Le Speakeasy de l’Ibiza Club Rouen
            </strong>{" "}
            est un lieu confidentiel, pensé comme une parenthèse hors du temps.
            Inspiré des bars clandestins, il mélange élégance rétro et énergie
            nocturne contemporaine.
          </p>

          <p>
            Un éclairage doux, une ambiance feutrée et une atmosphère exclusive
            font du Speakeasy l’espace idéal pour des soirées privées, des
            moments privilégiés ou une privatisation sur mesure.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
