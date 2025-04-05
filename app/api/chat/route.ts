

import { NextResponse } from "next/server";
import { CoreMessage, CoreSystemMessage, streamText } from "ai";
import { openai } from '@ai-sdk/openai';

export async function POST(req : Request) { 
    try {
        const body = await req.json()

        const messages : CoreMessage[] = body.messages ; 
        
        
        

        

        const systemMessage : CoreSystemMessage = { 
            role : "system", 
            content : " You are a intelligent Learning assistant. You keep your answers concise and less than 200 words. You are given a document that the user has uploaded. . \n " 
            + "The document : \n\n" 
            + body.content
            
        }
        
        const response = streamText({ 
            model : openai("gpt-4o"), 
           
            messages : [systemMessage,...messages ]
        })


        
        return response.toDataStreamResponse();
 


        
       



    } catch(error) { 

    
        return NextResponse.json({error : "Internal server error"},{status : 500})
    }
}