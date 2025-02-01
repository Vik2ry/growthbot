import { StreamChat } from "stream-chat"

let globalClient: StreamChat | null = null

export async function connectToStream(userId: string, userName: string) {
  console.log("Connecting to Stream:", { userId, userName })

  try {
    // If there's an existing client, disconnect it
    if (globalClient) {
      await globalClient.disconnectUser()
      globalClient = null
    }

    // Create a new client
    const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!)
    globalClient = client

    // Get token from server action
    const response = await fetch("/api/stream/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    const token = data.token

    if (!token) {
      throw new Error("No token received from server")
    }

    // Connect user
    await client.connectUser(
      {
        id: userId,
        name: userName,
      },
      token,
    )
    console.log("User connected successfully")

    return client
  } catch (error) {
    console.error("Error connecting to Stream:", error)
    throw error
  }
}

// Add a cleanup function to handle disconnection
export async function disconnectStream() {
  if (globalClient) {
    try {
      await globalClient.disconnectUser()
      globalClient = null
    } catch (error) {
      console.error("Error disconnecting from Stream:", error)
      throw error
    }
  }
}

