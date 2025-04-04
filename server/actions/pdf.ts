"use server"

import { generateSimplifiedContent, generateSummaryFromOpenAI } from "./openai"
import { utapi } from "@/lib/utapi"

export async function generatePDFSummary(pdfText : string,key : string) { 

    try { 
        if (pdfText === "" ) { 
            await utapi.deleteFiles([key])
            
            return { 
                    success : false , 
                    message : "Failed to extract PDF text", 
                    data : null 
                }
        }
        
        let summary ;
        
        // Generate Summary using OpenAi

        
        try { 
            summary = await generateSummaryFromOpenAI(pdfText) 
        } catch { 
            await utapi.deleteFiles([key])
            if (!summary) { 
                return { 
                    success : false , 
                    message : "Failed to generate summary", 
                    data : null 
                }
            }
            
        }
   
        return { 
            success : true , 
            message : "Summary generated successfully", 
            data : summary
        }
        
    } catch {
        
        await utapi.deleteFiles([key])
        return { 
            success : false , 
            message : "File upload failed", 
            data : null 
        }
    }




}

export async function generateSimplifiedPDFContent(pdfText : string,key : string) { 
    let simplifedContent ;
        try { 
            simplifedContent = await generateSimplifiedContent(pdfText) 
        } catch { 
            await utapi.deleteFiles([key])
            return { 
                success : false , 
                message : "Could not generate simplified content.",
                data : null,
            }
        }

        return { 
            success : true , 
            data : simplifedContent, 
        }
}

