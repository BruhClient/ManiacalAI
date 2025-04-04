

import Features from "@/components/common/Features";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Pricing from "@/components/common/Pricing";
import { Android } from "@/components/ui/magicui/androiddemo";
import { Safari } from "@/components/ui/magicui/laptopdemo";
import { MotionDiv } from "@/lib/motion-wrapper";


export default function Home() {
  return (
    <>
    <div className="flex flex-col justify-center items-center gap-9 px-3">
      <Header />

      <MotionDiv className="relative" id="demo" initial={{ opacity : 0 , y : 20}} animate={{opacity : 1 , y: 0}}>

        
        <Safari
        
          url="maniacal.ai"
          className="size-full md:block hidden"
          videoSrc="https://videos.pexels.com/video-files/27180348/12091515_2560_1440_50fps.mp4"
        />

        <Android
          className="size-full md:hidden pl-12"
          videoSrc="https://videos.pexels.com/video-files/14993748/14993748-uhd_1296_2304_30fps.mp4"
        />
      </MotionDiv>
      <Features />
      <Pricing />

      

      
 
    
      
      

     
      
      
    </div>
    <Footer />
    </>
  );
}
