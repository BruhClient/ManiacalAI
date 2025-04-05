import { pricingTypes } from '@/data/pricing'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Check, X } from 'lucide-react'
import { MotionDiv } from '@/lib/motion-wrapper'
import { cn } from '@/lib/utils'
import Link from 'next/link'


const cardVariants = {
    initial : { 
     opacity : 0, 
     y : 20, 
    }, 
    animate : { 
      opacity : 1, 
      y: 0 ,
    }
}
const Pricing = () => {
  return (

         <div className='w-full flex justify-center flex-col items-center' id='pricing'>
        
        <div className='max-w-6xl w-full flex flex-col gap-3'>
            <MotionDiv className='flex flex-col gap-2' variants={cardVariants} initial={"initial"} whileInView={"animate"}>
                <div className='text-3xl font-serif font-bold'>
                    Choose a plan that is right for you
                </div>
                <div className='text-lg'>
                    Try our basic plan for free. Switch plans or cancel any time.
                </div>
                
            </MotionDiv>
            <MotionDiv className='grid-cols-1 lg:grid-cols-3 grid w-full  gap-3' whileInView={"animate"} initial={"initial"} transition={{staggerChildren : 0.5}} >
                {pricingTypes.map((pricing) => { 

                    
                    return <MotionDiv key={pricing.name} variants={cardVariants} >
                        <Card className={cn(pricing.isPopular && "border-primary hover:shadow-primary shadow-xl duration-200 ease-in-out transition-all","relative")}>

                            {pricing.isPopular && <div className='absolute top-[-15px] left-[50%] translate-x-[-50%] bg-primary px-3 text-sm py-1 rounded-lg font-serif'>Most Popular</div>}
                        <CardHeader>
                            <CardTitle className='text-lg font-serif'>{pricing.name} plan</CardTitle>
                            <CardDescription>{pricing.description}</CardDescription>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-4'>
                            <div>
                                <span className='text-3xl font-serif font-bold'>${pricing.price}</span> /month
                            </div>
                            <Button className='w-full' variant={"outline"} asChild><Link href={"/signin"}>Get Started</Link></Button>

                            <div className='flex flex-col gap-2 py-5 px-1'>
                                <div className='flex items-center text-lg gap-3 font-serif '>
                                    {pricing.AiAnaysis ? <Check /> : <X />} Ai Chat
                                </div>
                                <div className='flex items-center text-lg gap-3 font-serif '>
                                    <Check /> {pricing.numOfProjects} projects
                                </div>
                                <div className='flex items-center text-lg gap-3 font-serif '>
                                    {pricing.support ? <Check /> : <X />} 24/7 support
                                </div>
                                <div className='flex items-center text-lg gap-3 font-serif '>
                                    {pricing.community ? <Check /> : <X />} Community
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    </MotionDiv>
                })}
            </MotionDiv>
        </div>
        
    </div>

    
  )
}

export default Pricing
