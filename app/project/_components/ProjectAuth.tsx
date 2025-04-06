"use client"
import { projects } from '@/db/schema'
import { InferModel } from 'drizzle-orm'
import React, { useState } from 'react'
import ProjectDetails from './ProjectDetails'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'

const ProjectAuth = ({project,isOwner,OwnerEmail } : {project : InferModel<typeof projects>,isOwner : boolean,OwnerEmail : string}) => {

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
            <CardDescription>
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
