import HeroVideo from "@/components/HeroVideo";
import EditorialSection from "@/components/EditorialSection";
import AboutIbizaSection from "@/components/AboutIbizaSection";
import { SkiperGallery } from "@/components/Galerie";
import { InstagramSection } from "@/components/InstagramSection";
import { Skiper48Loader } from "@/components/Skiper48loader";


export default function Home() {
  return (
    <div className="mt-[-55px]">
      <HeroVideo />
      <EditorialSection />
      <Skiper48Loader />
      <AboutIbizaSection />
      <SkiperGallery />
      <InstagramSection />
    </div>
  );
}