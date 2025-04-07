import { SUMMARY_SYSTEM_PROMPT } from '@/lib/summary-prompt';
import { openai } from '@/server/actions/openai';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = "nodejs"

export async function POST(request : NextRequest) {
  // Parse JSON body
  const { pdfText } = await request.json();

  // Validate input parameters
  if (!pdfText) {
    return NextResponse.json({ error: 'Missing pdfText' }, { status: 400 });
  }

 try {
     const completion = await openai.chat.completions.create({
       model: 'gpt-4o',
       messages: [
         { role: 'system', content: SUMMARY_SYSTEM_PROMPT },
         {
           role: 'user',
           content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
         },
       ],
       temperature: 0.8,
       max_tokens: 2100,
     });
     return NextResponse.json({ summary: completion.choices[0].message.content }, { status: 200 });
   } catch (error: any) {
     console.log('Error occurred during openai', error);
     
     throw NextResponse.json({ error: "Unable to create summary" }, { status: error.status });
   }

  
}
