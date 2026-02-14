"use client";

import { useState } from "react";
import ReservationTypeSelector from "@/components/reservation/ReservationTypeSelector";
import ReservationForm from "@/components/reservation/ReservationForm";
import { Skiper30 } from "@/components/Galerie";
import ReservationHero from "@/components/reservation/SpotlightPreview";
import BottlePacksMarquee from "@/components/reservation/BottlePacksMarquee";

export default function ReservationPage() {
  const [type, setType] = useState<"table" | "privatisation">("table");

  const packs = [
    {
      id: "pack-1",
      title: "Pack Classic",
      price: "200€",
      imageSrc: "/images/packs/pack1.jpg",
    },
    {
      id: "pack-2",
      title: "Pack Gold",
      price: "350€",
      imageSrc: "/images/packs/pack2.jpg",
    },
    {
      id: "pack-3",
      title: "Pack VIP",
      price: "600€",
      imageSrc: "/images/packs/pack3.jpg",
    },
    {
      id: "pack-4",
      title: "Pack Ultra",
      price: "900€",
      imageSrc: "/images/packs/pack4.jpg",
    },
  ];

  return (
    <div className="mt-[-55px] bg-black/80 relative z-10">
      <ReservationHero />

      <section className="max-w-4xl mx-auto px-6 py-24 text-white">
        <ReservationTypeSelector type={type} setType={setType} />
        <ReservationForm type={type} />

        {/* ✅ Bande déroulante 100% visuelle */}
        <div className="mt-24">
          <BottlePacksMarquee packs={packs} speedSeconds={20} />
        </div>
      </section>

      <Skiper30 />
    </div>
  );
}
