// app/api/chat/route.ts

import { createOpenAI } from '@ai-sdk/openai'
import { convertToCoreMessages, StreamData, streamObject, streamText } from 'ai'
import {
  generateUUID,
  getMostRecentUserMessage,
  sanitizeResponseMessages,
} from '@/lib/utils'
import {
  deleteChatById,
  getChatById,
  getDocumentById,
  saveChat,
  saveDocument,
  saveMessages,
  saveSuggestions,
} from '@/db/queries'
import { generateTitleFromUserMessage } from '../../actions'
import { systemPrompt } from '@/ai/prompts'
import { models } from '@/ai/models'
import { z } from 'zod'
import { customModel } from '@/ai'
import { Suggestion } from '@/db/schema'
import { auth } from '@clerk/nextjs/server';

export const maxDuration = 60

type AllowedTools = 'createDocument' | 'updateDocument' | 'requestSuggestions' | 'getWeather'

const allTools: AllowedTools[] = ['createDocument', 'updateDocument', 'requestSuggestions', 'getWeather']

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: 'https://api.groq.com/openai/v1'
})

export async function POST(request: Request) {
  const { id, messages, modelId } = await request.json()

  const session = await auth()

  if (!session || !session.sessionId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const model = models.find((model) => model.id === modelId)

  if (!model) {
    return new Response('Model not found', { status: 404 })
  }

  const coreMessages = convertToCoreMessages(messages)
  const userMessage = getMostRecentUserMessage(coreMessages)

  if (!userMessage) {
    return new Response('No user message found', { status: 400 })
  }

  const chat = await getChatById({ id })

  if (!chat) {
    const title = await generateTitleFromUserMessage({ message: userMessage })
    await saveChat({ id, userId: session.userId, title })
  }

  await saveMessages({
    messages: [
      { ...userMessage, id: generateUUID(), createdAt: new Date(), chatId: id },
    ],
  })

  const streamingData = new StreamData()

  const result = await streamText({
    model: groq('llama-3.1-70b-versatile'),
    system: systemPrompt,
    messages: coreMessages,
    maxTokens: 1000,
    temperature: 0.5,
    topP: 1,
    frequencyPenalty: 1,
    onFinish: async ({ responseMessages }) => {
      if (session.sessionId && session.userId) {
        try {
          const responseMessagesWithoutIncompleteToolCalls = sanitizeResponseMessages(responseMessages)
          await saveMessages({
            messages: responseMessagesWithoutIncompleteToolCalls.map((message) => {
              const messageId = generateUUID()
              if (message.role === 'assistant') {
                streamingData.appendMessageAnnotation({
                  messageIdFromServer: messageId,
                })
              }
              return {
                id: messageId,
                chatId: id,
                role: message.role,
                content: message.content,
                createdAt: new Date(),
              }
            }),
          })
        } catch (error) {
          console.error('Failed to save chat')
        }
      }
      streamingData.close()
    },
    experimental_telemetry: {
      isEnabled: true,
      functionId: 'stream-text',
    },
  })

  return result.toDataStreamResponse({
    data: streamingData,
  })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response('Not Found', { status: 404 });
  }

  const session = await auth();

  if (!session || !session.sessionId) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const chat = await getChatById({ id });

    if (!chat || chat.userId !== session.userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    await deleteChatById({ id });

    return new Response('Chat deleted', { status: 200 });
  } catch (error) {
    return new Response('An error occurred while processing your request', {
      status: 500,
    });
  }
}