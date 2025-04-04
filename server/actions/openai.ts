
import { env } from '@/data/env/server';
import { SUMMARY_SYSTEM_PROMPT } from '@/lib/summary-prompt';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function generateSummaryFromOpenAI(pdfText: string) {
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
      max_tokens: 800,
    });
    return completion.choices[0].message.content;
  } catch (error: any) {
    console.log('Error occurred during openai', error);
    if (error?.status === 429) {
      throw new Error('RATE_LIMIT_EXCEEDED');
    }
    throw error;
  }
}

export async function generateSimplifiedContent (pdfText: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: "You are a analyst who is able to break down large documents into small and digestable parts. You are able to simplify large amount of text without compromising the meaning . " },
        {
          role: 'user',
          content: "Simplify this document . Keep it simple, understandable and as short as possible. Put emphasis on the main points . You are creating a outline for a chatbot . Include the possible author of the document . .The document : \n\n" + pdfText
          ,
        },
      ],
      temperature: 0.7,
      max_tokens: 700,
    });
    return completion.choices[0].message.content;
  } catch (error: any) {
    console.log('Error occurred during openai', error);
    if (error?.status === 429) {
      throw new Error('RATE_LIMIT_EXCEEDED');
    }
    throw error;
  }
}


