import AboutIbizaSection from "@/components/AboutIbizaSection";
import EditorialSection from "@/components/EditorialSection";
import HeroVideo from "@/components/HeroVideo";
import  { Skiper48 } from "@/components/HiIbizaStackCards";
import IbizaVideoCard from "@/components/IbizaVideoCard";
import { InstagramSection } from "@/components/InstagramSection";
import MusicCarousel from "@/components/MusicCarousel";
import PixelBlast from "@/components/PixelBlast";
import { Skiper30 } from "@/components/Galerie";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function Home() {
  return (
    <>
    <div className="mt-[-55px]">
       <HeroVideo />
    
    <EditorialSection />


 
<Skiper48 />
<AboutIbizaSection />
<main>

      
      <Skiper30 />

    </main>
<InstagramSection />
  </div>
    </>
    
  );
}
