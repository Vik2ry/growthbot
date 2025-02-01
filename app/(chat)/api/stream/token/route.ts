import { NextResponse, NextRequest } from "next/server"
import { StreamChat } from "stream-chat"
import { getAuth } from "@clerk/nextjs/server"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()
    const { userId: authedUserId } = getAuth(request)

    if (!authedUserId || authedUserId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const serverClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!, process.env.STREAM_API_SECRET!)

    const token = serverClient.createToken(userId)

    return NextResponse.json({ token })
  } catch (error) {
    console.error("Error creating Stream token:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

