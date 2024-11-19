'use client'

import { useState } from "react"
import { Search, Bell, MessageCircle, MoreVertical } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Dummy mentor data
const mentors = Array(12).fill({
  name: "Olusegun Banji",
  avatar: "/placeholder.svg",
  tags: ["Love", "Community", "Bible"],
  rating: 3,
  bio: "Automation: AI can automate repetitive and mundane tasks, saving time and effort for humans. It can handle large volumes of data, perform complex calculations, and execute tasks with precision and consistency. This automation leads to increased productivity and efficiency in various industries."
})

export function FindMentorPageComponent() {
  const [selectedMentor, setSelectedMentor] = useState(null)

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Discover a mentor</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <MessageCircle className="h-6 w-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-purple-600 rounded-full text-[10px] flex items-center justify-center text-white">
                  12
                </span>
              </div>
              <Bell className="h-6 w-6 text-gray-600" />
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>OB</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <p className="text-gray-600 mt-2 text-center max-w-2xl mx-auto">
            Find mentors to help in your growth. Browse available mentors find a match, prayerfully consider then and when you are sure feel free to send them a chat
          </p>
          <div className="mt-6 relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input className="pl-10" placeholder="search a tag, level, name" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mentors.map((mentor, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="bg-white rounded-lg border p-4 cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={mentor.avatar} />
                        <AvatarFallback>OB</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{mentor.name}</h3>
                      </div>
                    </div>
                    <div className="flex">
                      {Array(5).fill(null).map((_, i) => (
                        <span key={i} className={`text-lg ${i < mentor.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {mentor.tags.map((tag: string, i: number) => (
                      <Badge key={i} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={mentor.avatar} />
                      <AvatarFallback>OB</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <DialogTitle className="mb-2">{mentor.name}</DialogTitle>
                      <div className="flex gap-2 justify-center">
                        {mentor.tags.map((tag: string, i: number) => (
                          <Badge key={i} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <div className="flex justify-center gap-8 text-center">
                    <div>
                      <div className="text-xl font-semibold">3⭐</div>
                      <div className="text-sm text-gray-500">Stages completed</div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold">15</div>
                      <div className="text-sm text-gray-500">Disciples</div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold">1000</div>
                      <div className="text-sm text-gray-500">Responses</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{mentor.bio}</p>
                  <div className="space-y-2">
                    <Button className="w-full bg-[#0F1531] hover:bg-[#0F1531]/90">Start chat</Button>
                    <Button variant="outline" className="w-full">Save to prospects</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" className="px-8">Load more</Button>
        </div>
      </main>
    </div>
  )
}