import { getEventImages } from "@/lib/events";
import { Skiper48 } from "@/components/HiIbizaStackCards";

export function Skiper48Loader() {
  const images = getEventImages();

  return <Skiper48 images={images} />;
}