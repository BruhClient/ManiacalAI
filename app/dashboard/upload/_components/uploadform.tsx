"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useSessionUser from '@/hooks/use-session-user'
import { useUploadThing } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import { UploadFormPayload, UploadFormSchema } from '@/schema/upload-form'
import { fetchAndExtractPdfText } from '@/server/actions/langchain'
import { generatePDFSummary, generateSimplifiedPDFContent } from '@/server/actions/pdf'
import { hasPermission } from '@/server/actions/permissions'
import { createProject, updateProjectById } from '@/server/db/projects'
import { decrementProjectsLeft, updateUserById } from '@/server/db/users'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'


const UploadForm = () => {

    const [isPending,startTransition] = useTransition()
    const { startUpload } = useUploadThing('pdfUploader', {
        onClientUploadComplete: () => {
          
          toast.success("PDF Uploaded!")
        },
        onUploadError: (err) => {
         
          toast.error("PDF Upload failed. Please check your internet connection.")
          
        },
        
      });

    const user = useSessionUser()
    const form = useForm<UploadFormPayload>({ 
        resolver : zodResolver(UploadFormSchema), 
        defaultValues : { 
            file : "", 
            name : ""


        }
    })

    const queryClient = useQueryClient()
    

    const onSubmit = (values : UploadFormPayload) => {
        
        
        startTransition(async () => {

            
            try { 

                
                const isAllowed = await hasPermission()
                
                if (!isAllowed || !isAllowed.allowed) { 
                    toast.error(isAllowed.message)
                    return
                } else { 
                    toast.success("User verification complete !")
                }
                const {file,name} = UploadFormSchema.parse(values)
                

                const resp = await startUpload([file[0]])

                
                if (!resp)  return 

                const {key ,serverData : {fileUrl : pdfUrl} } = resp[0] 

                
                const pdfText = await fetchAndExtractPdfText(pdfUrl)

                toast.success("PDF text extracted")


              

                const res = await generatePDFSummary(pdfText,key)
                
                

                if (!res.success || !res.data) { 
                    toast.error(res.message)
                    
                    return 
                } else { 
                    toast.success("PDF Summary generated.")
                }

                const summary = res.data





                const data = await generateSimplifiedPDFContent(pdfText,key)
                
                
                if (!data.success) { 
                    toast.error(res.message)
                    return
                } else { 
                    toast.success("Ai Prompt generated . Almost there....")
                }

                if (user?.planType === "free" ) { 
                    const res = await decrementProjectsLeft(user!.id)

                    if (!res) { 
                        toast.error("Failed to create project. Please check your internet connection")
                        return 
                    } else { 
                        queryClient.invalidateQueries({queryKey : ["projectsLeft",user.id]})
                    }
                }

                
                const result = await createProject({ 
                        name, 
                        content : data.data!, 
                        summary , 
                        pdfUrl, 
                })


                

                

                if (result.success) { 
                    
                    

                    toast.success("Project created !")
                    

                    
                    
                } else { 
                    
                    toast.error("Failed to create project. Please check your internet connection")
                }

                
                    

            } catch(error) { 
                
                
                toast.error("Something went wrong. Please check your internet connection")
            }

        })

    }
    
  return (
    <Form {...form}>
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                        control={form.control}
                        name ="name"
                        render={({field}) => (
                            <FormItem >
                                <FormLabel>
                                    Project Name
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} type="name"/>
                                    
                                </FormControl>
                            

                               <FormMessage />
                            </FormItem>

                            
                            
                        )}
            />

            <FormField
                                    control={form.control}
                                    name ="file"
                                    render={({field}) => (
                                        <FormItem >
                                            <FormLabel>
                                                PDF 
                                            </FormLabel>
                                            <FormControl>
                                            <Input
                                                    id="file"
                                                    type="file"
                                                    
                                                    accept="application/pdf"
                                                    required
                                                    
                                                    onChange={(value) => {
                                                        
                                                        field.onChange(value.target.files)
                                                    }
                                                        
                                                    }
                                                    className={cn(isPending && 'opacity-50 cursor-not-allowed')}
                                                    disabled={isPending}
                                                />
                                                
                                            </FormControl>
                                        
                                            <FormMessage />
                                           
                                        </FormItem>
            
                                        
                                        
                                    )}
                                />
                
        
        
        <Button disabled={isPending}>
            {isPending ? (
            <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
            </>
            ) : (
            'Upload your PDF'
            )}
        </Button>
      
        </form>
    </Form>
    
  )
}

export default UploadForm
