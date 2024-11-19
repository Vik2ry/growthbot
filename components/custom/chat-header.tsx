'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';
import { Bell, MessageCircle } from 'lucide-react';
import Image from 'next/image';

import { ModelSelector } from '@/components/custom/model-selector';
import { SidebarToggle } from '@/components/custom/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { BetterTooltip } from '@/components/ui/tooltip';

import { PlusIcon, VercelIcon } from './icons';
import { useSidebar } from '../ui/sidebar';
import { useUser } from '@clerk/nextjs';

export function ChatHeader({ selectedModelId }: { selectedModelId: string }) {
  const router = useRouter();
  const { open } = useSidebar();

  const { width: windowWidth } = useWindowSize();
  const { user } = useUser();

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <SidebarToggle />
      {(!open || windowWidth < 768) && (
        <BetterTooltip content="New Chat">
          <Button
            variant="outline"
            className="order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0"
            onClick={() => {
              router.push('/chats');
              router.refresh();
            }}
          >
            <PlusIcon />
            <span className="md:sr-only">New Chat</span>
          </Button>
        </BetterTooltip>
      )}
      <div className="ml-auto rounded-full p-2 bg-[#f7f7f7] flex items-center gap-4">
        <BetterTooltip content="Messages">
          <Button variant="ghost" size="icon" className="h-9 w-9 relative">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.861 5.5C18.861 4.58334 18.111 3.83334 17.1943 3.83334H3.861C2.94434 3.83334 2.19434 4.58334 2.19434 5.5M18.861 5.5V15.5C18.861 16.4167 18.111 17.1667 17.1943 17.1667H3.861C2.94434 17.1667 2.19434 16.4167 2.19434 15.5V5.5M18.861 5.5L10.5277 11.3333L2.19434 5.5"
                stroke="#1E1E1E"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-purple-600" />
          </Button>
        </BetterTooltip>
        <BetterTooltip content="Notifications">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="h-5 w-5 text-muted-foreground" />
          </Button>
        </BetterTooltip>
        <Image
          src={user?.imageUrl ?? require('@/assets/enwonoAvatar.webp')}
          alt="User Avatar"
          className="rounded-full mr-3"
          width={32}
          height={32}
        />
      </div>
    </header>
  );
}
