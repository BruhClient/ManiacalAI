"use client"
import { projects } from '@/db/schema'
import { InferModel } from 'drizzle-orm'
import React, { useState } from 'react'
import ProjectDetails from './ProjectDetails'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-react'
import { MotionDiv } from '@/lib/motion-wrapper'


const ProjectAuth = ({project,isOwner,OwnerEmail, OwnerAvatar,OwnerName,decryptedPassword } : {decryptedPassword : string,project : InferModel<typeof projects>,isOwner : boolean,OwnerEmail : string,OwnerAvatar : string | null,OwnerName : string | null}) => {

  const [isAuthorized,setIsAuthorized] = useState(isOwner)

  const [error,setError] = useState("")

  const [password,setPassword] = useState("")
  
  const onClick = async () => {
    
    
    
    if (password === decryptedPassword) { 
      setIsAuthorized(true)
    } else { 
      setError("Password is incorrect")
    }
  }
  return (
    <div>

      {isAuthorized ? <ProjectDetails project={project} isOwner={isOwner} decryptedPassword={decryptedPassword}/> : <MotionDiv initial={{opacity : 0 , y: 20}} animate={{opacity : 1, y: 0}} className='w-full h-[90vh] flex justify-center items-center'>
        <Card>
          <CardHeader className='flex flex-col gap-5'>

            <CardTitle className='break-all'>
              {project.name}
            </CardTitle>
            <CardDescription className='flex gap-2 items-center' >
              <Avatar className="w-7 h-7" >
                  <AvatarImage src={OwnerAvatar ?? ""} alt="Profile" className="object-cover" ></AvatarImage>
                  <AvatarFallback><User size={12}/></AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <div className="font-serif text-foreground text-sm">
                  {OwnerName}
                  
                </div>
                <div className='text-sm'>
                  {OwnerEmail}
                </div>
              </div>
              
            </CardDescription>
            
            
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              <Input value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Enter project password'/>
              <Button onClick={() => onClick()}>Submit</Button>
            </div>
            
            {error && <div className='w-full bg-red-400 text-center font-serif text-sm py-2 rounded-lg'>
              {error}
            </div> }
            
          </CardContent>

            
          
         
        </Card>
        
      </MotionDiv> }
      
    </div>
  )
}

export default ProjectAuth
