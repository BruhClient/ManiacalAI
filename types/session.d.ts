
import { userPlanEnum, userRoleEnum } from "@/db/schema";
import { DefaultSession } from "next-auth"


export type  ExtendedUser = DefaultSession["user"] & { 
    role : string, 
    id : string,
    username : string,
    image : string, 
    isOauth : boolean, 
    planType : string
    
}

declare module "next-auth" { 
    interface Session {
        user : ExtendedUser
    }
}