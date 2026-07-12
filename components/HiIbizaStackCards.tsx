"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "@/lib/utils";

const Skiper48 = () => {
  const reduceMotion = useReducedMotion();

  const images = useMemo(
    () => [
      { src: "/images/ibiza/b.png", mobileSrc: "/images/mobile/2.png", alt: "Ibiza event" },
      { src: "/images/ibiza/b1.png", mobileSrc: "/images/mobile/5.png", alt: "Ibiza event" },
      { src: "/images/ibiza/b2.png", mobileSrc: "/images/mobile/POST (7).png", alt: "Ibiza event" },
      { src: "/images/ibiza/b3.png", mobileSrc: "/images/mobile/6.png", alt: "Ibiza event" },
      { src: "/images/ibiza/b4.png", mobileSrc: "/images/mobile/3.png", alt: "Ibiza event" },
      { src: "/images/ibiza/b5.png", mobileSrc: "/images/mobile/4.png", alt: "Ibiza event" },
    ],
    []
  );

  return (
    <section className="relative w-full overflow-x-hidden">
      <div className="relative z-10">
        <Carousel_002
          images={images}
          loop
          autoplay={!reduceMotion}
          showPagination={false}
          showNavigation
        />
      </div>
    </section>
  );
};

export { Skiper48 };

/* -------------------------------------------------------------------------- */
/*                                 CAROUSEL                                   */
/* -------------------------------------------------------------------------- */

type CarouselImage = {
  src: string;
  mobileSrc: string;
  alt: string;
};

const Carousel_002 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
}: {
  images: CarouselImage[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
}) => {
  const reduceMotion = useReducedMotion();

  return (
    /*
      CORRECTIF INP :
      - Suppression du motion.div wrapper avec animate immédiat → évite une
        animation de layout au montage qui bloque le thread principal.
      - Le titre garde whileInView mais avec un seul motion.div (pas de stagger enfants).
    */
    <div className={cn("mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32", className)}>

      {/* TITRE */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-10% 0px" }}
        className="mb-14 sm:mb-20"
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="h-[2px] w-8 bg-red-500" />
          <span className="text-xs uppercase tracking-widest text-white sm:text-sm">
            Nos events
          </span>
        </div>

        <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-6xl">
          Découvrez nos Soirées <br />
          <span className="text-purple-300">Incontournables</span>
        </h2>
      </motion.div>

      {/* ZONE CARDS */}
      <div className="group relative mx-auto w-full max-w-[1500px] px-2 sm:px-4 md:px-16">
        {showNavigation && (
          <>
            <button
              className="swiper-button-prev-custom absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out hover:scale-110 hover:border-white/25 hover:bg-black/55 active:scale-95 sm:left-3 sm:h-12 sm:w-12 md:left-4 md:h-14 md:w-14 md:opacity-0 md:group-hover:opacity-100"
              aria-label="Slide précédente"
              type="button"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            <button
              className="swiper-button-next-custom absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out hover:scale-110 hover:border-white/25 hover:bg-black/55 active:scale-95 sm:right-3 sm:h-12 sm:w-12 md:right-4 md:h-14 md:w-14 md:opacity-0 md:group-hover:opacity-100"
              aria-label="Slide suivante"
              type="button"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </>
        )}

        <Swiper
          effect="cards"
          grabCursor={!reduceMotion}
          loop={loop}
          centeredSlides
          slidesPerView={1}
          allowTouchMove
          autoplay={
            autoplay && !reduceMotion
              ? { delay: 2600, disableOnInteraction: false }
              : false
          }
          pagination={showPagination ? { clickable: true } : false}
          navigation={
            showNavigation
              ? {
                  prevEl: ".swiper-button-prev-custom",
                  nextEl: ".swiper-button-next-custom",
                }
              : false
          }
          cardsEffect={{
            perSlideOffset: 10,
            perSlideRotate: 1,
            rotate: true,
            slideShadows: false,
          }}
          className="mx-auto w-full max-w-[340px] sm:max-w-[560px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1280px] overflow-visible"
          modules={[EffectCards, Autoplay, Pagination, Navigation]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.src} className="overflow-hidden rounded-[28px] shadow-2xl">
              <div className="relative w-full md:aspect-video aspect-[4/5] overflow-hidden rounded-[28px] bg-black">

                {/*
                  CORRECTIF LCP + performance :
                  Suppression du "Background blur" qui chargeait la même image 2×
                  (une fois en blur pour le fond, une fois pour l'affichage réel).
                  Cela doublait les requêtes images → +LCP, +INP (paint coûteux).
                  
                  Si l'effet blur de fond vous manque visuellement, une alternative
                  sans surcoût réseau est d'utiliser une couleur dominante extraite
                  via `blurDataURL` sur le composant Image Next.js.
                */}

                {/* Desktop */}
                <div className="relative hidden h-full w-full md:block">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 1280px, (min-width: 1024px) 1100px, (min-width: 768px) 900px, 100vw"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>

                {/* Mobile */}
                <div className="relative block h-full w-full md:hidden">
                  <Image
                    src={image.mobileSrc}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
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
          className="group relative inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-white/90 md:text-base"
        >
          En savoir plus
          <span className="inline-block translate-x-0 opacity-70 transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:opacity-100">
            →
          </span>
          <span className="pointer-events-none absolute left-0 -bottom-2 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 transition-transform duration-500 ease-out group-hover:scale-x-100" />
        </a>
      </motion.div>
    </div>
  );
};

export { Carousel_002 };