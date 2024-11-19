'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useSignUp } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

import { showErrorToast } from '@/lib/handle-error';
import { signupSchema } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { LoaderIcon } from 'lucide-react';

type Inputs = z.infer<typeof signupSchema>;

export function SignUpForm() {
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();
  const [loading, setLoading] = React.useState(false);

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: Inputs) {
    if (!isLoaded) return;

    setLoading(true);

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      // Send email verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      router.push('/signup/verify-email');
      toast.message('Check your email', {
        description: 'We sent you a 6-digit verification code.',
      });
    } catch (err) {
      showErrorToast(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form className="grid gap-1" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-normal">Email</FormLabel>
              <FormControl>
                <Input className="max-h-5" placeholder="rodneymullen180@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-x-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-normal">First Name</FormLabel>
                <FormControl>
                  <Input className="max-h-5" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-normal">Last Name</FormLabel>
                <FormControl>
                  <Input className="max-h-5" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid md:gap-x-6 md:grid-cols-1">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-normal">Password</FormLabel>
                <FormControl>
                  <PasswordInput className="max-h-5" placeholder="**********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-normal">Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput className="max-h-5" placeholder="**********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="mt-2 bg-[#0F1531]" disabled={loading}>
          {loading && (
            <LoaderIcon
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Sign up
          <span className="sr-only">Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  );
}
