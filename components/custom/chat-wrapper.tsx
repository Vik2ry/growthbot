// components/custom/chat-wrapper.tsx (Client Component)
'use client';

import { Chat } from 'stream-chat-react';
import { useChatClient } from '@/hooks/use-chat-client';

export default function ChatWrapper({ children }: { children: React.ReactNode }) {
  const { client } = useChatClient();

  if (!client) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F1531]"></div>
        <p className="ml-2">Connecting to chat server...</p>
      </div>
    );
  }

  return <Chat client={client} theme="messaging light">{children}</Chat>;
}