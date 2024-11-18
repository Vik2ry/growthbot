'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { showErrorToast } from '@/lib/handle-error';
import { authSchema } from '@/lib/validations/auth';
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

type Inputs = z.infer<typeof authSchema>;

export function LoginForm() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [loading, setLoading] = React.useState(false);

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: Inputs) {
    if (!isLoaded) return;

    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });

        router.push(`${window.location.origin}/`);
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }
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
                <Input className="max-h-8"
                  type="text"
                  placeholder="rodneymullen180@gmail.com"
                  {...field}
                />
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
              <FormLabel className="text-xs font-normal">Password</FormLabel>
              <FormControl>
                <PasswordInput className="max-h-8" placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-2 bg-[#0F1531]" disabled={loading}>
          {loading && (
            <LoaderIcon
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Sign in
          <span className="sr-only">Sign in</span>
        </Button>
      </form>
    </Form>
  );
}
