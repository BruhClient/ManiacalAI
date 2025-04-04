"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import { Trash } from 'lucide-react'
import React, { useTransition } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteProject } from '@/server/db/projects'
import toast from 'react-hot-toast'
import Link from 'next/link'


const ProjectCard = ({id ,name , createdAt} : {id : string,name : string,createdAt :Date }) => {
  const [isPending,startTransition] = useTransition()
  const onDelete =  () => { 
    startTransition(() => { 
      deleteProject(id).then((data) => { 
        if (data.success) { 
          toast.success("Project Deleted !")
        } else { 
          toast.error("Something went wrong. Please check your internet connection.")
        }
      })
    })
    
  }
  return (
    
      <Card key={id} className='hover:bg-muted hover:shadow-lg shadow-primary duration-150 ease-in-out transition-all'>

      <CardHeader>
          <CardTitle className="text-lg font-serif">{name}</CardTitle>
          <CardDescription>{format(createdAt,"dd-MM-yyyy")}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-1 justify-end">
          <Button variant={"outline"} disabled={isPending} asChild><Link href={`/dashboard/project/${id}`}>View</Link></Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant={"destructive"} disabled={isPending}><Trash /> Delete Project</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your project
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete()}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
      </CardContent>

      </Card>
    
    
  )
}

export default ProjectCard
