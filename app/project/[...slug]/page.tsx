

import { auth } from '@/lib/auth'
import { getProject } from '@/server/db/projects'
import { redirect } from 'next/navigation'
import React from 'react'
import ProjectAuth from './_components/ProjectAuth'
import { getUserById } from '@/server/db/users'

const ProjectDetailPage = async ({params} : {params : Promise<{slug : string}>}) => {

    const id  = (await params).slug[0]

    const project = await getProject(id)
    const session = await auth()
    
    if (!project) { 
      if (session) { 
        redirect("/dashboard")
      } else { 
        redirect("/")
      }
    }

    
    const isOwner = session?.user.id === project?.userId
    if (!isOwner) { 

      if (!project.isSharable) {
        if (session) { 
          redirect("/dashboard")
        } else { 
          redirect("/")
        }
        
      }

    }
    const user = await  getUserById(project.userId)

    if (!user) { 
      redirect("/")
    }


    



    
  


  return (
    <ProjectAuth project={project} isOwner={isOwner} OwnerEmail={user.email}/>
  )
}

export default ProjectDetailPage
