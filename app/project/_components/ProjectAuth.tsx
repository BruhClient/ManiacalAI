"use client"
import { projects } from '@/db/schema'
import { InferModel } from 'drizzle-orm'
import React, { useState } from 'react'
import ProjectDetails from './ProjectDetails'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-react'

const ProjectAuth = ({project,isOwner,OwnerEmail, OwnerAvatar } : {project : InferModel<typeof projects>,isOwner : boolean,OwnerEmail : string,OwnerAvatar : string | null}) => {

  const [isAuthorized,setIsAuthorized] = useState(isOwner)

  const [error,setError] = useState("")

  const [password,setPassword] = useState("")
  
  const onClick = () => { 
    if (password === project.password) { 
      setIsAuthorized(true)
    } else { 
      setError("Password is incorrect")
    }
  }
  return (
    <div>

      {isAuthorized ? <ProjectDetails project={project} isOwner={isOwner}/> : <div className='w-full h-[90vh] flex justify-center items-center'>
        <Card>
          <CardHeader>
            <CardTitle>
              {project.name}
            </CardTitle>
            <CardDescription className='flex items-center gap-2'>
            <Avatar className="w-6 h-6" >
                <AvatarImage src={OwnerAvatar ?? ""} alt="Profile" className="object-cover" ></AvatarImage>
                <AvatarFallback><User size={12}/></AvatarFallback>
            </Avatar>
            {OwnerEmail}
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
        
      </div> }
      
    </div>
  )
}

export default ProjectAuth
