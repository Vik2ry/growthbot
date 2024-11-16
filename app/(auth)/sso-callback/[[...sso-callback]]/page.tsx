import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

import { Shell } from '@/components/shell';
import { LoaderIcon } from 'lucide-react';

export default function SSOCallbackPage() {
  return (
    <Shell className="max-w-lg place-items-center">
      <LoaderIcon className="size-16 animate-spin" aria-hidden="true" />
      <AuthenticateWithRedirectCallback />
    </Shell>
  );
}
