"use client"

import { useEffect, useState, useRef } from "react"
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Window,
  useChannelStateContext,
  useMessageContext,
  useMessageInputContext,
} from "stream-chat-react"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import type { StreamChat as StreamChatType } from "stream-chat"
import { useUser } from "@clerk/nextjs"
import { Send, MoreVertical, Smile, Paperclip, X } from "lucide-react"
import { connectToStream } from "@/lib/stream"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import "stream-chat-react/dist/css/v2/index.css"

// Custom Message component
function CustomMessage({ userData }: { userData: any }) {
  const { message, isMyMessage } = useMessageContext()

  const messageUser = message.user?.id === userData?.id ? userData : message.user

  const hasAttachments = message.attachments && message.attachments.length > 0

  return (
    <div className={`flex ${isMyMessage() ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`flex ${isMyMessage() ? "flex-row-reverse" : "flex-row"} items-start gap-2 max-w-[80%]`}>
        <Avatar className="h-8 w-8">
          <AvatarImage src={messageUser?.imageUrl || "/placeholder.svg"} />
          <AvatarFallback>{messageUser?.firstName?.[0] || messageUser?.username?.[0] || "?"}</AvatarFallback>
        </Avatar>
        <div className={`rounded-lg p-3 ${isMyMessage() ? "bg-[#0F1531] text-white" : "bg-gray-100"}`}>
          {hasAttachments && (
            <div className="mb-2 space-y-2">
              {message.attachments.map((attachment: any, index: number) => {
                if (attachment.type === "image") {
                  return (
                    <img
                      key={index}
                      src={attachment.image_url || "/placeholder.svg"}
                      alt={attachment.fallback}
                      className="max-w-full rounded-lg"
                    />
                  )
                }
                if (attachment.type === "file") {
                  return (
                    <a
                      key={index}
                      href={attachment.asset_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Paperclip className="h-4 w-4" />
                      <span className="text-sm truncate">{attachment.title}</span>
                    </a>
                  )
                }
                return null
              })}
            </div>
          )}
          <p className="text-sm break-words">{message.text}</p>
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
  const { setText, text, handleSubmit, uploadNewFiles } = useMessageInputContext()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [attachments, setAttachments] = useState<File[]>([])

  const handleEmojiSelect = (emoji: any) => {
    setText(text + emoji.native)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAttachments((prev) => [...prev, ...files])
    if (uploadNewFiles) {
      uploadNewFiles(files)
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(e)
    setAttachments([])
  }

  return (
    <form onSubmit={handleFormSubmit} className="border-t p-4">
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {attachments.map((file, index) => (
            <div key={index} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
              <Paperclip className="h-4 w-4" />
              <span className="text-sm truncate max-w-[150px]">{file.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => removeAttachment(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <Input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" size="icon" className="text-gray-500 hover:text-gray-600">
              <Smile className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 border-none">
            <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" previewPosition="none" />
          </PopoverContent>
        </Popover>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-gray-600"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type message" className="flex-1" />
        <Button type="submit" size="icon" className="bg-[#0F1531] hover:bg-[#0F1531]/90">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}

// Rest of the code remains the same...

