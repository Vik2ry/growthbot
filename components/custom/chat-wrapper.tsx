'use client';

import { Chat } from 'stream-chat-react';
import { useChatClient } from '@/hooks/use-chat-client';

interface ChatWrapperProps {
  children: React.ReactNode;
  client?: any; // Optional client prop
}

export default function ChatWrapper({ children, client: propClient }: ChatWrapperProps) {
  // Use the prop client if provided, otherwise use the hook
  const { client: hookClient } = useChatClient();
  const client = propClient || hookClient;

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