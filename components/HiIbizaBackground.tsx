/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                               SMALL HELPERS                                */
/* -------------------------------------------------------------------------- */

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/* -------------------------------------------------------------------------- */
/*                                  Skiper48                                  */
/* -------------------------------------------------------------------------- */

type CarouselImage = { src: string; mobileSrc: string; alt: string };

const Skiper48 = () => {
  const reduceMotion = useReducedMotion();

  const images = useMemo<CarouselImage[]>(
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
    <section className="relative w-full min-h-[100svh]">
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
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // ✅ Important: effet Swiper toujours valide
  const effect = reduceMotion ? "slide" : "cards";

  // ✅ N’inclure EffectCards/Autoplay que si nécessaire => moins de bugs / moins de boulot
  const modules = useMemo(() => {
    const base = [Pagination, Navigation] as any[];
    if (!reduceMotion) base.unshift(EffectCards);
    if (autoplay && !reduceMotion) base.unshift(Autoplay);
    return base;
  }, [autoplay, reduceMotion]);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn("mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-32", className)}
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

      {/* SWIPER */}
      <Swiper
        spaceBetween={spaceBetween}
        slidesPerView={1}
        effect={effect as any}
        grabCursor={!reduceMotion}
        loop={loop}
        speed={reduceMotion ? 450 : 700}
        watchSlidesProgress
        autoplay={
          autoplay && !reduceMotion
            ? { delay: 2200, disableOnInteraction: false, pauseOnMouseEnter: true }
            : false
        }
        pagination={showPagination ? { clickable: true } : false}
        navigation={
          showNavigation
            ? { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
            : false
        }
        // ✅ options spécifiques à cards (sinon il peut “trembler”)
        cardsEffect={
          !reduceMotion
            ? { slideShadows: true, perSlideOffset: 10, perSlideRotate: 2 }
            : undefined
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
        modules={modules}
      >
        {images.map((image, index) => {
          const chosenSrc = isDesktop ? image.src : image.mobileSrc;

          return (
            <SwiperSlide
              key={chosenSrc} // ✅ key cohérente avec la source réellement rendue
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="relative h-full w-full">
                <Image
                  src={chosenSrc}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes={
                    isDesktop
                      ? "(min-width: 768px) 900px, 0px"
                      : "(max-width: 767px) 320px, 0px"
                  }
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

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