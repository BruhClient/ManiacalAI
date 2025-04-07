"use server"

import { utapi } from "@/lib/utapi"

export const deleteFileFromUploadthing = async (key : string) => { 
    console.log("FILE DELETED")
    try { 
        await utapi.deleteFiles([key])
        return { 
            success : true
        }
    } catch {

        return { 
            success : false
        }
        
    }
    
}