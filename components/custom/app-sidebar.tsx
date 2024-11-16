'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type User } from 'next-auth';

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

export function AppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  const { onOpen } = useAuthModal();

  return (
    <Sidebar className="flex flex-col bg-white rounded-3xl border p-4 w-80 m-6">
      <SidebarHeader className="flex-row justify-between mb-6">
        <SidebarMenu>
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
          <Image src={require('@/assets/Logo.webp')} alt="GrowthBot" />
          <SidebarToggle />
          <div className="border-b" />
        </SidebarMenu>
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

        <Button onClick={onOpen}>Auth</Button>
        <div className="border-b" />
        <SidebarGroup>
          <SidebarHistory user={user} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="gap-0">
        {user && (
          <>
            <div className="border-b" />
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
