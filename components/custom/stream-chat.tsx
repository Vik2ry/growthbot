'use client';

import { useEffect, useState } from 'react';
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Window,
  useMessageContext,
  useChannelActionContext,
  useChannelStateContext,
  useMessageInputContext,
} from 'stream-chat-react';
import type { StreamChat as StreamChatType } from 'stream-chat';
import { useClerk, useUser } from '@clerk/nextjs';
import { Send, MoreVertical } from 'lucide-react';
import { connectToStream } from '@/lib/stream';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import 'stream-chat-react/dist/css/v2/index.css';

// Custom Message component to match the design
function CustomMessage() {
  const { message, isMyMessage } = useMessageContext();

  return (
    <div
      className={`flex ${isMyMessage() ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`flex ${isMyMessage() ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%]`}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={message.user?.image || '/placeholder.svg'} />
          <AvatarFallback>{message.user?.name?.[0] || '?'}</AvatarFallback>
        </Avatar>
        <div
          className={`rounded-lg p-3 ${isMyMessage() ? 'bg-[#0F1531] text-white' : 'bg-gray-100'}`}
        >
          <p className="text-sm">{message.text}</p>
          {(message.attachments?.length ?? 0) > 0 && (
            <div className="mt-2 space-y-2">
              {message.attachments?.map((attachment, index) => (
                <div key={index}>
                  {attachment.image_url && (
                    <img
                      src={attachment.image_url || '/placeholder.svg'}
                      alt={attachment.fallback || 'attachment'}
                      className="max-w-[200px] rounded-lg"
                    />
                  )}
                  {attachment.asset_url && !attachment.image_url && (
                    <a
                      href={attachment.asset_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      {attachment.title || 'Attached file'}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
          <span className="text-xs text-gray-400 mt-1 block">
            {new Date(message.created_at!).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

// Updated Custom Input component with correct context usage
function CustomInput() {
  const { setText, text, handleSubmit } = useMessageInputContext();
  const { sendMessage } = useChannelActionContext();
  const { channel } = useChannelStateContext();

  const overrideSubmitHandler = (
    message: { text: string; attachments: any[] },
    channelId: string
  ) => {
    const updatedMessage = {
      ...message,
      text: message.text,
    };

    if (message.text) {
      sendMessage(updatedMessage);
      setText(''); // Clear input after sending
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (text.trim() && channel?.id) {
      overrideSubmitHandler(
        {
          text: text.trim(),
          attachments: [],
        },
        channel.id
      );
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="border-t p-4">
      <div className="flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message"
          className="flex-1"
        />
        <Button
          type="submit"
          size="icon"
          className="bg-[#0F1531] hover:bg-[#0F1531]/90"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}

// Custom Channel Header component
function CustomChannelHeader() {
  const { message } = useMessageContext();
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={message.user?.image || '/placeholder.svg'} />
              <AvatarFallback>{message.user?.name?.[0] || '?'}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold">{message.user?.name}</h1>
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
  );
}

interface StreamChatProps {
  id: string;
}

export function StreamChat({ id }: StreamChatProps) {
  const { user } = useUser();
  const [client, setClient] = useState<StreamChatType | null>(null);
  const [channel, setChannel] = useState<any>(null);

  useEffect(() => {
    if (!user?.id) return;

    const initChat = async () => {
      const streamClient = await connectToStream(
        user.id,
        user.username || 'Anonymous'
      );

      const channel = streamClient.channel('messaging', id, {
        name: `Chat ${id}`,
        members: [user.id],
      });

      await channel.watch();

      setClient(streamClient);
      setChannel(channel);
    };

    initChat();

    return () => {
      if (client) {
        client.disconnectUser();
        setClient(null);
        setChannel(null);
      }
    };
  }, [user?.id, user?.username, id, client]);

  if (!client || !channel) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F1531]"></div>
      </div>
    );
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
  );
}
