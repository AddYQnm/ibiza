import fs from "fs";
import path from "path";

const eventsDirectory = path.join(
  process.cwd(),
  "public/images/events"
);

const allowedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
];

function getImages(directory: string) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) =>
      allowedExtensions.includes(
        path.extname(file).toLowerCase()
      )
    )
    .sort((a, b) => a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: "base",
    }));
}

export function getEventImages() {
  const desktopDirectory = path.join(
    eventsDirectory,
    "desktop"
  );

  const mobileDirectory = path.join(
    eventsDirectory,
    "mobile"
  );

  const desktopImages = getImages(desktopDirectory);
  const mobileImages = getImages(mobileDirectory);

  return desktopImages.map((desktopFile, index) => {
    const mobileFile = mobileImages[index];

    return {
      src: `/images/events/desktop/${desktopFile}`,

      mobileSrc: mobileFile
        ? `/images/events/mobile/${mobileFile}`
        : `/images/events/desktop/${desktopFile}`,

      alt: `Événement ${index + 1}`,
    };
  });
}