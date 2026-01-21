"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { useState } from "react";

const cardsData = [
  { id: 1, title: "Agenda", image: "/img/agenda.jpg" },
  { id: 2, title: "Préventes", image: "/img/preventes.jpg" },
  { id: 3, title: "Privatisation", image: "/img/privatisation.jpg" },
];

export const SwipeCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-150, 0, 150], [-10, 0, 10]);
  const scale = useTransform(x, [-150, 0, 150], [0.95, 1, 0.95]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -100 && activeIndex < cardsData.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
    if (info.offset.x > 100 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div className="relative h-[28rem] w-full overflow-hidden flex items-center justify-center">
      {cardsData.map((card, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.div
            key={card.id}
            drag={isActive ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            style={{
              x: isActive ? x : 0,
              rotate: isActive ? rotate : 0,
              scale: isActive ? scale : 0.92,
              zIndex: cardsData.length - index,
            }}
            animate={{
              x: (index - activeIndex) * 260,
              scale: isActive ? 1 : 0.9,
              opacity: isActive ? 1 : 0.7,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="absolute w-[18rem] h-[24rem] rounded-3xl overflow-hidden bg-black shadow-2xl cursor-grab"
          >
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-6 left-6 text-white text-2xl font-bold">
              {card.title}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
