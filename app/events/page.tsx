"use client";

import EventHero from "@/components/EventHero";
import ShotgunLuxurySection from "@/components/ShotgunLuxurySection";
import { motion } from "framer-motion";

const events = [
  {
    date: "VENDREDI 22 MARS",
    title: "IBIZA NIGHTS",
    subtitle: "DJ Guest • House • Afro",
    image: "/images/events/event1.jpg",
  },
  {
    date: "SAMEDI 23 MARS",
    title: "SPEAKEASY EXPERIENCE",
    subtitle: "Ambiance intimiste • VIP only",
    image: "/images/events/event2.jpg",
  },
  {
    date: "VENDREDI 29 MARS",
    title: "PURPLE WAVE",
    subtitle: "Deep • Melodic • Progressive",
    image: "/images/events/event3.jpg",
  },
];

export default function EventsPage() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      
<EventHero />
<ShotgunLuxurySection />
      {/* Animated futuristic background */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 bg-purple-700/30 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-1/2 right-0 h-96 w-96 bg-fuchsia-600/20 blur-[140px] animate-pulse-slow" />
      </div>


      {/* EVENTS GRID */}
 

    </section>
  );
}
