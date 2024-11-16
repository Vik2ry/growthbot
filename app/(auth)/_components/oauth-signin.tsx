'use client';

import * as React from 'react';
import { useSignIn } from '@clerk/nextjs';
import { type OAuthStrategy } from '@clerk/types';

import { showErrorToast } from '@/lib/handle-error';
import { Button } from '@/components/ui/button';
import { Google } from '@/components/icons/google';
import { LoaderIcon } from 'lucide-react';
// import { Icons } from '@/components/icons';

const oauthProviders = [
  { name: 'Google', strategy: 'oauth_google', icon: Google },
] satisfies {
  name: string;
  icon: React.FC<React.SVGAttributes<{}>>;
  strategy: OAuthStrategy;
}[];

export function OAuthSignIn() {
  const [loading, setLoading] = React.useState<OAuthStrategy | null>(null);
  const { signIn, isLoaded: signInLoaded } = useSignIn();

  async function oauthSignIn(provider: OAuthStrategy) {
    if (!signInLoaded) return null;

    try {
      setLoading(provider);
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/chats',
      });
    } catch (err) {
      setLoading(null);
      showErrorToast(err);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
      {oauthProviders.map((provider) => {
        return (
          <Button
            key={provider.strategy}
            variant="outline"
            className="w-full bg-background"
            onClick={() => void oauthSignIn(provider.strategy)}
            disabled={loading !== null}
          >
            {loading === provider.strategy ? (
              <LoaderIcon
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            ) : (
              <provider.icon className="mr-2 size-4" aria-hidden="true" />
            )}
            {provider.name}
            <span className="sr-only">{provider.name}</span>
          </Button>
        );
      })}
    </div>
  );
}
