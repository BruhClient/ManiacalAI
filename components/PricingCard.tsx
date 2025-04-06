"use client"


import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Check, X } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Pricing } from '@/data/pricing'



const PricingCard = ({pricing,link,linkText,disabled = false} : {pricing : Pricing,link? : string,linkText? : string,disabled?:boolean}) => {
  return (
    <Card className={cn(pricing.isPopular && "border-primary hover:shadow-primary shadow-xl duration-200 ease-in-out transition-all","relative")}>
    
                                {pricing.isPopular && <div className='absolute top-[-15px] left-[50%] translate-x-[-50%] bg-primary px-3 text-sm py-1 rounded-lg font-serif'>Most Popular</div>}
                            <CardHeader>
                                <CardTitle className='text-2xl font-serif '>{pricing.name}</CardTitle>
                                <CardDescription>{pricing.description}</CardDescription>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-4'>
                                <div>
                                    {pricing.discounts && <span className='line-through text-muted-foreground text-start pr-2'>${pricing.discounts}</span>}
                                    
                                    <span className='text-4xl font-serif font-bold'>${pricing.price}</span> /month
                                </div>
                                <Button className='w-full' variant={"outline"} disabled={true} asChild={!disabled}>
                                    <Link href={link ? link : "/signin"} target={link && "_blank"} >
                                        {linkText ? linkText : "Get Started" }
                                    </Link>
                                </Button>
    
                                <div className='flex flex-col gap-2 py-5 px-1'>
                                    <div className='flex items-center text-lg gap-3 font-serif '>
                                        <Check /> {pricing.numOfProjects} projects
                                    </div>
                                    <div className='flex items-center text-lg gap-3 font-serif '>
                                        {pricing.support ? <Check /> : <X />} 24/7 support
                                    </div>
                                    <div className='flex items-center text-lg gap-3 font-serif '>
                                        <Check /> {pricing.fileSize}MB File Upload
                                    </div>
                                    <div className='flex items-center text-lg gap-3 font-serif '>
                                        {pricing.sharableLinks ? <Check /> : <X />} Sharable links
                                    </div>
                                    <div className='flex items-center text-lg gap-3 font-serif '>
                                        {pricing.AiAnaysis ? <Check /> : <X />} Unlimited Ai Chats
                                    </div>
                                    

                                    
                                </div>
                            </CardContent>
                        </Card>
  )
}

export default PricingCard
