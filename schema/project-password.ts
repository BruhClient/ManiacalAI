import {z} from "zod"

export const ProjectPasswordSchema = z.object({ 
    isSharable : z.boolean(),
    password : z.string().min(4,{message : "Password must be more than 3 characters."}),

})

export type ProjectPasswordPayload = z.infer<typeof ProjectPasswordSchema>