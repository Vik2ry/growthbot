"use client"

import { useEffect, useState } from "react"
import { Channel, Chat, MessageInput, MessageList, Window, useChannelStateContext, useMessageContext, useMessageInputContext } from "stream-chat-react"
import type { StreamChat as StreamChatType } from "stream-chat"
import { useUser } from "@clerk/nextjs"
import { Send, MoreVertical } from "lucide-react"
import { connectToStream } from "@/lib/stream"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import "stream-chat-react/dist/css/v2/index.css"

// Custom Message component
function CustomMessage() {
  const { message, isMyMessage } = useMessageContext()

  return (
    <div className={`flex ${isMyMessage() ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`flex ${isMyMessage() ? "flex-row-reverse" : "flex-row"} items-start gap-2 max-w-[80%]`}>
        <Avatar className="h-8 w-8">
          <AvatarImage src={message.user?.image || "/placeholder.svg"} />
          <AvatarFallback>{message.user?.name?.[0] || "?"}</AvatarFallback>
        </Avatar>
        <div className={`rounded-lg p-3 ${isMyMessage() ? "bg-[#0F1531] text-white" : "bg-gray-100"}`}>
          <p className="text-sm">{message.text}</p>
          <span className="text-xs text-gray-400 mt-1 block">
            {new Date(message.created_at!).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  )
}

// Custom Input component
function CustomInput() {
  const { setText, text, handleSubmit } = useMessageInputContext()

  return (
    <form onSubmit={handleSubmit} className="border-t p-4">
      <div className="flex gap-2">
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type message" className="flex-1" />
        <Button type="submit" size="icon" className="bg-[#0F1531] hover:bg-[#0F1531]/90">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}

// Custom Channel Header component
function CustomChannelHeader() {
  const { channel } = useChannelStateContext()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold">{channel.data?.name || "Chat"}</h1>
              <div className="flex gap-2">
                <Badge variant="secondary">Chat</Badge>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

interface StreamChatProps {
  id: string
}

export function StreamChatView({ id }: StreamChatProps) {
  const { user, isLoaded } = useUser()
  const [client, setClient] = useState<StreamChatType | null>(null)
  const [channel, setChannel] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    let currentClient: StreamChatType | null = null

    async function initChat() {
      if (!user?.id || !isLoaded) return

      try {
        console.log("Initializing chat...")
        const streamClient = await connectToStream(user.id, user.username || "Anonymous")

        currentClient = streamClient

        if (!mounted) {
          await streamClient.disconnectUser()
          return
        }

        console.log("Creating/getting channel...")
        const channel = streamClient.channel("messaging", id, {
          name: `Chat ${id}`,
          members: [user.id],
          created_by_id: user.id,
        })

        try {
          console.log("Watching channel...")
          await channel.watch()
          console.log("Channel watched successfully")
        } catch (error: any) {
          console.log("Channel watch error:", error.message)
          if (error.message.includes("channel not found")) {
            console.log("Creating new channel...")
            await channel.create()
            await channel.watch()
            console.log("New channel created and watched")
          } else {
            throw error
          }
        }

        if (!mounted) {
          await streamClient.disconnectUser()
          return
        }

        setClient(streamClient)
        setChannel(channel)
        console.log("Chat initialized successfully")
      } catch (error) {
        console.error("Error in initChat:", error)
        setError(error instanceof Error ? error.message : "Failed to initialize chat")
      }
    }

    initChat()

    return () => {
      mounted = false
      const cleanup = async () => {
        if (currentClient) {
          console.log("Cleaning up...")
          await currentClient.disconnectUser()
          setClient(null)
          setChannel(null)
        }
      }
      cleanup()
    }
  }, [user?.id, user?.username, isLoaded, id])

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F1531]"></div>
        <p className="ml-2">Loading user...</p>
      </div>
    )
  }

  if (!client || !channel) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F1531]"></div>
        <p className="ml-2">Connecting to chat...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Chat client={client} theme="messaging light">
        <Channel channel={channel} Message={CustomMessage} Input={CustomInput}>
          <Window>
            <CustomChannelHeader />
            <div className="flex-1 overflow-y-auto p-4">
              <MessageList />
            </div>
            <MessageInput />
          </Window>
        </Channel>
      </Chat>
    </div>
  )
}

