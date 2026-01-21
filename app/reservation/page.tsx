"use client";

import { useState } from "react";
import ReservationHeroParallax from "@/components/reservation/ReservationHeroParallax";
import ReservationTypeSelector from "@/components/reservation/ReservationTypeSelector";
import ReservationForm from "@/components/reservation/ReservationForm";
import { Skiper30 } from "@/components/Galerie";
import ReservationHero, { SpotlightPreview } from "@/components/reservation/SpotlightPreview";

export default function ReservationPage() {
  const [type, setType] = useState<"table" | "privatisation">("table");

  return (
    <>
    <ReservationHero />

      <section className="max-w-4xl mx-auto px-6 py-24 text-white">
        <ReservationTypeSelector type={type} setType={setType} />
        <ReservationForm type={type} />
      </section>
      <Skiper30 />
    </>
  );
}
