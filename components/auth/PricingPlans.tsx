"use client"

import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '../ui/label'
import { pricingTypes } from '@/data/pricing'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { MotionDiv } from '@/lib/motion-wrapper'
import { capitalizeFirstLetter, cn } from '@/lib/utils'
import useSessionUser from '@/hooks/use-session-user'
const PricingPlans = ({currentPlan} : {currentPlan : string}) => {

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
                        return <MotionDiv key={pricing.name} initial={{opacity : 0,y: 10}} animate={{opacity : 1, y : 0}}>
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

                            {capitalizeFirstLetter(currentPlan) === pricing.name ? <Button className='w-full' disabled={true}>You are currently on this plan</Button> : <Button className='w-full' variant={"outline"} asChild><Link href={pricing.link ? `${pricing.link}?prefilled_email=${user?.email}` :  "#"} target='_blank'>Activate Plan</Link></Button> }
                            

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
                    }
                })
            }
        </div>
    </div>
  )
}

export default PricingPlans
