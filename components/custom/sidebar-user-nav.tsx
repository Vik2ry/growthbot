'use client';
import { ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { type User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ChevronRight, Edit, LogOut, Plus, User as UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SidebarUserNav({ user }: { user: User }) {
  const { setTheme, theme } = useTheme();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent bg-background data-[state=open]:text-sidebar-accent-foreground h-10">
              <Image
                src={`https://avatar.vercel.sh/${user.email}`}
                alt={user.email ?? 'User Avatar'}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="truncate">{user?.email}</span>
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {`Toggle ${theme === 'light' ? 'dark' : 'light'} mode`}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button
                className="w-full cursor-pointer"
                onClick={() => {
                  signOut({
                    redirectTo: '/',
                  });
                }}
              >
                Sign out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
        <Separator className="my-4" />
        <Button variant="ghost" className="w-full justify-start mb-2">
          <LogOut className="mr-2 h-4 w-4" /> Clear conversations
        </Button>
        <Button variant="ghost" className="w-full justify-start mb-4">
          <UserIcon className="mr-2 h-4 w-4" /> My account
        </Button>
        <div className="flex items-center">
          <Image
            src={require("@/assets/enwonoAvatar.webp")}
            alt="User Avatar"
            className="rounded-full mr-3"
          />
          <div>
            <span className="text-sm font-medium truncate">{user?.email}</span>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Image src={require("@/assets/Logout.svg")} alt="logout" />
          </Button>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
