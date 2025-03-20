// app/layout.tsx (Server Component)
import { AppSidebar } from '@/components/custom/app-sidebar';
import ChatWrapper from '@/components/custom/chat-wrapper';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <SidebarProvider defaultOpen={true}>
        <ChatWrapper>
          <AppSidebar />
          <SidebarInset>{children}</SidebarInset>
        </ChatWrapper>
      </SidebarProvider>
    </div>
  );
}