'use client'

import { useState } from "react"
import { Send, MoreVertical } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Dummy chat messages
const initialMessages = [
  {
    id: 1,
    sender: "mentor",
    content: "Automation: AI can automate repetitive and mundane tasks, saving time and effort for humans. It can handle large volumes of data, perform complex calculations, and execute tasks with precision and consistency. This automation leads to increased productivity and efficiency in various industries.",
    timestamp: "10:00 AM"
  },
  {
    id: 2,
    sender: "user",
    content: "Please provide the sources for this",
    timestamp: "10:05 AM"
  },
  {
    id: 3,
    sender: "mentor",
    content: "Improved accuracy: AI algorithms can achieve high levels of accuracy and precision in tasks such as image recognition, natural language processing, and data analysis. They can eliminate human errors caused by fatigue, distractions, or bias, leading to more reliable and consistent results.",
    timestamp: "10:10 AM"
  }
]

export function ChatWithMentorComponent() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: "user",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setNewMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>OB</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-semibold">Olusegun Banji</h1>
                <div className="flex gap-2">
                  <Badge variant="secondary">Love</Badge>
                  <Badge variant="secondary">Community</Badge>
                  <Badge variant="secondary">Bible</Badge>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%]`}>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>OB</AvatarFallback>
              </Avatar>
              <div className={`rounded-lg p-3 ${message.sender === 'user' ? 'bg-[#0F1531] text-white' : 'bg-gray-100'}`}>
                <p className="text-sm">{message.content}</p>
                <span className="text-xs text-gray-400 mt-1 block">{message.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type message"
            className="flex-1"
          />
          <Button type="submit" size="icon" className="bg-[#0F1531] hover:bg-[#0F1531]/90">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}