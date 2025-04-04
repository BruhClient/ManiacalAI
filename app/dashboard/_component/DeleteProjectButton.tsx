"use client"

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
import { Button } from '@/components/ui/button'
import { deleteProject } from '@/server/db/projects'
import toast from 'react-hot-toast'
import { Trash } from 'lucide-react'
const DeleteProjectButton = ({id} : {id : string}) => {

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
            <AlertDialog>
              <AlertDialogTrigger className='z-50' asChild><Button variant={"destructive"} className='z-50' disabled={isPending}><Trash /> Delete Project</Button></AlertDialogTrigger>
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
                  <AlertDialogAction  onClick={() => onDelete()} className='bg-red-400 hover:bg-red-400/80'><Trash /></AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
  )
}

export default DeleteProjectButton
