import { StreamChat } from "stream-chat"
import { getStreamToken } from "@/app/actions/get-stream-token"

export const streamClient = new StreamChat(process.env.NEXT_PUBLIC_STREAM_API_KEY!)

export async function connectToStream(userId: string, userName: string) {
  console.log("Connecting to Stream:", { userId, userName })

  try {
    // Disconnect any existing user first
    await streamClient.disconnectUser()

    // Get token from server action
    const token = await getStreamToken(userId)
    console.log("Got token from server")

    // Connect user
    await streamClient.connectUser(
      {
        id: userId,
        name: userName,
      },
      token,
    )
    console.log("User connected successfully")

    return streamClient
  } catch (error) {
    console.error("Error connecting to Stream:", error)
    throw error
  }
}
