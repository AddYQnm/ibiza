import Image from "next/image";

const IMAGES = [
  "/images/photo/A22A6636.jpeg",
  "/images/photo/A22A6709.jpeg",
  "/images/photo/A22A6810.jpeg",
  "/images/photo/A22A6817.jpeg",
  "/images/photo/A22A6829.jpeg",
  "/images/photo/A22A6848.jpeg",
  "/images/photo/A22A6888.jpeg",
  "/images/photo/A22A6904.jpeg",
  "/images/photo/A22A6907.jpeg",
  "/images/photo/A22A6909.jpeg",
];

export function SkiperGallery() {
  return (
    <section className="w-full px-4 py-8">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {IMAGES.map((src, i) => (
          <div key={src} className="relative break-inside-avoid overflow-hidden rounded-xl bg-zinc-900">
            <Image
              src={src}
              alt="Ibiza Club"
              width={600}
              height={900}
              className="w-full h-auto block"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              quality={70}
              priority={i < 2}
              loading={i < 2 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}