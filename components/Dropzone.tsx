'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { hasPermission } from '@/server/actions/permissions';
import { useUploadThing } from '@/lib/uploadthing';
import { fetchAndExtractPdfText } from '@/server/actions/langchain';
import { generatePDFSummary, generateProjectTitle, generateSimplifiedPDFContent } from '@/server/actions/pdf';
import useSessionUser from '@/hooks/use-session-user';
import { decrementProjectsLeft } from '@/server/db/users';
import { useQueryClient } from '@tanstack/react-query';
import { createProject } from '@/server/db/projects';
import toast from 'react-hot-toast';
import { deleteFileFromUploadthing } from '@/server/actions/uploadthing';
import { useRouter } from 'next/navigation';

export const Dropzone = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingText, setUploadingText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

    const { startUpload } = useUploadThing('pdfUploader', {
            
        });
    const user = useSessionUser()
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
    const router = useRouter()
  const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
    setError(null);
    if (acceptedFiles.length !== 1 || acceptedFiles[0].type !== 'application/pdf') {
      setError('Only a single PDF file is allowed.');
      return;
    }
    setIsUploading(true);
    const file = acceptedFiles[0]

    try { 
        setUploadingText("Checking user details...")
        const isAllowed = await hasPermission(file.size)
                    
        if (!isAllowed || !isAllowed.allowed) { 
                           
                            
            throw Error(isAllowed.message)
        }

        setUploadingText("Uploading files...")

        const resp = await startUpload([file])
        if (!resp)  throw Error("File upload failed")

        const {key ,serverData : {fileUrl : pdfUrl} } = resp[0] 

        if (key) { 
            // Saving to local storage
            localStorage.setItem("PDF File",key)
        }

        setUploadingText("Extracting PDF Text...")
        
        
                        // Extracting PDF Text
         
        const pdfText = await fetchAndExtractPdfText(pdfUrl)
                        
                        
        
        setUploadingText("Generating Summary...")
        
            // Generating PDF Summary
        
        const res = await generatePDFSummary(pdfText)
                        
                        
        
        if (!res.success || !res.data) { 
                            
                            
                            
            throw Error(res.message) 
        } 

        const summary = res.data
        
        
        
        
        setUploadingText("Generating AI Chatbot...")
        
                        // Generating AI Chatbot prompt
        const data = await generateSimplifiedPDFContent(pdfText)
                        
                        
        if (!data.success) { 
                            
                            
            throw Error(res.message)
        }
        setUploadingText("Generating Project Title...")
        const title = await generateProjectTitle(data.data!)
                        
                        
        if (!title.success) { 
                            
                            
            throw Error(res.message)
        }
        
        if (user?.planType === "free" ) { 
            const res = await decrementProjectsLeft(user!.id)

            if (!res) { 
                
                
                throw Error("Failed to create project. Please check your internet connection") 
            } else { 
                queryClient.invalidateQueries({queryKey : ["projectsLeft",user.id]})
            }
        }

        setUploadingText("Creating Project...")
        setError(null)

        // Creating Project
        const result = await createProject({ 
                name : title.data!.replace(/['"]/g, ''), 
                content : data.data!, 
                summary , 
                pdfUrl, 
        })


        if (result.success) { 

            toast.success("Project created !")
            router.push(`/project/${result.data?.id!}`)
            
        }

        setIsUploading(false)

        
    } catch(error : any) { 
        const res = localStorage.getItem("PDF File")

        const deleteFile  = async (key : string) => { 
            await deleteFileFromUploadthing(key)
        }

        if (res) { 
            deleteFile(res)
        }
        setUploadingText("")
        setIsUploading(false)
        setError(error?.message ?? "Something went wrong")
        return
    }
     

    
  }, []);

  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <Card className="w-full p-4">
      {isUploading ? (
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Loader2 className="animate-spin h-8 w-8 text-primary mb-2" />
          <p className="text-muted-foreground">{uploadingText}</p>
        </CardContent>
      ) : (
        <>
          <CardContent
            {...getRootProps()}
            className={cn(
              'flex flex-col items-center aspect-square justify-center border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors',
              isDragActive
                ? 'border-primary bg-muted'
                : 'border-border'
            )}
          >
            <input {...getInputProps()} />
            <p className="text-muted-foreground mb-4">
              Drag & drop a PDF file here, or
            </p>
            <Button onClick={open} type="button">
              Browse PDF
            </Button>
          </CardContent>

          

          {error && (
            <div className="mt-4 text-sm text-destructive text-center">{error}</div>
          )}
        </>
      )}
    </Card>
  );
};
