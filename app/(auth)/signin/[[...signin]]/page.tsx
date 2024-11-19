import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { OAuthSignIn } from '@/app/(auth)/_components/oauth-signin';
import { LoginForm } from '@/app/(auth)/_components/login-form';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
};

export default function SignInPage() {
  return (
    <div className="relative min-h-screen w-full">
      <Image
        src={require('@/assets/bg_auth.webp')}
        alt="Background"
        fill
        className="object-cover overflow-hidden -top-[759px] -left-[27px] md:top-0 md:left-0"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 md:bg-opacity-0" />
      <div className="absolute inset-0 md:inset-20 opacity-85 flex items-center md:items-start justify-center">
        <div className="relative w-full aspect-[16/9] hidden md:block">
          <Image
            src={require('@/assets/MacBookPro.webp')}
            alt="MacBook Pro"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      <div className="relative flex-col items-center justify-center min-h-screen md:min-h-0 md:flex-row md:left-[55%] md:items-start md:pt-20 px-4 md:px-0">
        <div className="w-full max-w-[440px] rounded-lg bg-white p-5 shadow-lg">
          <div className="flex justify-center items-center mb-2">
            <div className="text-md">🪴</div>
            <div className="flex items-center">
              <span className="text-blue-900 font-bold text-md">Growth</span>
              <span className="text-gray-500 font-medium text-md">Bot</span>
            </div>
          </div>
          <h2 className="text-lg font-normal mb-3 text-center">Login</h2>
          <div>
            <LoginForm />
            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-md uppercase">
                <span className="bg-white px-2 text-gray-500">OR</span>
              </div>
            </div>
            <OAuthSignIn />
          </div>
        </div>
        <div className="w-full max-w-[440px] mt-4 rounded-lg bg-white px-5 py-3 shadow-lg">
          <div className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-900 underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}