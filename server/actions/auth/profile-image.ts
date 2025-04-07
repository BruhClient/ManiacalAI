"use server"

import { auth } from "@/lib/auth";

import { extractFileKey } from "@/lib/utils";
import { updateUserByEmail } from "@/server/db/users";
import { deleteFileFromUploadthing } from "../uploadthing";


export async function changeProfilePic(imageUrl : string) { 
    const session = await auth()

    
    if (!session) { 
        return { 
            error : "Unauthorized"
        }
    }

    try { 

        if (session.user.image) { 
            const prevFileKey = extractFileKey(session.user.image)
            if (prevFileKey) { 
                await deleteFileFromUploadthing(prevFileKey)
            }
        }

        updateUserByEmail(session.user.email!,{
            image : imageUrl,
        })
    
    
    
        return { 
            success : "Profile image uploaded successfully"
        }
    } catch { 

        
        return { 
            error : "Something went wrong"
        }
    }


    
}