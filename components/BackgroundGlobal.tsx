"use client";

import React from "react";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";

export function BackgroundGlobal() {
  return (
    // ✅ pointer-events-none sur le wrapper + interactive=false
    <div className="pointer-events-none fixed inset-0 z-0">
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(5, 0, 20)"
        gradientBackgroundEnd="rgb(20, 0, 40)"
        firstColor="180, 70, 255"
        secondColor="255, 60, 180"
        thirdColor="80, 200, 255"
        fourthColor="200, 120, 255"
        fifthColor="255, 80, 200"
        pointerColor="140, 100, 255"
        size="120%"
        blendingValue="hard-light"
        interactive={false}
        containerClassName="h-full w-full"
      />
      {/* Voile sombre global */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}