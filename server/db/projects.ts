"use server"

import { db, projects } from "@/db/schema"
import { auth } from "@/lib/auth"
import { utapi } from "@/lib/utapi"
import { eq, InferModel } from "drizzle-orm"
import { revalidatePath, revalidateTag, unstable_cacheTag } from "next/cache"


export const getProjects = async (userId : string) => { 
    
    try { 
        const res = await db.select().from(projects).where(eq(projects.userId,userId))
        
        return res
    } catch { 
        return [] 
    }
    
}


export const getProject = async (id : string) => { 
    

    unstable_cacheTag(`Project ${id}`)
    try { 
        
        const res = await db.select().from(projects).where(eq(projects.id,id))
        
        return res[0]
    } catch { 
        return null
    }
    
}


export const deleteProject = async (id : string) => { 
    
    try { 


        const res = await db.delete(projects).where(eq(projects.id,id)).returning()

        const project = res[0]

        const fileKey = project.pdfUrl.split("/").slice(-1)[0]

        
        
        await utapi.deleteFiles([fileKey])
        

        revalidatePath("/dashboard")
        return {
            success : true
        }
    } catch { 
        return {
            success :false
        }
    }
    
}

type Project =  { 
    content : string , 
    name : string , 
    summary : string , 
     
    pdfUrl : string , 
}


export const createProject =  async ({content , name,summary , pdfUrl } : Project) => { 

    
    try { 

        const session = await auth()
        if (!session) { 
            return { 
                success : false
            }
        }

        
        
        
        const res = await db.insert(projects).values({
            content, 
            name, 
            summary , 
            userId : session.user.id , 
            pdfUrl ,
        }).returning()
        revalidatePath("/dashboard")
        return {
            success : true ,
            data : res[0]
        }
    } catch(error) {
        console.log(error)
        
        return {
            success : false , 
        }
    }
}

type project = Partial<InferModel<typeof projects>>;

export const updateProjectById = async (id : string, options :  project) => { 
    try { 
        await db.update( projects).set({
            ...options
        }).where(eq(projects.id, id))


        const user = await db.select().from(projects).where(eq(projects.id ,id)).limit(1);

        revalidateTag(`Project ${id}`)

       

        return user[0]
    } catch { 
        return null
    }
}