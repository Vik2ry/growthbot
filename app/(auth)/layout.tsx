import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { Logo } from '@/components/icons/logo';

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="relative grid min-h-screen grid-cols-1 overflow-hidden">
      <main className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 items-center">
        {children}
      </main>
    </div>
  );
}
