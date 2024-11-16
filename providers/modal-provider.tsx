'use client';

import { useEffect, useState } from 'react';

import AuthModal from '@/app/(auth)/_components/auth-modal';

export const ModalProvider = () => {
  // hydration error
  // const isMounted = useMountedState();
  // if (!isMounted) return null;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
    </>
  );
};
