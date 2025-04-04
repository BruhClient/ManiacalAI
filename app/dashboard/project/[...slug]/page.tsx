
import { auth } from '@/lib/auth'
import { getProject } from '@/server/db/projects'
import { redirect } from 'next/navigation'
import React from 'react'
import Details from './_components/details'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronLeft, Trash } from 'lucide-react'

const ProjectDetailPage = async ({params} : {params : Promise<{slug : string}>}) => {

    const id  = (await params).slug[0]

    const project = await getProject(id)

    if (!project) redirect("/dashboard")
    const session = await auth()

    if (!session || session.user.id != project.userId) { 
      redirect("/dashboard")
    }
  


  return (
    <div className='flex justify-center w-full flex-col items-center gap-3 px-2 pt-3 pb-8'>
      <div className='flex flex-col items-center gap-2'>
        <div className='text-3xl font-serif font-bold break-words text-center'>
          {project.name}
        </div>
        <div  className=''>
          <Button variant={"link"} className='text-muted-foreground text-sm break-all line-clamp-1 break-words' asChild>
            <Link href={project.pdfUrl} target='_blank' className=''>View Original PDF</Link>
          </Button>
          
        </div>

        <div className='flex gap-2'>

          <Button variant={"outline"} asChild>
            <Link href={"/dashboard"}><ChevronLeft /> Back to dashboard</Link>
          </Button>
          <Button><Trash /> Delete Project</Button>
          
        </div>
        
      </div>


      <Details summary={project.summary} pdfUrl={project.pdfUrl} content={project.content!} createdAt={project.createdAt}/>
      
    </div>
  )
}

export default ProjectDetailPage
