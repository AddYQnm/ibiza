"use client";

import EventHero from "@/components/EventHero";
import ShotgunLuxurySection from "@/components/ShotgunLuxurySection";



export default function EventsPage() {
  return (
    <section className="relative min-h-screen bg-black mt-[-55px] overflow-hidden">
      
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
