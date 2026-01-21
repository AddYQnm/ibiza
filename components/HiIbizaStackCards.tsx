"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";

/* -------------------------------------------------------------------------- */
/*                                   MAIN                                     */
/* -------------------------------------------------------------------------- */

const Skiper48 = () => {
const images = [
  { src: "/images/ibiza/b1.png", mobileSrc: "/images/ibiza/post/b1.png", alt: "Ibiza event" },
  { src: "/images/ibiza/b2.png", mobileSrc: "/images/ibiza/post/b2.png", alt: "Ibiza event" },
  { src: "/images/ibiza/b3.jpg", mobileSrc: "/images/ibiza/post/b3.jpg", alt: "Ibiza event" },
    { src: "/images/ibiza/b4.png", mobileSrc: "/images/ibiza/post/b4.png", alt: "Ibiza event" },
    { src: "/images/ibiza/b5.png", mobileSrc: "/images/ibiza/post/b5.png", alt: "Ibiza event" },
     { src: "/images/ibiza/b1.png", mobileSrc: "/images/ibiza/post/b1.png", alt: "Ibiza event" },
  { src: "/images/ibiza/b2.png", mobileSrc: "/images/ibiza/post/b2.png", alt: "Ibiza event" },
  { src: "/images/ibiza/b3.jpg", mobileSrc: "/images/ibiza/post/b3.jpg", alt: "Ibiza event" },
    { src: "/images/ibiza/b4.png", mobileSrc: "/images/ibiza/post/b4.png", alt: "Ibiza event" },
    { src: "/images/ibiza/b5.png", mobileSrc: "/images/ibiza/post/b5.png", alt: "Ibiza event" },
  ];

  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden">
      {/* BACKGROUND
          - absolute sur mobile (safe)
          - fixed à partir de md */}
      <div className="absolute inset-0 z-0 md:fixed">
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
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 z-[1] bg-black/40 backdrop-blur-[1.5px]" />

      {/* CONTENU */}
      <div className="relative z-10">
        <Carousel_002 images={images} loop />
      </div>
    </section>
  );
};

export { Skiper48 };

/* -------------------------------------------------------------------------- */
/*                                 CAROUSEL                                   */
/* -------------------------------------------------------------------------- */
/* ⚠️ LOGIQUE IDENTIQUE — AJUSTEMENTS RESPONSIVE UNIQUEMENT */

const Carousel_002 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 40,
}: {
  images: { src: string; alt: string }[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        // padding mobile réduit
        "mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-32",
        className
      )}
    >
      {/* TITRE */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-14 sm:mb-20"
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="h-[2px] w-8 bg-red-500" />
          <span className="text-xs sm:text-sm uppercase tracking-widest text-white">
            Nos events
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-white">
          Découvrez nos Soirées <br />
          <span className="text-purple-300">Incontournable</span>
        </h2>
      </motion.div>

      {/* SWIPER */}
      <Swiper
        spaceBetween={spaceBetween}
        effect="cards"
        grabCursor
        loop={loop}
        autoplay={
          autoplay
            ? { delay: 1200, disableOnInteraction: false }
            : false
        }
        pagination={showPagination ? { clickable: true } : false}
        navigation={
          showNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        className="
          w-full
          max-w-[320px]
          sm:max-w-[500px]
          md:max-w-[900px]
          h-[360px]
          sm:h-[500px]
          md:h-[600px]
          mx-auto
        "
        modules={[EffectCards, Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide
  key={index}
  className="rounded-3xl overflow-hidden shadow-2xl"
>
  {/* Desktop */}
  <img
    src={image.src}
    alt={image.alt}
    className="hidden md:block h-full w-full object-cover"
  />

  {/* Mobile / post */}
  <img
    src={image.mobileSrc}
    alt={image.alt}
    className="block md:hidden h-full w-full object-cover"
  />
</SwiperSlide>

        ))}

        {showNavigation && (
          <>
            <div className="swiper-button-next after:hidden">
              <ChevronRightIcon className="h-6 w-6 text-white" />
            </div>
            <div className="swiper-button-prev after:hidden">
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </div>
          </>
        )}
      </Swiper>
    </motion.div>
  );
};

export { Carousel_002 };
