"use server"

import { auth } from "@/lib/auth"
import { getUserById } from "../db/users"

export const hasPermission = async () => { 
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

    return {
        allowed : true , 
        message : "User is allowed to create a project"
    }
}