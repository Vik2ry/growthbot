import { StreamChat } from "stream-chat"
import { auth } from "@clerk/nextjs/server"

const streamClient = new StreamChat(process.env.STREAM_KEY!)

export async function POST() {
  try {
    const session = await auth()
    if (!session?.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = streamClient.createToken(session.userId)
    return Response.json({ token })
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

