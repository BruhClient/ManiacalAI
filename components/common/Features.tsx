import React from 'react'
import {MotionProps} from "motion/react"
import { MotionDiv } from '@/lib/motion-wrapper'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
import { AnimatedBeamDemo } from './Beam'





const Features = () => {

    
  return (
  
    <div className='w-full'>
        <MotionDiv initial={"initial"} whileInView={"visible"} transition={{staggerChildren: 0.05}} id='features'  className='grid w-full mx-auto max-w-6xl grid-cols-12 gap-4'>
                    <HeaderBlock />
                    
                    <DetailBlock />
                    
                    

        </MotionDiv>
    </div>
    
      
    
  )
}

export default Features





type BlockProps =  {

    
    className? : string ,
    children? : React.ReactNode
} & MotionProps ;

const Block = ({className,children, ...rest} : BlockProps) => {
  return (
    <MotionDiv

        variants={{
            initial : {
                scale : 0.5, 
                y:50 , 
                opacity : 0
            }, 
            visible: {
                scale : 1 , 
                y: 0 , 
                opacity: 1 ,
            }
        }}
        
       
        
        className={cn('col-span-4 rounded-lg border-zinc-700 bg-muted p-6', className)}
     >
      {children}
    </MotionDiv>
  )
}

const HeaderBlock = () => { 
    return <Block className='col-span-12 row-span-2 md:col-span-6 flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>

            <div className='font-serif font-semibold'>
                Summarise PDFs
            </div>
            <div className='text-sm'>
                Our AI extracts key insights, saves you time, and helps you focus on what matters most.
            </div>
            
        </div>

        
         <Card className='w-full flex-1'>
            <CardHeader>
                <CardTitle>Summary of H2 Maths</CardTitle>
                <CardDescription>23 March 2025</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-3 h-full'>

                <div className='flex flex-col'>
                    <div>
                        # Document Details
                    </div>
                    <div className='pl-3 flex items-center gap-3'>
                        • 📑 Type: <Skeleton className='w-[100px] h-4'/>
                    </div>
                    <div className='pl-3 flex items-center gap-3'>
                        • 👥 For: <Skeleton className='w-[100px] h-4'/>
                    </div>
                
                </div>

                <div className='flex flex-col'>
                    <div>
                        # Main Points
                    </div>
                    <div className='pl-3 flex items-center gap-3'>
                        • <Skeleton className='w-[100px] h-4'/>
                    </div>
                    <div className='pl-3 flex items-center gap-3'>
                        • <Skeleton className='w-[100px] h-4'/>
                    </div>
                    <div className='pl-3 flex items-center gap-3'>
                        • <Skeleton className='w-[100px] h-4'/>
                    </div>
                
                </div>

                <div className='flex flex-col gap-2'>
                    <Skeleton className='w-full h-5'/>
                    <Skeleton className='w-full h-5'/>
                    <Skeleton className='w-full h-5'/>
                    <Skeleton className='w-[50%] h-5'/>
                </div>
                <div className='flex flex-col gap-2'>
                    <Skeleton className='w-full h-5'/>
                    <Skeleton className='w-full h-5'/>
                    <Skeleton className='w-full h-5'/>
                    <Skeleton className='w-[50%] h-5'/>
                </div>
                <div className='flex-1 flex flex-col gap-2 justify-end '>
                    <Skeleton className='w-full h-4'/>
                    <Skeleton className='w-full h-4'/>
                    
                </div>

            </CardContent>
         </Card>
        
            
       
    </Block>
}


const DetailBlock = async () => { 

   
    return <>
    <Block className='md:col-span-6 col-span-12'>
            <div className='flex flex-col gap-1 h-full'>

                <div className='font-serif font-semibold'>
                    Talk with Ai
                </div>
                <div className='text-sm'>
                    Ask questions, get instant insights, and interact with your documents like never before.
                </div>

                <div className='flex-1 flex items-center justify-center'>
                
                    
                    <AnimatedBeamDemo />
                
                
                    
                </div>
                
            </div>
    </Block>
    <Block className='md:col-span-6 col-span-12 '>
            <div className='flex flex-col gap-1 h-full'>

                <div className='font-serif font-semibold'>
                    Share knowledge, spark discussions.
                </div>
                <div className='text-sm'>
                    Easily share PDFs and insights with your community to collaborate and learn together.
                </div>

                <div className='flex flex-col gap-2 py-2 font-serif text-sm justify-center flex-1 '>
                    <div className='bg-background w-fit px-3 py-2 rounded-lg text-foreground'>
                        Yo , How do you keep aceing your exams ?
                    </div>
                    <div className='self-end bg-primary w-fit px-3 py-2 rounded-lg text-primary-foreground'>
                        I started using Maniacal.Ai
                    </div>
                    <div className='bg-background w-fit px-3 py-2 rounded-lg text-foreground'>
                        What's that ?
                    </div>
                    <div className='self-end bg-primary w-fit px-3 py-2 rounded-lg text-primary-foreground'>
                        Let me send you a summary !
                    </div>
                    
                </div>

            </div>
    </Block>
    </>
}


 