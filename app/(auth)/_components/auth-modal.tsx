import React, { useState } from 'react';
import { useAuthModal } from './use-auth-modal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LoginForm } from './login-form';

function AuthModal() {
  const [view, setView] = useState<'login' | 'register'>('login');
  const { isOpen, onClose } = useAuthModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {view === 'login' && <LoginForm />}
        {/* {view === 'register' && <RegisterForm />} */}
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
