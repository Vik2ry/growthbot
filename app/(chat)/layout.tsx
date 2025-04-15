'use client';

import { useParams, usePathname } from 'next/navigation';
import { AppSidebar } from '@/components/custom/app-sidebar';
import ChatWrapper from '@/components/custom/chat-wrapper';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { id } = useParams<{ id: string }>();
  const isFindDisciplerPage = pathname.startsWith('/find-discipler') && id !== undefined && pathname;

  return (
    <div className="flex h-screen">
      <SidebarProvider defaultOpen={true}>
        {isFindDisciplerPage ? (
          <ChatWrapper>
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
          </ChatWrapper>
        ) : (
          <>
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
          </>
        )}
      </SidebarProvider>
    </div>
  );
}