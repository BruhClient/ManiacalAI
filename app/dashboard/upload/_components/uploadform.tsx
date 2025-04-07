"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useSessionUser from '@/hooks/use-session-user'
import { useUploadThing } from '@/lib/uploadthing'
import { bytesToMB, cn, extractFileKey } from '@/lib/utils'
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
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'


const UploadForm = () => {

    const [isPending,startTransition] = useTransition()
    const { startUpload } = useUploadThing('pdfUploader', {
        
      });

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
        startTransition(async () => {

            
            try { 
                
                const fileSize = values.file[0].size as number


                setLoadingState("Checking user details...")
                const isAllowed = await hasPermission(fileSize)
                
                if (!isAllowed || !isAllowed.allowed) { 
                   
                    
                    throw Error(isAllowed.message)
                } 

                const {file,name} = UploadFormSchema.parse(values)
                
                setLoadingState("Uploading files...")
                const resp = await startUpload([file[0]])

                

                
                if (!resp)  throw Error("File upload failed")

                

                const {key ,serverData : {fileUrl : pdfUrl} } = resp[0] 

                const fileKey = extractFileKey(pdfUrl)
                if (fileKey) { 
                    localStorage.setItem("PDF File",fileKey)
                }
                

                setLoadingState("Extracting PDF Text...")
                const pdfText = await fetchAndExtractPdfText(pdfUrl)

                if (pdfText === "" ) { 
                    throw Error("Unable to parse PDF")
                }


              
                setLoadingState("Generating Summary...")
                


                const res = await fetch('/api/pdf/summary', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ pdfText }),
                }).then((data) => data.json());
                
                console.log(res)

                if (!res.summary) { 
                    
                    
                    
                    throw Error(res.error) 
                } 

                const summary = res.summary

                setLoadingState("Generating AI Chatbot...")

                const response = await fetch('/api/pdf/simplify-content', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ pdfText }),
                }).then((data) => data.json());

                console.log(response)

                if (!response?.content) { 
                    
                    
                    throw Error(response.error)
                } 




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

                
                const result = await createProject({ 
                        name, 
                        content : response.content, 
                        summary , 
                        pdfUrl, 
                })

                if (result.success) { 

                    toast.success("Project created !")

                    form.setValue("name","")

                } else { 
                    
                    if (fileKey ) { 
                        await deleteFileFromUploadthing(fileKey)
                    }
                    
                    throw Error("Failed to create project. Please check your internet connection")
                }


                localStorage.removeItem("PDF File")
                toast.dismiss(toastId)

            } catch(error : any) { 
                
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
                                                PDF {field.value[0] && `( ${bytesToMB(field.value[0].size)}MB ) `}
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
