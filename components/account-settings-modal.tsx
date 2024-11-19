'use client'

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AccountSettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccountSettingsModal({ open, onOpenChange }: AccountSettingsModalProps) {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Account & settings</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <div className="w-48 space-y-1">
            <TabsList className="flex flex-col w-full bg-transparent space-y-1">
              <TabsTrigger
                value="profile"
                className="w-full justify-start bg-transparent data-[state=active]:bg-[#0F1531] data-[state=active]:text-white px-4 py-2 rounded-lg"
                onClick={() => setActiveTab("profile")}
              >
                My profile
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="w-full justify-start bg-transparent data-[state=active]:bg-[#0F1531] data-[state=active]:text-white px-4 py-2 rounded-lg"
                onClick={() => setActiveTab("password")}
              >
                Password
              </TabsTrigger>
              <TabsTrigger
                value="privacy"
                className="w-full justify-start bg-transparent data-[state=active]:bg-[#0F1531] data-[state=active]:text-white px-4 py-2 rounded-lg"
                onClick={() => setActiveTab("privacy")}
              >
                Privacy and terms
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex-1">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>OB</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">Olusegun Banji</h2>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Love</Badge>
                    <Badge variant="secondary">Community</Badge>
                    <Badge variant="secondary">Bible</Badge>
                  </div>
                  <div className="flex gap-8 text-center">
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
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm">First Name</label>
                      <Input placeholder="Olusegun" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Last Name</label>
                      <Input placeholder="Banji" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Bio</label>
                    <Textarea 
                      placeholder="Tell us about yourself"
                      className="min-h-[100px]"
                      defaultValue="Automation: AI can automate repetitive and mundane tasks, saving time and effort for humans. It can handle large volumes of data, perform complex calculations, and execute tasks with precision and consistency. This automation leads to increased productivity and efficiency in various industries."
                    />
                  </div>
                  <Button className="w-full bg-[#0F1531] hover:bg-[#0F1531]/90">Save changes</Button>
                </div>
              </div>
            )}
            {activeTab === "password" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm">Old Password</label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">New Password</label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">Retype New Password</label>
                  <Input type="password" />
                </div>
                <Button className="w-full bg-[#0F1531] hover:bg-[#0F1531]/90">Change password</Button>
              </div>
            )}
            {activeTab === "privacy" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Thank you for using our for your progress. Please send us feedback at feedback@growthbot.com
                  Thank you for using our for your progress. Please send us feedback at feedback@growthbot.com
                  Thank you for using our for your progress. Please send us feedback at feedback@growthbot.com
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}