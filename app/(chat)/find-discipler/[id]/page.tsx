'use client';

import { StreamChatView } from '@/components/stream-chat';
import { useChatClient } from '@/hooks/use-chat-client';
import { useParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { UserResponse } from 'stream-chat';

export interface UserData {
  id: string;
  username?: string;
  imageUrl?: string;
  firstName?: string;
  lastName?: string;
}

export default function ChatPage() {
  // Properly unwrap params
  const { client, userData } = useChatClient();
  return userData ? (
    <StreamChatView userData={userData} client={client} />
  ) : (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F1531]"></div>
      <p className="ml-2">Loading...</p>
    </div>
  );
}
