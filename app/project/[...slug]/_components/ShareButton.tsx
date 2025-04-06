"use client"

import { Button } from '@/components/ui/button'
import { Copy, Save, Share } from 'lucide-react'
import React, { useEffect, useState, useTransition } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProjectPasswordPayload, ProjectPasswordSchema } from '@/schema/project-password'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { updateProjectById } from '@/server/db/projects'
import { MotionDiv } from '@/lib/motion-wrapper'
import toast from 'react-hot-toast'

  
const ShareButton = ({id,password,isSharable} : {id : string,password : string,isSharable : boolean}) => {

    const form = useForm<ProjectPasswordPayload>({ 
        resolver : zodResolver(ProjectPasswordSchema), 
        defaultValues : {
            password , 
            isSharable , 
        }
    })

    const [sharable,setSharable] = useState(isSharable)
    const [copied, setCopied] = useState(false);
    const [isPending,startTransition] = useTransition()
    const handleCopy = async (text : string) => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      };


    const onSubmit = (values : ProjectPasswordPayload) => { 
        console.log(values)
        startTransition(() => {
            updateProjectById(id,{
                isSharable : values.isSharable, 
                password : values.password, 
            }).then((data) => { 
                if (!data) { 
                    toast.error("Something went wrong")
                } else { 
                    toast.success("Changes Saved")
                }
            })
        })
        
    }
  return (

    <Dialog>
        <DialogTrigger asChild>
        
            <Button variant={"outline"}><Share />Share</Button>
        
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle className='flex gap-2 items-center'><Share /> Share</DialogTitle>
            <DialogDescription>
                Configure a password . Viewers will be prompt to enter the password before viewing the document. 
            </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'> 

                
                

            <FormField
              control={form.control}
              name="isSharable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Share with others</FormLabel>
                    <FormDescription>
                      Your project link will be protected and unaccessable when needed
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(e) => {
                        setSharable(e)
                        field.onChange(e)
                    }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
                {
                    sharable && 
                    
                    <MotionDiv initial={{opacity : 0 , y : 10}} animate={{opacity : 1 , y: 0}} className='flex flex-col gap-2'>
                        <FormField
                        control={form.control}
                        name ="password"
                        render={({field}) => (
                            <FormItem >
                                <FormLabel>
                                    Project password
                                </FormLabel>
                                <FormControl>
                                    <Input disabled={!sharable} {...field} placeholder="Enter your password"/>
                                    
                                </FormControl>
                                <FormMessage className='text-red-400 text-sm' />

                            
                            </FormItem>

                            
                            
                        )}
                        />
                        <div className='text-sm flex gap-1 items-center'>
                        <div className='font-serif flex-1 break-words break-all bg-muted py-2 px-3 rounded-lg'>
                            <span className='text-primary'>{process.env.NEXT_PUBLIC_VERCEL_URL}</span>/project/{id}
                        </div>
                        
                        <Button type='button' size={"icon"} variant={"outline"} onClick={() => handleCopy(`${process.env.NEXT_PUBLIC_VERCEL_URL}/project/${id}`)}><Copy /></Button>
                        </div>

                        <div className='text-sm text-muted-foreground'>* Only basic and premium plan users can use AI chat</div>
                    </MotionDiv>
                    
                }

                    
                    
                    <Button className='w-full' disabled={isPending}>{isPending ? "Updating..." : <><Save/> Save Changes</>}</Button>
                </form>
            </Form>
            

        </DialogContent>
    </Dialog>
    
  )
}

export default ShareButton
