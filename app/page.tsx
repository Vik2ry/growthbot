'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { redirects } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { MessageCircle, Users, Book, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto px-4 py-8 relative z-10">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">🪴</div>
            <div className="flex items-center">
              <span className="text-blue-900 font-bold text-xl">Growth</span>
              <span className="text-gray-500 font-medium text-xl">Bot</span>
            </div>
          </div>
          <Link
            href={redirects.toLogin}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'border-[#0a2647] text-[#0a2647]'
            )}
          >
            Login
          </Link>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen">
          <Image
            src={require('@/assets/bg_auth.webp')}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="container mx-auto px-4 py-16 relative z-10 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Grow Your Faith with AI-Powered Guidance
            </h2>
            <p className="text-xl mb-8">
              Connect with our chatbot and mentors for personalized spiritual
              growth
            </p>
            <Link
              href={redirects.toSignup}
              className={cn(
                buttonVariants({ variant: 'default', size: 'lg' }),
                'bg-[#0F1531] hover:bg-[#0a2647]'
              )}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-center">
            <div className="relative w-full max-w-[800px] aspect-[16/9] top-20">
              <Image
                src={require('@/assets/MacBookPro.webp')}
                alt="MacBook Pro"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-[#0a2647]">
            How We Help You Grow
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 text-[#0a2647]" />
                  24/7 Spiritual Guidance
                </CardTitle>
              </CardHeader>
              <CardContent>
                Our AI chatbot is always available to answer your questions and
                provide biblical insights.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 text-[#0a2647]" />
                  Connect with Mentors
                </CardTitle>
              </CardHeader>
              <CardContent>
                Get personalized advice and support from experienced Christian
                mentors.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="mr-2 text-[#0a2647]" />
                  Daily Devotionals
                </CardTitle>
              </CardHeader>
              <CardContent>
                Receive daily scripture readings and reflections to deepen your
                faith.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Mentor Section */}
        <section className="bg-[#0a2647] text-white py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-8">
              Connect with Experienced Mentors
            </h3>
            <p className="text-center text-xl mb-8">
              Our platform connects you with knowledgeable Christian mentors who
              can guide you on your spiritual journey.
            </p>
            <div className="flex justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-[#0a2647] hover:bg-gray-100"
              >
                Find a Mentor
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="container mx-auto px-4 py-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-[#0a2647]">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <p className="italic mb-4">
                  "This app has been a blessing in my life. The daily
                  devotionals and chatbot have helped me stay connected to my
                  faith even during busy times."
                </p>
                <p className="font-semibold">- Sarah M.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="italic mb-4">
                  "The mentor I connected with through this platform has
                  provided invaluable guidance and support. I'm grateful for
                  this resource!"
                </p>
                <p className="font-semibold">- John D.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-4 text-[#0a2647]">
              Start Your Spiritual Growth Journey Today
            </h3>
            <p className="text-xl mb-8 text-gray-600">
              Join thousands of others who are deepening their faith with
              SpiritualGrowth
            </p>
            <Link href={redirects.toSignup}>
              <Button
                size="lg"
                className="bg-[#0F1531] hover:bg-[#0a2647] text-white"
              >
                Sign Up Now
              </Button>
              <Heart className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-[#0a2647] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 GrowthBot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
