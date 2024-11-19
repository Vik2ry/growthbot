'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LegalContent } from './legal-content';
import { privacyPolicy } from '@/data/privacy-policy';
import { tos } from '@/data/terms-of-service';
interface AccountSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
}

export function AccountSettingsModal({
  open,
  onOpenChange,
  user,
}: AccountSettingsModalProps) {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[70vh]">
        <DialogHeader>
          <DialogTitle>Account & settings</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <div className="flex gap-4 pt-3 pr-4">
            <div className="w-48 pt-12 space-y-1">
              <TabsList className="flex flex-col w-full bg-transparent space-y-1">
                <TabsTrigger
                  value="profile"
                  className="w-full justify-start bg-transparent data-[state=active]:bg-[#0F1531] data-[state=active]:text-white px-4 py-2 rounded-lg"
                >
                  My profile
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="w-full justify-start bg-transparent data-[state=active]:bg-[#0F1531] data-[state=active]:text-white px-4 py-2 rounded-lg"
                >
                  Password
                </TabsTrigger>
                <TabsTrigger
                  value="privacy"
                  className="w-full justify-start bg-transparent data-[state=active]:bg-[#0F1531] data-[state=active]:text-white px-4 py-2 rounded-lg"
                >
                  Privacy Policy
                </TabsTrigger>
                <TabsTrigger
                  value="tos"
                  className="w-full justify-start bg-transparent data-[state=active]:bg-[#0F1531] data-[state=active]:text-white px-4 py-2 rounded-lg"
                >
                  Terms Of Service
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="flex-1">
              <TabsContent value="profile" className="h-[50vh] overflow-y-auto scrollbar-hide">
                <div className="space-y-4">
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
                        <div className="text-sm text-gray-500">
                          Stages completed
                        </div>
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
                        defaultValue="Automation: AI can automate repetitive and mundane tasks, saving time and effort for humans..."
                      />
                    </div>
                    <Button className="w-full bg-[#0F1531] hover:bg-[#0F1531]/90">
                      Save changes
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="password" className="h-[50vh] overflow-y-auto scrollbar-hide">
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
                  <Button className="w-full bg-[#0F1531] hover:bg-[#0F1531]/90">
                    Change password
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="privacy" className="h-[50vh] overflow-y-auto scrollbar-hide">
                <div className="space-y-4">
                <LegalContent title="PRIVACY POLICY" content={privacyPolicy} />
                </div>
              </TabsContent>
              <TabsContent value="tos" className="h-[50vh] overflow-y-auto scrollbar-hide">
                <div className="space-y-4">
                <LegalContent title="TERMS AND CONDITIONS" content={tos} />
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
