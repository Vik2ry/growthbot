"use server"

import { StreamChat } from "stream-chat"

// Use the correct environment variable names
const serverClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!, process.env.STREAM_API_SECRET!)

export async function getStreamToken(userId: string) {
  if (!userId) throw new Error("User ID is required")

  try {
    const token = serverClient.createToken(userId)
    if (!token) throw new Error("Failed to generate token")

    return token
  } catch (error) {
    console.error("Error creating stream token:", error)
    throw new Error("Failed to generate stream token")
  }
}
