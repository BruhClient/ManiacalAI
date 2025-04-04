import {z} from "zod"


export const UploadFormSchema = z.object({ 
    file : z
    .any()
    .refine((files) => files?.length == 1, "PDF is required.")
    .refine(
      (files) => {
       
        return (files?.[0]?.type).includes("/pdf")},
      "Only PDF files are accepted."
    ),
    name : z.string().min(1,{message : "Name is required"})

})

export type UploadFormPayload = z.infer<typeof UploadFormSchema>