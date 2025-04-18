'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import {
  Channel,
  ChannelList,
  Chat,
  DefaultStreamChatGenerics,
  MessageInput,
  MessageList,
  Window,
  useChannelStateContext,
  useCreateChatClient,
  useMessageContext,
  useMessageInputContext,
} from 'stream-chat-react';
import type {
  ChannelFilters,
  ChannelOptions,
  ChannelSort,
  OwnUserResponse,
  StreamChat as StreamChatType,
  UserResponse,
} from 'stream-chat';
import { UserButton, useUser } from '@clerk/nextjs';
import { connectToStream } from '@/lib/stream';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Send,
  MoreVertical,
  Smile,
  Paperclip,
  X,
  Bell,
  MessageSquare,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import 'stream-chat-react/dist/css/v2/index.css';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { BetterTooltip } from './ui/tooltip';
import { AccountSettingsModal } from './account-settings-modal';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserResource } from '@clerk/types';
import { UserData } from './find-mentor-page';
import { createNewConversationAction, createToken } from '@/lib/actions';
import { useChatClient } from '@/hooks/use-chat-client';

function CustomMessage({ userData }: { userData: any }) {
  const { message } = useMessageContext();
  const { user } = useUser(); // Get current Clerk user

  // Determine if the message is from the current user
  const isMyMessage = message.user?.id === userData?.id;
  const messageUserImage = isMyMessage
    ? user?.imageUrl
    : message.user?.image || userData?.imageUrl || "/placeholder.svg"

  // Determine the message user (sender)
  const messageUser = isMyMessage ? user : userData;

  const hasAttachments = message.attachments && message.attachments.length > 0;
  const handleAttachmentClick = (attachment: any) => {
    if (attachment.type === "file") {
      window.open(attachment.asset_url, "_blank")
    }
  }

  return (
    <div className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${isMyMessage ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%]`}>
        <Avatar className="h-8 w-8 rounded-sm">
          <AvatarImage
            src={messageUserImage}
          />
          <AvatarFallback>
            {(messageUser?.firstName as string)?.[0] ||
              (messageUser?.name as string)?.[0] ||
              '?'}
          </AvatarFallback>
        </Avatar>
        <div className={`rounded-lg p-3 ${isMyMessage ? "bg-[#0F1531] text-white" : "bg-gray-100"}`}>
        {!isMyMessage && <p className="text-xs font-semibold mb-1">{message.user?.name}</p>}
          {hasAttachments && (
            <div className="mb-2 space-y-2">
              {message.attachments?.map((attachment: any, index: number) => {
                if (attachment.type === 'image') {
                  return (
                    <img
                      key={index}
                      src={attachment.image_url || '/placeholder.svg'}
                      alt={attachment.fallback}
                      className="max-w-full rounded-lg cursor-pointer"
                      onClick={() => window.open(attachment.image_url, "_blank")}
                    />
                  );
                }
                if (attachment.type === 'file') {
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                      onClick={() => handleAttachmentClick(attachment)}
                    >
                      <Paperclip className="h-4 w-4" />
                      <span className="text-sm truncate">
                        {attachment.title}
                      </span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
          <p className="text-sm break-words">{message.text}</p>
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

// Custom Input component
function CustomInput() {
  const { setText, text, handleSubmit, uploadNewFiles } =
    useMessageInputContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleEmojiSelect = (emoji: any) => {
    setText(text + emoji.native);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments((prev) => [...prev, ...files]);
    if (uploadNewFiles) {
      uploadNewFiles(files);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);
    setAttachments([]);
  };

  return (
    <form onSubmit={handleFormSubmit} className="border-t p-4">
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {attachments.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1"
            >
              <Paperclip className="h-4 w-4" />
              <span className="text-sm truncate max-w-[150px]">
                {file.name}
              </span>
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
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-600"
            >
              <Smile className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 border-none">
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              theme="light"
              previewPosition="none"
            />
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
function CustomChannelHeader({ userData }: { userData: any }) {
  const { channel } = useChannelStateContext();
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const HeaderActions = () => (
    <>
      <BetterTooltip content="Messages">
        <Button variant="ghost" size="icon" className="h-9 w-9 relative">
          <MessageSquare className="h-5 w-5" />
          {channel.state.messages.length > 0 && (
            <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-purple-600" />
          )}
        </Button>
      </BetterTooltip>
      <BetterTooltip content="Notifications">
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Bell className="h-5 w-5 text-muted-foreground" />
        </Button>
      </BetterTooltip>
    </>
  );

  return (
    <header className="bg-[#f7f7f7] px-4 border-full">
      <div className="container mx-auto px-1 sm:px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center bg-white rounded-full px-4 sm:px-4 py-2 sm:py-0 text-[#0F1531] justify-between gap-5">
            <h1 className="font-semibold">{`${userData?.name}`}</h1>
            <Button variant="ghost" size="icon" className="hidden sm:block">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
          <div className="ml-auto rounded-full pl-2 p-1 bg-white flex items-center gap-4">
            {/* Desktop view */}
            <div className="hidden md:flex items-center gap-4">
              <HeaderActions />
            </div>
            {/* Mobile view */}
            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Messages</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notifications</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Image
              src={userData.image}
              alt="User Avatar"
              className="cursor-pointer rounded-full mr-2"
              width={32}
              height={32}
              onClick={toggleModal}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

interface StreamChatProps {
  userData: UserResponse;
  client: StreamChatType | null;
}

export function StreamChatView({ userData, client }: StreamChatProps) {
  if (!client) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F1531]"></div>
        <p className="ml-2">Connecting to chat server...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Channel
        Message={(props) => <CustomMessage {...props} userData={userData} />}
        Input={CustomInput}
      >
        <Window>
          <CustomChannelHeader userData={userData} />
          <div className="flex-1 overflow-y-auto p-4">
            <MessageList />
          </div>
          <MessageInput />
        </Window>
      </Channel>
    </div>
  );
}
