"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "@/lib/utils";

const Skiper48 = () => {
  const reduceMotion = useReducedMotion();

  const images = useMemo(
    () => [
      { src: "/images/ibiza/b6.png", mobileSrc: "/images/mobile/6.png", alt: "Ibiza event" },
      { src: "/images/ibiza/b1.png", mobileSrc: "/images/mobile/1.png", alt: "Ibiza event" },
      { src: "/images/ibiza/b2.png", mobileSrc: "/images/mobile/2.png", alt: "Ibiza event" },
      { src: "/images/ibiza/b3.jpg", mobileSrc: "/images/mobile/3.jpg", alt: "Ibiza event" },
      { src: "/images/ibiza/b4.png", mobileSrc: "/images/mobile/4.png", alt: "Ibiza event" },
      { src: "/images/ibiza/b5.png", mobileSrc: "/images/mobile/5.png", alt: "Ibiza event" },
    ],
    []
  );

  return (
    // ✅ IMPORTANT: empêche le scroll horizontal sans changer le rendu
    <section className="relative w-full min-h-[100svh] overflow-x-clip">
      <div className="relative z-10">
        <Carousel_002
          images={images}
          loop
          autoplay={!reduceMotion}
          showPagination={false}
          showNavigation={false}
        />
      </div>
    </section>
  );
};

export { Skiper48 };

/* -------------------------------------------------------------------------- */
/*                                 CAROUSEL                                   */
/* -------------------------------------------------------------------------- */

type CarouselImage = { src: string; mobileSrc: string; alt: string };

const Carousel_002 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 40,
}: {
  images: CarouselImage[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn("mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-32 overflow-x-clip", className)}
    >
      {/* TITRE */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 40 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-10% 0px" }}
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
          <span className="text-purple-300">Incontournables</span>
        </h2>
      </motion.div>

      {/* ✅ WRAPPER CLIP : garde ton rendu mais coupe le débordement Swiper */}
      <div className="w-full overflow-x-clip">
        <Swiper
          spaceBetween={spaceBetween}
          effect={reduceMotion ? "slide" : "cards"} // ✅ jamais undefined
          grabCursor={!reduceMotion}
          loop={loop}
          autoplay={
            autoplay && !reduceMotion
              ? { delay: 2200, disableOnInteraction: false }
              : false
          }
          pagination={showPagination ? { clickable: true } : false}
          navigation={
            showNavigation
              ? { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
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
            <SwiperSlide key={image.src} className="rounded-3xl overflow-hidden shadow-2xl">
              {/* Desktop */}
              <div className="hidden md:block relative h-full w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 900px, 0px"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>

              {/* Mobile */}
              <div className="block md:hidden relative h-full w-full">
                <Image
                  src={image.mobileSrc}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 767px) 320px, 0px"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* BOUTON */}
      <motion.div
        className="mt-14 flex justify-center"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <a
          href="/events"
          className="
            group relative inline-flex items-center gap-3
            text-sm md:text-base font-medium tracking-widest
            uppercase text-white/90
          "
        >
          En savoir plus
          <span
            className="
              inline-block translate-x-0 opacity-70
              transition-all duration-500 ease-out
              group-hover:translate-x-2 group-hover:opacity-100
            "
          >
            →
          </span>

          <span
            className="
              pointer-events-none
              absolute left-0 -bottom-2 h-[2px] w-full
              origin-left scale-x-0
              bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
              transition-transform duration-500 ease-out
              group-hover:scale-x-100
            "
          />
        </a>
      </motion.div>
    </motion.div>
  );
};

export { Carousel_002 };