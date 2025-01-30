import { AppSidebar } from '@/components/custom/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </div>
  );
}
