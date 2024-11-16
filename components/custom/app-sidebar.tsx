'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PlusIcon } from '@/components/custom/icons';
import { SidebarHistory } from '@/components/custom/sidebar-history';
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
import { BetterTooltip } from '@/components/ui/tooltip';
import Image from 'next/image';
import { Sidebar as SidebarIcon } from 'lucide-react';
import { SidebarToggle } from './sidebar-toggle';
import { useAuthModal } from '@/app/(auth)/_components/use-auth-modal';
import { useUser } from '@clerk/nextjs';

export function AppSidebar() {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  const { user } = useUser();

  return (
    <Sidebar className="flex flex-col bg-white! rounded-3xl border p-4">
      <SidebarHeader>
        <SidebarMenu className="flex-row justify-between mb-6">
          {/* <div className="flex flex-row justify-between items-center">
            <div
              onClick={() => {
                setOpenMobile(false);
                router.push('/');
                router.refresh();
              }}
              className="flex flex-row gap-3 items-center"
            >
              <span className="text-lg font-semibold px-2 hover:bg-muted rounded-md cursor-pointer">
                Chatbot
              </span>
            </div>
            <BetterTooltip content="New Chat" align="start">
              <Button
                variant="ghost"
                className="p-2 h-fit"
                onClick={() => {
                  setOpenMobile(false);
                  router.push('/');
                  router.refresh();
                }}
              >
                <PlusIcon />
              </Button>
            </BetterTooltip>
          </div> */}
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
      <SidebarContent className="flex-1 pl-6 pt-4 overflow-auto">
        <Button variant="ghost" className="w-full mb-4 justify-start text-md">
          <Image src={require('@/assets/Star.svg')} alt="star" /> Discover
          mentor
        </Button>
        <Button className="w-4/5 mb-6 p-5 bg-[#0F1531] hover:bg-indigo-900 text-white text-md">
          <Image src={require('@/assets/Add.svg')} alt="add" />
          New chat
        </Button>

        <div className="border-b" />
        <SidebarGroup>
          <SidebarHistory />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="gap-0">
        {user && (
          <>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarUserNav user={user} />
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
