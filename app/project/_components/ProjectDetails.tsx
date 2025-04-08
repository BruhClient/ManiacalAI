"use client"

import { Button } from '@/components/ui/button'
import { projects } from '@/db/schema'
import { InferModel } from 'drizzle-orm'
import Link from 'next/link'
import React from 'react'
import ShareButton from './Sharebutton'
import DeleteProjectButton from '@/app/dashboard/_component/DeleteProjectButton'
import Details from './Details'
import { ChevronLeft } from 'lucide-react'
import useSessionUser from '@/hooks/use-session-user'

const ProjectDetails = ({project,isOwner,decryptedPassword}:{project : InferModel<typeof projects>,isOwner : boolean,decryptedPassword : string }) => {

  const user = useSessionUser()
  return (
    <div className='relative'>
      <div className='flex justify-center w-full flex-col items-center gap-3 px-2 pb-8 pt-10'>
      <div className='flex flex-col items-center gap-2'>
        <div className='text-3xl font-serif font-bold break-words text-center'>
          {project.name}
        </div>
        <div  className=''>
          <Button variant={"link"} className='text-muted-foreground text-sm break-all line-clamp-1 break-words' asChild>
            <Link href={project.pdfUrl} target='_blank' className=''>View Original PDF</Link>
          </Button>
          
        </div>
        {
          isOwner && <div className='flex gap-2'>
          
          
          <ShareButton id={project.id} isSharable={project.isSharable!} password={decryptedPassword} />
          <DeleteProjectButton id={project.id}/>
          
        </div>
        }
        
        
      </div>


      <Details summary={project.summary} isOwner={isOwner} content={project.content!} createdAt={project.createdAt}/>

      <Button className='absolute top-0 left-5' size={"icon"} asChild>
            <Link href={user ? "/dashboard" : "/"}><ChevronLeft /></Link>
      </Button>
      
    </div>
    </div>
  )
}

export default ProjectDetails
