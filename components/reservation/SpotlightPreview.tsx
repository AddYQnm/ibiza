"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Spotlight } from "../ui/spotlight";

export default function ReservationHero() {
  return (
    <div className="relative h-[70vh] min-h-[520px] w-full overflow-hidden bg-black">
      
      {/* GRID BACKGROUND */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)]"
        )}
      />

      {/* GRADIENT BLUR */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black z-0" />

      {/* SPOTLIGHTS */}
      <Spotlight
        className="-top-40 left-1/2 -translate-x-1/2"
        fill="purple"
      />
      <Spotlight
        className="top-10 left-1/4"
        fill="white"
      />

      {/* GLOW */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_60%)]"
      />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl"
        >
          <span className="inline-block mb-6 px-4 py-2 text-xs tracking-widest uppercase rounded-full border border-white/10 text-white/70">
            Réservation exclusive
          </span>

          <h1 className="text-4xl md:text-7xl font-extrabold leading-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Réservez votre <br />
            <span className="text-purple-900">expérience nocturne</span>
          </h1>

          <p className="mt-6 text-white/70 text-base md:text-lg">
            Tables VIP, privatisations et soirées sur mesure.  
            Vivez la nuit autrement.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
