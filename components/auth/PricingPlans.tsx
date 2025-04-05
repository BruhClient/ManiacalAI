"use client"

import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '../ui/label'
import { pricingTypes } from '@/data/pricing'
import { MotionDiv } from '@/lib/motion-wrapper'
import useSessionUser from '@/hooks/use-session-user'
import PricingCard from '../PricingCard'
const PricingPlans = () => {

    const [plan,setPlan] = useState("Free")

    const user = useSessionUser()
  return (
    <div className='flex flex-col gap-6'>
      <RadioGroup defaultValue={plan} onValueChange={(value) => setPlan(value)} className='flex'>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Free" id="Free" />
                <Label htmlFor="Free">Free</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Basic" id="Basic" />
                <Label htmlFor="Basic">Basic</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="Premium" id="Premium" />
                <Label htmlFor="Premium">Premium</Label>
            </div>
        </RadioGroup>

        <div>
            {
                pricingTypes.map((pricing) => { 
                    if (pricing.name === plan) { 

                        const isCurrent = user?.planType === pricing.name.toLowerCase()

                        
                        return <MotionDiv key={pricing.name} initial={{opacity : 0,y: 10}} animate={{opacity : 1, y : 0}}>
                            <PricingCard pricing={pricing} link={pricing.link ? `${pricing.link}?prefilled_email=${user?.email}`:  "#"} linkText={isCurrent ? "You are currently on this plan" : "Get Plan"} disabled={isCurrent}/>
                    </MotionDiv>
                    }
                })
            }
        </div>
    </div>
  )
}

export default PricingPlans
