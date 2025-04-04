"use client"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import React from 'react'
import Link from 'next/link'
import DeleteProjectButton from './DeleteProjectButton'
import { Button } from '@/components/ui/button'


const ProjectCard = ({id ,name , createdAt} : {id : string,name : string,createdAt :Date }) => {
  
  return (
    

        <Card key={id} className='hover:bg-muted hover:shadow-lg h-full shadow-primary duration-150 ease-in-out transition-all'>

        <CardHeader>
            <CardTitle className="text-lg font-serif break-all">{name}</CardTitle>
            <CardDescription>{format(createdAt,"dd-MM-yyyy")}</CardDescription>
        </CardHeader>
        <CardContent className="flex h-full items-end  gap-2 justify-end">
            
            <Button asChild><Link href={`/dashboard/project/${id}`}>View Project</Link></Button>
            <DeleteProjectButton id={id}/>
        </CardContent>

        </Card>
 
      
    
    
  )
}

export default ProjectCard
