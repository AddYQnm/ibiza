"use client";

import { motion } from "framer-motion";

const packs = [
  {
    id: "silver",
    title: "Silver",
    price: "À partir de 250€",
    image: "/images/packs/silver.jpg",
  },
  {
    id: "gold",
    title: "Gold",
    price: "À partir de 400€",
    image: "/images/packs/gold.jpg",
  },
  {
    id: "platinum",
    title: "Platinum",
    price: "À partir de 700€",
    image: "/images/packs/platinum.jpg",
  },
  {
    id: "vip",
    title: "VIP Experience",
    price: "Sur mesure",
    image: "/images/packs/vip.jpg",
  },
];

export default function TablePacks({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (id: string) => void;
}) {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {packs.map((pack) => (
        <motion.button
          key={pack.id}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChange(pack.id)}
          className={`relative overflow-hidden rounded-3xl border transition text-left ${
            value === pack.id
              ? "border-purple-500"
              : "border-white/10"
          }`}
        >
          <img
            src={pack.image}
            className="h-48 w-full object-cover"
            alt={pack.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-0 p-4">
            <h3 className="text-lg font-semibold text-white">
              {pack.title}
            </h3>
            <p className="text-sm text-white/70">
              {pack.price}
            </p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
