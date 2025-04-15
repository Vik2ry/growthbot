'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { SidebarUserNav } from '@/components/custom/sidebar-user-nav';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { SidebarToggle } from './sidebar-toggle';
import { useUser } from '@clerk/nextjs';
import {
  ChannelList,
  DefaultStreamChatGenerics,
  useCreateChatClient,
} from 'stream-chat-react';
import { useCallback, useEffect, useState } from 'react';
import { createToken } from '@/lib/actions';
import {
  ChannelFilters,
  ChannelOptions,
  ChannelSort,
  UserResponse,
} from 'stream-chat';
import CustomListContainer from '../custom-list-container';
import { SidebarHistory } from './sidebar-history';
import { useChatClient } from '@/hooks/use-chat-client';

export function AppSidebar() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const { user } = useUser();
  const isFindDisciplerPage =
    pathname.startsWith('/find-discipler') && id !== undefined;

  // ✅ Always call `useChatClient()` at the top
  const { client, userData, filters, sort, options } = useChatClient();

  if (!client && isFindDisciplerPage) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F1531]"></div>
        <p className="ml-2">Loading...</p>
      </div>
    );
  }
  return (
    <Sidebar className="flex flex-col bg-white! rounded-3xl border p-4">
      <SidebarHeader>
        <SidebarMenu className="flex-row justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">🪴</div>
            <div className="flex items-center">
              <span className="text-blue-900 font-bold text-xl">Growth</span>
              <span className="text-gray-500 font-medium text-xl">Bot</span>
            </div>
          </div>
          <SidebarToggle />
        </SidebarMenu>
        <div className="border-b" />
      </SidebarHeader>

      <SidebarContent className="flex-1 items-center pl-6 pt-4 overflow-auto">
        {isFindDisciplerPage ? (
          <>
            <Button
              variant="ghost"
              onClick={() => router.push('/find-discipler')}
              className="w-full mb-4 justify-center text-md"
            >
              <Image src={require('@/assets/Star.svg')} alt="star" /> Discover
              Mentor
            </Button>
            <Button
              onClick={() => {
                router.push('/chats');
                router.refresh();
              }}
              className="w-4/5 mb-6 p-5 bg-[#0F1531] hover:bg-indigo-900 text-white text-md"
            >
              <Image src={require('@/assets/Add.svg')} alt="add" />
              New chat
            </Button>
            <div className="border-b" />
            <SidebarGroup>
              {client && (
                <ChannelList
                  sort={sort}
                  filters={filters!}
                  options={options}
                  List={CustomListContainer}
                  sendChannelsToList
                />
              )}
            </SidebarGroup>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              onClick={() => router.push('/find-discipler')}
              className="w-full mb-4 justify-start text-md"
            >
              <Image src={require('@/assets/Star.svg')} alt="star" /> Discover
              Mentor
            </Button>
            <Button
              onClick={() => {
                router.push('/chats');
                router.refresh();
              }}
              className="w-4/5 mb-6 p-5 bg-[#0F1531] hover:bg-indigo-900 text-white text-md"
            >
              <Image src={require('@/assets/Add.svg')} alt="add" />
              New chat
            </Button>
            <div className="border-b" />
            <SidebarGroup>
              <SidebarHistory />
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      <SidebarFooter className="gap-0">
        {user && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarUserNav user={user} />
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
