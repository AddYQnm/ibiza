"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Wine, Users } from "lucide-react";

type Props = {
  type: "table" | "privatisation";
  setType: (type: "table" | "privatisation") => void;
};

export default function ReservationTypeSelector({ type, setType }: Props) {
  const items = [
    {
      id: "table",
      title: "Réservation de table",
      desc: "Soirées, anniversaires, expérience VIP",
      icon: Wine,
    },
    {
      id: "privatisation",
      title: "Privatisation",
      desc: "EVG, EVJF, événements pro & privés",
      icon: Users,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-16">
      {items.map((item) => {
        const Icon = item.icon;
        const isSelected = type === item.id;

        return (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setType(item.id as "table" | "privatisation")}
            aria-pressed={isSelected}
            className={cn(
              "relative p-8 rounded-3xl border text-left transition backdrop-blur-xl",
              isSelected
                ? "border-gold bg-gold/10"  // couleur premium doré
                : "border-white/10 bg-white/5 hover:border-white/30"
            )}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className={cn(
                  "p-3 rounded-xl",
                  isSelected
                    ? "bg-gold/20 text-gold"
                    : "bg-white/10 text-white/70"
                )}
              >
                <Icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
            </div>

            <p className="text-white/70">{item.desc}</p>

            {isSelected && (
              <span className="absolute top-4 right-4 text-xs font-bold text-gold">
                Sélectionné
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
