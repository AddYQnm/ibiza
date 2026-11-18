"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const IG_URL = "https://www.instagram.com/ibizaclubrouen/";

type InstagramPost = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="white"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
    </svg>
  );
}

export function InstagramSection() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInstagram() {
      try {
        const response = await fetch("/api/instagram");

        if (!response.ok) {
          throw new Error("Instagram unavailable");
        }

        const data = await response.json();

        setPosts(data.data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadInstagram();
  }, []);

  return (
    <section className="relative overflow-hidden py-24 md:py-32">

      {/* Background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-b
          from-black
          via-purple-900
          via-pink-900
          to-black
          opacity-20
          blur-3xl
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-10">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-[2px] w-12 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-300" />

            <span className="text-xs uppercase tracking-[0.35em] text-white/70">
              Nos réseaux sociaux
            </span>
          </div>

          <h2 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            Un Instagram <br />

            <span className="text-purple-300">
              Pas comme les autres
            </span>
          </h2>
        </div>

        {/* Instagram Grid */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="
                  aspect-[3/4]
                  animate-pulse
                  rounded-xl
                  bg-white/10
                "
              />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            {posts.map((post) => {
              const image =
                post.media_type === "VIDEO"
                  ? post.thumbnail_url
                  : post.media_url;

              return (
                <a
                  key={post.id}
                  href={post.permalink || IG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    relative
                    aspect-[3/4]
                    overflow-hidden
                    rounded-xl
                  "
                >
                  {image && (
                    <Image
                      src={image}
                      alt={
                        post.caption
                          ? post.caption.slice(0, 100)
                          : "Publication Instagram Ibiza Club Rouen"
                      }
                      fill
                      sizes="
                        (max-width: 768px) 50vw,
                        25vw
                      "
                      className="
                        object-cover
                        transition-transform
                        duration-500
                        ease-out
                        group-hover:scale-105
                      "
                      loading="lazy"
                      quality={75}
                    />
                  )}

                  {/* Hover overlay */}
                  <div
                    className="
                      absolute inset-0
                      bg-black/30
                      opacity-0
                      transition-opacity
                      duration-300
                      group-hover:opacity-100
                    "
                  />

                  {/* Instagram icon */}
                  <div
                    className="
                      absolute
                      right-3
                      top-3
                      translate-y-2
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:translate-y-0
                      group-hover:opacity-100
                    "
                  >
                    <InstagramIcon />
                  </div>
                </a>
              );
            })}

          </div>
        ) : (
          <div className="py-10 text-center text-white/50">
            Instagram momentanément indisponible.
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 flex justify-center">

          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-gradient-to-r
              from-[#f09433]
              via-[#dc2743]
              to-[#bc1888]
              px-8
              py-3
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-pink-500/30
              transition-transform
              duration-200
              hover:scale-105
              active:scale-95
              md:text-base
            "
          >
            <InstagramIcon />

            Follow us on Instagram
          </a>

        </div>

      </div>
    </section>
  );
}