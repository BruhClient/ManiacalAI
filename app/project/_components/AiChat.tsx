"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Bot, Send, User } from 'lucide-react'
import React, { ChangeEvent, useEffect, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useSessionUser from '@/hooks/use-session-user'
import { UIMessage } from 'ai'
import { MotionDiv } from '@/lib/motion-wrapper'

type AiChatProps = { 
  messages : UIMessage[], 
  handleSubmit : () => void, 
  input : string , 
  isLoading : boolean, 
  handleInputChange : (e : ChangeEvent<HTMLInputElement>) => void, 
  isAuthorized : boolean , 
}
const AiChat = ({messages,handleSubmit,input,handleInputChange,isLoading,isAuthorized} : AiChatProps) => {
    

    const user = useSessionUser()
    const scrollRef = useRef<HTMLDivElement>(null)
    useEffect(() => { 
      if (scrollRef.current) { 
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    },[messages])

    console.log(isAuthorized)
  return (
    <Card className='max-w-[800px] w-full h-[80vh]'>
      <CardHeader >
        

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
      <CardContent className='h-full flex flex-col gap-2 overflow-hidden'>


          {isAuthorized ? <div className='flex flex-col gap-3 overflow-y-auto text-sm h-full py-2 px-2' ref={scrollRef}>

          
            {messages.map((message) => {

            if (message.role === "assistant") { 
                return <MotionDiv initial={{ opacity : 0 , y : 20}} animate={{opacity : 1 , y: 0}}  className='w-full flex justify-start items-center gap-2 font-serif ' key={message.id}>
                <Bot className='text-foreground' />
                <div className='w-fit bg-secondary px-2 py-1 rounded-lg whitespace-pre-line '>{message.content}</div>
            </MotionDiv>
            }
            return <MotionDiv initial={{ opacity : 0 , y : 20}} animate={{opacity : 1 , y: 0}} className='w-full text-primary-foreground flex justify-end items-center gap-2 font-serif' key={message.id}>
                
                <div className='w-fit bg-primary px-2 py-1 rounded-lg whitespace-pre-line'>{message.content}</div>
                <Avatar>
                    <AvatarImage src={user?.image}></AvatarImage>
                    <AvatarFallback><User/></AvatarFallback>
                </Avatar>
                </MotionDiv>
            })}

            {isLoading && <MotionDiv initial={{ opacity : 0 , y : 20}} animate={{opacity : 1 , y: 0}} className='w-full text-primary-foreground flex justify-start items-center gap-2 font-serif' key={"loading"}>
                <Bot className='text-foreground' />
                <div className='w-fit bg-primary px-2 py-1 rounded-lg flex items-center'>Thinking...</div>
            </MotionDiv>}
        </div> : <div className='h-full text-center text-muted-foreground font-serif flex justify-center items-center text-sm'>Only Basic and Premium members can access shared ai chat</div>}
        
        <form className='flex gap-2' onSubmit={handleSubmit}>
            <Input placeholder='Enter a message' onChange={handleInputChange} disabled={!isAuthorized} value={input}/>
            <Button size={"icon"} disabled={isLoading || !isAuthorized}><Send /></Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default AiChat
