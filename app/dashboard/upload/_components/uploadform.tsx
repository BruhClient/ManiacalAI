"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUploadThing } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import { UploadFormPayload, UploadFormSchema } from '@/schema/upload-form'
import { generatePDFSummary } from '@/server/actions/pdf'
import { createProject } from '@/server/db/projects'
import { zodResolver } from '@hookform/resolvers/zod'
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
        onUploadBegin: (data) => {
          console.log('upload has begun for', data);
        },
      });
    const form = useForm<UploadFormPayload>({ 
        resolver : zodResolver(UploadFormSchema), 
        defaultValues : { 
            file : "", 
            name : ""


        }
    })
    const onSubmit = (values : UploadFormPayload) => {
        
        
        startTransition(async () => {

            
            try { 
                
                const {file,name} = UploadFormSchema.parse(values)
                

                const resp = await startUpload([file[0]])

                
                if (!resp)  return 


              

                const res = await generatePDFSummary(resp)
                
                

                if (!res.success || !res.data) { 
                    toast.error(res.message)
                    
                    return 
                }

                const {title,pdfText,summary,pdfUrl} = res.data
                
                

                
                const result = await createProject({ 
                        name, 
                        content : pdfText!, 
                        summary : summary ?? "" , 
                        pdfUrl, 
                    })
                

                if (result.success) { 
                    
                    toast.success("Project created !")
                    form.reset()
                    
                } else { 
                    
                    toast.error("Failed to create project. Please check your internet connection")
                }
                    

            } catch(error) { 
                console.log(error)
                toast.dismiss()
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
