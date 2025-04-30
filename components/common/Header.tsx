"use client"

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ChevronRight, Sparkles } from 'lucide-react'
import { Badge } from '../ui/badge'
import { MotionDiv, MotionSpan } from '@/lib/motion-wrapper'
const headerVariants = {
  initial : {
    opacity : 0 , 

  }, 
  visible : { 
    opacity : 1
  }
}
const Header = () => {
  return (
    <MotionDiv transition={{staggerChildren : 0.5}} initial={"initial"} animate={"visible"}  className='w-full flex justify-center flex-col items-center h-[80vh] gap-5' viewport={{once : true}}  >
        <Badge className='text-lg bg-gradient-to-r from-red-400 to-primary px-4 flex gap-2 items-center border-none'><Sparkles className='animate-pulse' /> Powered by GPT-4</Badge>
        <MotionDiv variants={headerVariants} className="sm:text-5xl text-4xl font-bold leading-tight text-center max-w-2xl mx-auto">
        Learn Smarter, Faster. 
        <MotionSpan variants={headerVariants} className="block sm:text-2xl text-xl font-normal text-muted-foreground pt-2">
            Avoid complicated PDFs with cutting-edge AI and automation tools designed for efficiency.
        </MotionSpan>
        </MotionDiv>
        <MotionDiv variants={headerVariants} className='flex gap-3'>
            <Button asChild><Link href={"/signup"}>Start for free</Link></Button>
            <Button variant={"ghost"} asChild><Link scroll={false} href={"#video"} onClick={(e) => smoothScroll(e, "video")}>Learn More <ChevronRight /></Link></Button>
        </MotionDiv>
        
        
    </MotionDiv>
  )
}

const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // Prevent default anchor behavior
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};
export default Header
