

import Features from "@/components/common/Features";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Pricing from "@/components/common/Pricing";
import Reviews from "@/components/common/Reviews";


export default function Home() {
  return (
    <>
    <div className="flex flex-col justify-center items-center gap-9 px-3">
      <Header />
      <iframe src="https://www.youtube.com/embed/g9G218IncLw?si=D0BujSPHJCgu9cuK"
      className="max-w-[1150px] bg-red-400 w-full h-[700px]" 
      title="YouTube video player" 
      id="video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
      </iframe>
      <Features />
      <Reviews />
      <Pricing />
      
    </div>
    <Footer />
    </>
  );
}
