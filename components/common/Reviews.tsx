import { MotionDiv } from '@/lib/motion-wrapper'
import React from 'react'
import { Card, CardDescription ,CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
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


const reviews = [
    {
        name : "Travis" , 
        occupation : "Student from NTU", 
        message : "Maniacal AI saved me hours of reading. I uploaded a 50-page report and got the key insights in minutes. Total game-changer!", 
        avatar : ""

    },
    {
        name : "Jonathan" , 
        occupation : "Student from NUS", 
        message : "I honestly didn’t expect to be this impressed. I threw a dense, jargon-filled 80-page technical PDF at Maniacal AI, and within seconds it gave me a clear, concise summary and answered questions I didn’t even know I had. It’s like having a superpowered research assistant on standby 24/7. I’ve used other AI tools before, but Maniacal AI feels sharper, faster, and more accurate. If you deal with a lot of documents, this thing is a lifesaver.", 
        avatar : ""

    },
    {
        name : "Kelly" , 
        occupation : "Student from SMU", 
        message : "As a grad student drowning in academic papers, Maniacal AI has been a total lifesaver. I used to spend hours skimming through PDFs trying to find the important bits—now I just upload them and get straight to the good stuff. It even breaks down complex sections in a way that actually makes sense. Honestly feels like cheating (the good kind). Can’t believe I ever studied without it.", 
        avatar : ""

    }
]

const Reviews = () => {
  return (
    <div className='w-full flex justify-center flex-col items-center' id='pricing'>
        
        <div className='max-w-6xl w-full flex flex-col gap-3'>
            <MotionDiv className='flex flex-col gap-2' variants={cardVariants} initial={"initial"} whileInView={"animate"}>
                <div className='text-3xl font-serif font-bold'>
                What People Are Saying
                </div>
                <div className='text-lg'>
                Hear from those who've experienced it firsthand.
                </div>
                
            </MotionDiv>

            <MotionDiv className='flex flex-col gap-2' whileInView={"animate"} initial={"initial"} transition={{staggerChildren : 0.5}} >
               {reviews.map((review,index) => {

                return <MotionDiv key={index} variants={cardVariants}>
                    
                    <Card className='hover:bg-muted transition-all duration-200 ease-in-out'>
                            <div className='flex flex-col gap-5 px-4'>
                                <div className='font-serif text-lg px-3'>
                                    {review.message}
                                </div>
                                
                        

                            

                                <div className='flex gap-2 items-center'>
                                    <Avatar className='w-10 h-10'>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    
                                    <div className='flex flex-col gap-1 '>
                                        <CardTitle className='font-serif'>{review.name}</CardTitle>
                                        <CardDescription>{review.occupation}</CardDescription>
                                    </div>
                                </div>
                            </div>
                            

                    </Card>
                </MotionDiv>
               })}
            </MotionDiv>
            
        </div>
        
    </div>

  )
}

export default Reviews
