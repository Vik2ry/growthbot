// app/api/chat/route.ts

import { streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: 'https://api.groq.com/openai/v1'
})

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Get a language model
  const model = groq('llama-3.1-70b-versatile')

  // Call the language model with the prompt
  const result = await streamText({
    model,
    messages,
    maxTokens: 1000,
    temperature: 0.5,
    topP: 1,
    frequencyPenalty: 1,
  })

  // Respond with a streaming response
  return result.toDataStreamResponse()
}
// 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

// display name: GrowthBot