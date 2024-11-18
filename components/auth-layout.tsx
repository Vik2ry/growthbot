'use client'

import Image from "next/image"
import { usePathname } from "next/navigation"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isSignUp = pathname === "/signup"

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-blue-950 via-teal-900 to-teal-800">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-[1200px] aspect-[16/9]">
          <Image
            src="/MacBookPro.webp"
            alt="MacBook Pro"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-[440px] rounded-xl bg-white p-8 shadow-2xl">
          <div className="mb-6 flex justify-center">
            <Image
              src="/growthbot-logo.png"
              alt="GrowthBot"
              width={140}
              height={32}
              className="h-8 w-auto"
            />
          </div>
          <h1 className="text-center text-2xl font-semibold mb-1">
            {isSignUp ? "Sign up" : "Login"}
          </h1>
          {children}
          <div className="mt-6 text-center">
            {isSignUp ? (
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/signin" className="text-blue-600 hover:underline">
                  Sign in
                </a>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}