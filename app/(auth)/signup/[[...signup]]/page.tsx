import { type Metadata } from 'next';
import Image from 'next/image';
import { SignUp } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign up to your account',
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
        <SignUp />
      </div>
    </div>
  );
}