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
        { role: 'system', content: "You are a analyst who is able to break down large documents into small and digestable parts. You are able to simplify large amount of text without compromising the meaning . " },
        {
          role: 'user',
          content: "Simplify this document . Keep it simple, understandable and as short as possible. Put emphasis on the main points . Include the possible author of the document . .The document : \n\n" + pdfText
          ,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });
    return NextResponse.json({ content: completion.choices[0].message.content }, { status: 200 });
    
  } catch (error: any) {
    console.log('Error occurred during openai', error);
    if (error?.status === 429) {
      throw new Error('RATE_LIMIT_EXCEEDED');
    }
    throw error;
  }

  
}
