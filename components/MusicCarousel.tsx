'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'

type Track = {
  id: number
  title: string
  artist: string
  image: string
}

const tracks: Track[] = [
  {
    id: 1,
    title: 'Ritmo',
    artist: 'DJ Carlos',
    image: '/images/ibiza/disque.png',
  },
  {
    id: 2,
    title: 'Night Fever',
    artist: 'Luna',
    image: '/images/ibiza/eclair.png',
  },
  {
    id: 3,
    title: 'Club Pulse',
    artist: 'M-Beat',
    image: '/images/ibiza/fleurs.png',
  },
    {
    id: 4,
    title: 'Club Pulse',
    artist: 'M-Beat',
    image: '/images/ibiza/live.png',
  },
    {
    id: 5,
    title: 'Club Pulse',
    artist: 'M-Beat',
    image: '/images/ibiza/TRAVIS.png',
  },
    {
    id: 6,
    title: 'Club Pulse',
    artist: 'M-Beat',
    image: '/images/ibiza/voiture.png',
  },
]

export default function MusicCarousel() {
  return (
    
    <div className="w-full flex justify-center  py-16 overflow-hidden">
                {/* SMALL LABEL */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-red-500" />
            <span className="text-sm uppercase tracking-widest text-white">
              Qui sommes nous
            </span>
          </div>

          {/* TITLE */}
          <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white">
            Musiques <br />
            <span className="text-purple-300">Phares</span>
          </h2>


      <div className="w-full max-w-2xl mt-[10%]">
        <Swiper
          modules={[EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop={tracks.length > 2} // IMPORTANT
          slidesPerView={1.2}
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,        // ❗️FIX
            depth: 120,        // ❗️FIX
            modifier: 1.2,    // ❗️FIX
            slideShadows: false,
          }}
          className="!overflow-visible"
        >
          {tracks.map(track => (
            <SwiperSlide key={track.id}>
              <div className="relative h-[320px] rounded-3xl overflow-hidden bg-zinc-900 shadow-xl">
                {/* IMAGE */}
                <img
                  src={track.image}
                  alt={track.title}
                  className="h-full w-full object-cover"
                  draggable={false}
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* INFOS */}
                <div className="absolute bottom-5 left-0 right-0 text-center px-4">
                  <h3 className="text-white text-lg font-semibold">
                    {track.title}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {track.artist}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
