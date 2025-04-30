import React from 'react'
import {MotionProps} from "motion/react"
import { MotionDiv } from '@/lib/motion-wrapper'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
import { Bot, Save, Send, Share, User } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Switch } from '../ui/switch'





const Features = () => {

    
  return (
  
    <div className='w-full'>
        <MotionDiv initial={"initial"} whileInView={"visible"} transition={{staggerChildren: 0.05}} id='features'  className='grid w-full mx-auto max-w-6xl grid-cols-12 gap-4 '  viewport={{margin : "-200px"}}>
                    <HeaderBlock />
                    
                    <DetailBlock />

                    <ContentBlock />
                    
                    

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
    
    
        <Block className='md:col-span-6 col-span-12 '>
                <div className='flex flex-col gap-1 h-full'>

                    <div className='font-serif font-semibold'>
                        Summarize chats and share the insight—instantly.
                    </div>
                    <div className='text-sm'>
                    AI-powered summaries with links you can share anywhere.
                    </div>

                    <div className='flex flex-col gap-2 py-2 font-serif text-sm justify-center flex-1 '>
                        <div className='bg-background w-fit px-3 py-2 rounded-lg text-foreground'>
                            Yo , How do you keep aceing your exams ?
                        </div>
                        <div className='self-end bg-primary w-fit px-3 py-2 rounded-lg text-primary-foreground'>
                            I started using Maniacal AI
                        </div>
                        <div className='bg-background w-fit px-3 py-2 rounded-lg text-foreground'>
                            What's that ?
                        </div>
                        <div className='self-end bg-primary w-fit px-3 py-2 rounded-lg text-primary-foreground'>
                            Let me send you a summary link 
                        </div>
                        
                    </div>

                </div>
        </Block>
        <Block className='md:col-span-6 col-span-12 '>
                <div className='flex flex-col gap-1 h-full'>

                    <div className='font-serif font-semibold'>
                        Secure distribution of smart summaries.
                    </div>
                    <div className='text-sm'>
                        Enter password to unlock access — your summaries stay private.
                    </div>

                    <div className='flex-1 flex flex-col justify-center items-center pt-4 '>
                    
                            <Card className='max-w-xl w-full'>
                                <CardHeader>
                                    <CardTitle className='flex gap-2 items-center'><Share /> Share</CardTitle>
                                    <CardDescription >
                                        Configure a password . Viewers will be prompt to enter the password before viewing the document. 
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='flex flex-col gap-2'>
                                    <div className="flex flex-row items-center px-5 justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <div className='font-bold'>Share with others</div>
                                            <div className='text-sm text-muted-foreground'>
                                            Your project link will be protected and unaccessable when needed
                                            </div>
                                        </div>
                                        
                                            <Switch
                                            
                                            />

                                            
                                    
                                    </div>
                                    <Button  className='w-full'><Save />Save Changes</Button>
                                    
                                </CardContent>
                            </Card>
                    
                        
                    </div>
                    
                </div>
        </Block>
    </>
}


 



const ContentBlock = async () => { 

   
    return <Block className='col-span-12'>
    <div className='flex flex-col gap-1 h-full'>

        <div className='font-serif font-semibold'>
            Talk with Ai
        </div>
        <div className='text-sm'>
            Ask questions, get instant insights, and interact with your documents like never before.
        </div>

        <div className='flex-1 flex flex-col '>
        
                <Card>
                    <CardHeader>
                        <div className='flex gap-3 items-center'>
                    
                            <div className='bg-primary animate-pulse p-2 rounded-full'>
                                <Bot />
                            </div>
                            
                            <div className='flex flex-col gap-1 pt-2'>
                                <CardTitle className='font-serif'>Maniacal Ai Bot</CardTitle>
                                <CardDescription className='text-sm'>AI Assistant</CardDescription>
                            </div>
                        
                        </div>
                        <Separator className='mt-2' />
                    </CardHeader>
                    <CardContent className='flex flex-col gap-3'>
                        <div className='w-full text-primary-foreground flex justify-end items-center gap-2 font-serif' >
        
                            <div className='w-fit bg-primary px-2 py-1 rounded-lg whitespace-pre-line text-sm'>What is this document about ?</div>
                            <User />
                        </div>
                        <div  className='w-full flex justify-start items-center gap-2 font-serif '>
                                        <Bot className='text-foreground' />
                                        <div className='w-fit bg-secondary px-2 text-sm py-1 rounded-lg whitespace-pre-line '>The document is a comprehensive guide on conducting geographical investigations, likely intended for educational purposes. It aims to teach students about geography fieldwork and research methods. The guide covers learning outcomes related to living with rivers and urban living, introduces fieldwork and research processes, and details data collection, presentation, and evaluation methods</div>
                        </div>
                        <div className='w-full text-primary-foreground flex justify-end items-center gap-2 font-serif' >
        
                            <div className='w-fit bg-primary px-2 py-1 rounded-lg whitespace-pre-line text-sm'>Give me an outline</div>
                            <User />
                        </div>
                        <div  className='w-full flex justify-start items-center gap-2 font-serif '>
                                        <Bot className='text-foreground' />
                                        <div className='w-fit bg-secondary px-2 text-sm py-1 rounded-lg whitespace-pre-line '>The document is a guide for teaching students how to conduct geographical investigations. It outlines learning outcomes related to understanding flood risks, urban liveability, and the needs of the elderly. The document emphasizes the importance of fieldwork and research, detailing methods for collecting both quantitative and qualitative data. It describes primary data collection through surveys, interviews, and observations, and secondary data from existing sources. Sampling techniques such as random, systematic, and stratified sampling are explained. The document also covers questionnaire design, data collection methods, and cartographic techniques for data presentation, including various graph and map types. Overall, it provides a structured approach to conducting and presenting geographical research.</div>
                        </div>

                        

                    </CardContent>
                    <CardFooter className='flex gap-2'>
                        <Input disabled={true} placeholder='Enter a message'/>
                        <Button size={"icon"} disabled={true}><Send /></Button>
                    </CardFooter>
                
                </Card>
                
        
        
            
        </div>
        
    </div>
</Block>
    
    
}


 


