"use client";

import { useReducedMotion } from "framer-motion";
import { Carousel_002 } from "./HiIbizaBackground";

type CarouselImage = {
  src: string;
  mobileSrc: string;
  alt: string;
};

type Skiper48Props = {
  images: CarouselImage[];
};

export const Skiper48 = ({
  images,
}: Skiper48Props) => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-x-hidden">
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