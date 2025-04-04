"use server"

import { formatFileNameAsTitle } from "@/lib/utils"
import { fetchAndExtractPdfText } from "./langchain"
import { generateSimplifiedContent, generateSummaryFromOpenAI } from "./openai"
import { utapi } from "@/lib/utapi"





export async function generatePDFSummary(uploadResponse: { 
    serverData : { 
        userId : string  , 
         
        fileUrl : string , 
        fileName : string , 
        
    }, 
    key : string 
}[]) { 

   
    if (!uploadResponse) { 
        return { 
            success : false , 
            message : "File upload failed", 
            data : null 
        }
    }
  
    const {key,serverData : {userId,fileUrl : pdfUrl,fileName} } = uploadResponse[0]


  
    if (!pdfUrl) { 
        await utapi.deleteFiles([key])
        return { 
            success : false , 
            message : "File upload failed", 
            data : null 
        }
    }

    try { 
        console.log("Extracting PDF text")
        const pdfText = await fetchAndExtractPdfText(pdfUrl)
        console.log("Done Extracting PDF Text...")

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

        console.log("Generating Summary")
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

        console.log("Done generating summary")

        console.log("Start Simplified Content")
        let simplifedContent ;
        try { 
            simplifedContent = await generateSimplifiedContent(pdfText) 
        } catch { 
            await utapi.deleteFiles([key])
            if (!summary) { 
                return { 
                    success : false , 
                    message : "Failed to generate simplified content", 
                    data : null 
                }
            }
        }

        console.log("Simplified Content!")

        console.log(simplifedContent)

      
        
            
        return { 
            success : true , 
            message : "Summary generated successfully", 
            data : {
              title : formatFileNameAsTitle(fileName),
              summary ,
              pdfText : simplifedContent , 
              pdfUrl,
            }
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

