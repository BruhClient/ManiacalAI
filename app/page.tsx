

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
      <Features />
      <Reviews />
      <Pricing />
      
    </div>
    <Footer />
    </>
  );
}
