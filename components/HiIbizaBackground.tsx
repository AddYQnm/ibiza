"use client";
import { motion } from "motion/react";

export default function HiIbizaBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full overflow-hidden bg-[#0b0b0b]">

      {/* LIGHT ORB 1 */}
      <motion.div
        className="pointer-events-none absolute -top-[30%] -left-[20%]
        h-[600px] w-[600px] rounded-full
        bg-fuchsia-500/60 blur-[180px]"
        animate={{ x: [0, 150, 0], y: [0, 120, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />

      {/* LIGHT ORB 2 */}
      <motion.div
        className="pointer-events-none absolute -bottom-[30%] -right-[20%]
        h-[700px] w-[700px] rounded-full
        bg-cyan-400/60 blur-[200px]"
        animate={{ x: [0, -150, 0], y: [0, -120, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      />

      {/* LIGHT ORB 3 */}
      <motion.div
        className="pointer-events-none absolute top-[20%] right-[10%]
        h-[500px] w-[500px] rounded-full
        bg-violet-500/50 blur-[160px]"
        animate={{ x: [0, -80, 0], y: [0, 80, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />

      {/* DARK OVERLAY (très important) */}
      <div className="pointer-events-none absolute inset-0 bg-black/30" />

      {/* CONTENT */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
