

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
      <Features />
      <Pricing />

      

      
 
    
      
      

     
      
      
    </div>
    <Footer />
    </>
  );
}
