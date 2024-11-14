"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronRight, Edit, LogOut, Plus, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Sidebar as SidebarIcon } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="flex flex-col bg-white rounded-3xl border p-4 w-80 m-6"
      {...props}
    >
      <SidebarHeader className="flex-row justify-between mb-6">
        <Image src={require("@/assets/Logo.webp")} alt="GrowthBot" />
        <SidebarIcon />
      </SidebarHeader>
      <SidebarContent className="flex-1 pl-6 pt-4 overflow-auto">
        <Button variant="ghost" className="w-full mb-4 justify-start text-md">
          <Image src={require("@/assets/Star.svg")} alt="star" /> Discover
          mentor
        </Button>
        <Button className="w-4/5 mb-6 p-5 bg-indigo-900 hover:bg-indigo-800 text-white text-md">
          <Image src={require("@/assets/Add.svg")} alt="add" />
          New chat
        </Button>
        <div className="border-b" />
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold pt-6 mb-2">Today</h2>
            <ul className="space-y-1">
              <li className="text-sm truncate">
                What is the Gospel of Jesus christ
              </li>
              <li className="text-sm truncate">
                The Edict of Milan: A Milestone in History
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold pt-6 mb-2">Yesterday</h2>
            <ul className="space-y-3">
              <li className="text-sm truncate">
                Why the Persecution of Christians
              </li>
              <li className="text-sm truncate">Polytheism</li>
              <li className="text-sm truncate">What is salvation</li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold pt-6 mb-2">September</h2>
            <ul className="space-y-1">
              <li className="text-sm truncate">...</li>
            </ul>
          </div>
        </div>
        <div className="border-b" />
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <Separator className="my-4" />
        <Button variant="ghost" className="w-full justify-start mb-2">
          <LogOut className="mr-2 h-4 w-4" /> Clear conversations
        </Button>
        <Button variant="ghost" className="w-full justify-start mb-4">
          <User className="mr-2 h-4 w-4" /> My account
        </Button>
        <div className="flex items-center">
          <Image
            src={require("@/assets/enwonoAvatar.webp")}
            alt="Enwono Ikono"
            className="rounded-full mr-3"
          />
          <div>
            <p className="text-sm font-medium">Enwono Ikono</p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Image src={require("@/assets/Logout.svg")} alt="logout" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
