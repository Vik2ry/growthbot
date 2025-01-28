import { StreamChat } from "stream-chat"
import { getStreamToken } from "@/app/actions/get-stream-token"

export const streamClient = new StreamChat(process.env.NEXT_PUBLIC_STREAM_API_KEY!)

export async function connectToStream(userId: string, userName: string) {
  try {
    // Get token from server action instead of creating it client-side
    const token = await getStreamToken(userId)

    await streamClient.connectUser(
      {
        id: userId,
        name: userName,
      },
      token,
    )

    return streamClient
  } catch (error) {
    console.error("Error connecting to Stream:", error)
    throw error
  }
}

