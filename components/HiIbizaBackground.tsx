/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  Swiper,
  SwiperSlide,
} from "swiper/react";
import {
  Autoplay,
  EffectCards,
  Navigation,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                  TYPES                                     */
/* -------------------------------------------------------------------------- */

export type CarouselImage = {
  src: string;
  mobileSrc: string;
  alt: string;
};

type CarouselProps = {
  images: CarouselImage[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
};

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
}: CarouselProps) => {
  const reduceMotion = useReducedMotion();

  const effect = reduceMotion ? "slide" : "cards";

  const modules = useMemo(() => {
    const base = [Pagination, Navigation] as any[];

    if (!reduceMotion) {
      base.unshift(EffectCards);
    }

    if (autoplay && !reduceMotion) {
      base.unshift(Autoplay);
    }

    return base;
  }, [autoplay, reduceMotion]);

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 30 }
      }
      animate={
        reduceMotion
          ? undefined
          : { opacity: 1, y: 0 }
      }
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className={cn(
        "mx-auto w-full max-w-7xl",
        "px-4 sm:px-6",
        "py-20 sm:py-32",
        className
      )}
    >
      {/* ------------------------------------------------------------------ */}
      {/* TITRE                                                              */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 40 }
        }
        whileInView={
          reduceMotion
            ? undefined
            : { opacity: 1, y: 0 }
        }
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        viewport={{
          once: true,
          margin: "-10% 0px",
        }}
        className="mb-14 sm:mb-20"
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="h-[2px] w-8 bg-red-500" />

          <span className="text-xs uppercase tracking-widest text-white sm:text-sm">
            Nos events
          </span>
        </div>

        <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-6xl">
          Découvrez nos Soirées
          <br />
          <span className="text-purple-300">
            Incontournables
          </span>
        </h2>
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* SWIPER                                                             */}
      {/* ------------------------------------------------------------------ */}

      <div className="relative mx-auto w-full">
        <Swiper
          spaceBetween={spaceBetween}
          slidesPerView={1}
          centeredSlides
          effect={effect as any}
          grabCursor={!reduceMotion}
          loop={loop}
          speed={reduceMotion ? 450 : 700}
          watchSlidesProgress
          autoplay={
            autoplay && !reduceMotion
              ? {
                  delay: 2200,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          pagination={
            showPagination
              ? { clickable: true }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          cardsEffect={
            !reduceMotion
              ? {
                  slideShadows: false,
                  perSlideOffset: 10,
                  perSlideRotate: 1.5,
                }
              : undefined
          }
          className="
            mx-auto
            w-full

            max-w-[360px]
            sm:max-w-[560px]
            md:max-w-[900px]
            lg:max-w-[1100px]
            xl:max-w-[1250px]

            h-[480px]
            sm:h-[560px]
            md:h-[600px]
            lg:h-[620px]

            overflow-visible
          "
          modules={modules}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={`${image.src}-${index}`}
              className="
                overflow-hidden
                rounded-[28px]
                bg-black
                shadow-2xl
              "
            >
              <div
                className="
                  relative
                  h-full
                  w-full
                  overflow-hidden
                  rounded-[28px]
                  bg-black
                "
              >
                {/* -------------------------------------------------------- */}
                {/* MOBILE                                                     */}
                {/* -------------------------------------------------------- */}

                <div className="absolute inset-0 md:hidden">
                  <Image
                    src={image.mobileSrc}
                    alt={image.alt}
                    fill
                    priority={index === 0}
                    loading={
                      index === 0
                        ? "eager"
                        : "lazy"
                    }
                    sizes="360px"
                    className="
                      object-cover
                      object-center
                    "
                  />
                </div>

                {/* -------------------------------------------------------- */}
                {/* DESKTOP                                                    */}
                {/* -------------------------------------------------------- */}

                <div className="absolute inset-0 hidden md:block">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={index === 0}
                    loading={
                      index === 0
                        ? "eager"
                        : "lazy"
                    }
                    sizes="
                      (min-width: 1280px) 1250px,
                      (min-width: 1024px) 1100px,
                      (min-width: 768px) 900px,
                      100vw
                    "
                    className="
                      object-cover
                      object-center
                    "
                  />
                </div>

                {/* -------------------------------------------------------- */}
                {/* OVERLAY                                                     */}
                {/* -------------------------------------------------------- */}

                <div
                  className="
                    pointer-events-none
                    absolute inset-0
                    bg-gradient-to-t
                    from-black/20
                    via-transparent
                    to-white/5
                  "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* BOUTON                                                             */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        className="mt-14 flex justify-center"
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 20 }
        }
        whileInView={
          reduceMotion
            ? undefined
            : { opacity: 1, y: 0 }
        }
        viewport={{
          once: true,
          margin: "-10% 0px",
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      >
        <a
          href="/events"
          className="
            group
            relative
            inline-flex
            items-center
            gap-3
            text-sm
            font-medium
            uppercase
            tracking-widest
            text-white/90
            md:text-base
          "
        >
          En savoir plus

          <span
            className="
              inline-block
              translate-x-0
              opacity-70
              transition-all
              duration-500
              ease-out
              group-hover:translate-x-2
              group-hover:opacity-100
            "
          >
            →
          </span>

          <span
            className="
              pointer-events-none
              absolute
              -bottom-2
              left-0
              h-[2px]
              w-full
              origin-left
              scale-x-0
              bg-gradient-to-r
              from-purple-400
              via-fuchsia-400
              to-indigo-400
              transition-transform
              duration-500
              ease-out
              group-hover:scale-x-100
            "
          />
        </a>
      </motion.div>
    </motion.div>
  );
};

export { Carousel_002 };