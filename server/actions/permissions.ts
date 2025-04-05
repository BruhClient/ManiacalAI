"use server"

import { auth } from "@/lib/auth"
import { getUserById } from "../db/users"
import { pricingTypes } from "@/data/pricing"

export const hasPermission = async (fileSize : number) => { 
    const session  = await auth()

    if (!session) return {
        allowed : false , 
        message : "You are not logged in"
    }
    const user = await getUserById(session?.user.id)
    
    if (!user) return {
        allowed : false , 
        message : "You are not logged in"
    }

    if (user.plan === "free") { 
        if (user.projectsLeft <= 0) {
            return {
                allowed : false , 
                message : "Your free quota has been used . Please upgrade to continue ."
            }
        }

    }

    const plan = pricingTypes.find((type) => type.name.toLowerCase() === user.plan )!


    const maxFileSize = plan?.fileSize!
    console.log(maxFileSize)
    const fileSizeInMB = fileSize / (1028 * 1028)

    console.log(fileSizeInMB)

    if (maxFileSize < fileSizeInMB) { 
        return {
            allowed : false , 
            message : `Your file is too big .Your plan has a max file size of ${maxFileSize}MB . Your File size is ${fileSizeInMB.toFixed(2)}MB`
        }
    }
    return {
        allowed : true , 
        message : "User is allowed to create a project"
    }
}