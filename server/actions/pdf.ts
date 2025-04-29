"use server"

import { generateProjectName, generateSimplifiedContent, generateSummaryFromOpenAI } from "./openai"

export async function generatePDFSummary(pdfText : string) { 

    try { 
        if (pdfText === "" ) { 
        
            
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
        
    
        return { 
            success : false , 
            message : "File upload failed", 
            data : null 
        }
    }




}

export async function generateSimplifiedPDFContent(pdfText : string) { 
    let simplifedContent ;
        try { 
            simplifedContent = await generateSimplifiedContent(pdfText) 
        } catch { 
          
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

export async function generateProjectTitle(pdfText : string) { 
    let simplifedContent ;
        try { 
            simplifedContent = await generateProjectName(pdfText) 
        } catch { 
          
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

