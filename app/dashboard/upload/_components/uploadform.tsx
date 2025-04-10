"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useSessionUser from '@/hooks/use-session-user'
import { useUploadThing } from '@/lib/uploadthing'
import { bytesToMB, cn } from '@/lib/utils'
import { UploadFormPayload, UploadFormSchema } from '@/schema/upload-form'
import { fetchAndExtractPdfText } from '@/server/actions/langchain'
import { generatePDFSummary, generateSimplifiedPDFContent } from '@/server/actions/pdf'
import { hasPermission } from '@/server/actions/permissions'
import { deleteFileFromUploadthing } from '@/server/actions/uploadthing'
import { createProject } from '@/server/db/projects'
import { decrementProjectsLeft } from '@/server/db/users'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'


const UploadForm = () => {

    const [isPending,startTransition] = useTransition()
    const { startUpload } = useUploadThing('pdfUploader', {
        
      });
      const router = useRouter()
    const user = useSessionUser()

    const [loadingState,setLoadingState] = useState<string | null>(null)
    const form = useForm<UploadFormPayload>({ 
        resolver : zodResolver(UploadFormSchema), 
        defaultValues : { 
            file : "", 
            name : ""


        }
    })

    const queryClient = useQueryClient()
    
    useEffect(() => { 
        const res = localStorage.getItem("PDF File")

        const deleteFile  = async (key : string) => { 
            await deleteFileFromUploadthing(key)
        }

        if (res) { 
            deleteFile(res)
        }
        

    },[])

    const onSubmit = (values : UploadFormPayload) => {
        
        const toastId = toast.loading("This might take awhile")
        let fileKey : string ; 
        startTransition(async () => {
            
            try { 
                
                const fileSize = values.file[0].size as number


                setLoadingState("Checking user details...")

                // Checking Permissions
                const isAllowed = await hasPermission(fileSize)
                
                if (!isAllowed || !isAllowed.allowed) { 
                   
                    
                    throw Error(isAllowed.message)
                } 

                const {file,name} = UploadFormSchema.parse(values)
                
                setLoadingState("Uploading files...")


                // Uploading Files


                const resp = await startUpload([file[0]])

                

                
                if (!resp)  throw Error("File upload failed")

                

                const {key ,serverData : {fileUrl : pdfUrl} } = resp[0] 
                fileKey = key


                if (key) { 
                    // Saving to local storage
                    localStorage.setItem("PDF File",key)
                }
                

                setLoadingState("Extracting PDF Text...")


                // Extracting PDF Text
 
                const pdfText = await fetchAndExtractPdfText(pdfUrl)
                
                

                setLoadingState("Generating Summary...")

                // Generating PDF Summary

                const res = await generatePDFSummary(pdfText)
                
                

                if (!res.success || !res.data) { 
                    
                    
                    
                    throw Error(res.message) 
                } 



                const summary = res.data




                setLoadingState("Generating AI Chatbot...")

                // Generating AI Chatbot prompt
                const data = await generateSimplifiedPDFContent(pdfText)
                
                
                if (!data.success) { 
                    
                    
                    throw Error(res.message)
                } 



                
                // Handle Free Plan Quota
                if (user?.planType === "free" ) { 
                    const res = await decrementProjectsLeft(user!.id)

                    if (!res) { 
                        toast.error("Failed to create project. Please check your internet connection")
                        
                        throw Error("Failed to create project. Please check your internet connection") 
                    } else { 
                        queryClient.invalidateQueries({queryKey : ["projectsLeft",user.id]})
                    }
                }

                setLoadingState("Creating Project...")

                // Creating Project
                const result = await createProject({ 
                        name, 
                        content : data.data!, 
                        summary , 
                        pdfUrl, 
                })


                if (result.success) { 

                    toast.success("Project created !")

                    form.setValue("name","")
                    
                    router.push(`${process.env.NEXT_PUBLIC_VERCEL_URL}/project/${result.data!.id}`)
                    
                    

                } else { 
                    
                    
                    throw Error("Failed to create project. Please check your internet connection")
                }

                // Remove from local storage
                localStorage.removeItem("PDF File")
                toast.dismiss(toastId)

            } catch(error : any) {    
                 if (fileKey) { 
                    await deleteFileFromUploadthing(fileKey)
                 }
                toast.dismiss(toastId)
                toast.error(error.message)
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
                                                PDF {field.value && `( ${bytesToMB(field.value[0].size)}MB ) `}
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

                               
                                
                
        
        
        <Button disabled={isPending} className='flex items-center'>
            {isPending ? (
            <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {loadingState}
            </>
            ) : (
            <><Upload /> Upload your PDF</>
            )}
        </Button>
      
        </form>
    </Form>
    
  )
}

export default UploadForm
