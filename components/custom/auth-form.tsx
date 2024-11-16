'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface NewAuthFormProps {
  type: 'login' | 'signup'
  action: (formData: FormData) => void
  children: React.ReactNode
  defaultEmail?: string
}

export function AuthForm({ type = 'signup', action, children, defaultEmail = '' }: NewAuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="w-full max-w-[440px] rounded-lg bg-white p-8">
      <div className="mb-6 flex items-center justify-center gap-2">
        <Image src="/growth-bot-logo.png" alt="GrowthBot Logo" width={24} height={24} />
        <span className="text-xl font-semibold">GrowthBot</span>
      </div>
      
      <h2 className="mb-8 text-center text-2xl font-semibold">
        {type === 'login' ? 'Login' : 'Sign up'}
      </h2>
      
      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm">Email Address</div>
          <Input
            name="email"
            type="email"
            placeholder="Ikono"
            required
            className="h-12"
            defaultValue={defaultEmail}
          />
        </div>
        
        {type === 'signup' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm">First Name</div>
              <Input
                name="firstName"
                placeholder="Ikono"
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm">Last Name</div>
              <Input
                name="lastName"
                placeholder="Ikono"
                required
                className="h-12"
              />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <div className="text-sm">Password</div>
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Ikono"
              required
              className="h-12 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {type === 'signup' && (
          <div className="space-y-2">
            <div className="text-sm">Confirm Password</div>
            <div className="relative">
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Ikono"
                required
                className="h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        )}

        {children}

        <div className="relative py-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="h-12 w-full"
        >
          <Image
            src="/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="mr-2"
          />
          {type === 'login' ? 'Continue with Google' : 'Sign up with Google'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        {type === 'login' ? (
          <>
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold text-black hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-black hover:underline">
              Sign in
            </Link>
          </>
        )}
      </p>
    </div>
  )
}