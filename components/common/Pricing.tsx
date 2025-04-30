import { pricingTypes } from '@/data/pricing'
import React from 'react'
import { MotionDiv } from '@/lib/motion-wrapper'
import PricingCard from '../PricingCard'


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
            <MotionDiv className='flex flex-col gap-2' variants={cardVariants} initial={"initial"} whileInView={"animate"}  viewport={{margin : "-200px"}} transition={{ duration: 0.5 }}>
                <div className='text-3xl font-serif font-bold'>
                    Choose a plan that is right for you
                </div>
                <div className='text-lg'>
                    Try our software for free. Switch plans or cancel any time.
                </div>
                
            </MotionDiv>
            <MotionDiv className='grid-cols-1 lg:grid-cols-3 grid w-full  gap-3' whileInView={"animate"} initial={"initial"} transition={{staggerChildren : 0.5}}  viewport={{margin : "-200px"}} >
                {pricingTypes.map((pricing) => { 

                    
                    return <MotionDiv key={pricing.name} variants={cardVariants} >
                        <PricingCard pricing={pricing} />
                    </MotionDiv>
                })}
            </MotionDiv>
        </div>
        
    </div>

    
  )
}

export default Pricing
