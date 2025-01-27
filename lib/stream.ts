import { StreamChat } from "stream-chat"

export const streamClient = new StreamChat(process.env.NEXT_PUBLIC_STREAM_API_KEY!)

export async function connectToStream(userId: string, userName: string) {
  try {
    const token = streamClient.createToken(userId)

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

