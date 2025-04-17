'use server'

import { z } from 'zod'
import { StreamChat } from 'stream-chat'
import { auth } from '@clerk/nextjs/server'
import { NewConversationFormSchema } from '@/lib/schemas'

const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_API_KEY!,
  process.env.STREAM_API_SECRET
)

export async function createToken(userId: string): Promise<string> {
  return serverClient.createToken(userId)
}

type NewConversationInputs = z.infer<typeof NewConversationFormSchema>
export async function createNewConversationAction(data: NewConversationInputs) {
  const { userId } = auth();
  const userToken = await createToken(userId!);

  if (!userId) {
    return { error: 'Please log in first.' }
  }

  if (process.env.REACT_APP_CHAT_SERVER_ENDPOINT) {
    serverClient.setBaseURL(process.env.REACT_APP_CHAT_SERVER_ENDPOINT);
  }
  
  if (typeof window !== 'undefined') {
    serverClient.connectUser({ id: userId }, userToken);
  }

  const result = NewConversationFormSchema.safeParse(data)

  if (result.error) {
    return { error: 'Required data is missing.' }
  }

  try {
    const channel = serverClient.channel('messaging', {
      name: data.name,
      image: data.imageUrl,
      members: [userId, data.selectedUsers[0]],
      created_by_id: userId
    })

    await channel.create()

    return { success: true }
  } catch (error: any) {
    return { error: error?.message || 'Error creating the channel.' }
  }
}
