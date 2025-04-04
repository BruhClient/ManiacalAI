"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AiChat from './AiChat'
import { useChat } from 'ai/react'
import { MotionDiv } from '@/lib/motion-wrapper'

const Details = ({summary,pdfUrl , content,createdAt } : {summary :  string,pdfUrl : string,content: string,createdAt : Date}) => {
    const {
        messages , 
        input, 
        handleInputChange, 
        isLoading, 
        handleSubmit
    } = useChat({
        api : "/api/chat", 
        body : {
            content : content, 
        }
    })
    const  [mode,setMode] = useState("Summary")
  return (
    <>       

                
                    <Tabs defaultValue={mode} onValueChange={(value) => setMode(value)} className='font-serif'>
                    <TabsList>
                        <TabsTrigger value="Summary">Summary</TabsTrigger>
                        <TabsTrigger value="Ai Chat">Ai Chat</TabsTrigger>
                    </TabsList>
                    </Tabs>
                
                
            
            {
                mode === "Summary" && (
                    <MotionDiv initial={{opacity : 0 , y : 20}} whileInView={{opacity : 1 , y: 0}}>
                        <Card className='max-w-[800px]'>
                            <CardHeader>
                                <CardTitle className='text-lg font-serif'>PDF Summary</CardTitle>
                                <CardDescription>{format(createdAt,"dd-MM-yyyy")}</CardDescription>
                            </CardHeader>
                            <CardContent className='whitespace-pre-line'>
                                {summary}
                            </CardContent>
                        </Card>
                    </MotionDiv>
                    
                )
            }

{
                mode === "Ai Chat" && (
                    <MotionDiv initial={{opacity : 0 , y : 20}} whileInView={{opacity : 1 , y: 0}} className='w-full flex justify-center '>
                        <AiChat input={input} handleSubmit={handleSubmit} handleInputChange={handleInputChange} messages={messages} isLoading={isLoading}/>
                    </MotionDiv>
                    
                )
            }
            
    </>
        
    
  )
}

export default Details
