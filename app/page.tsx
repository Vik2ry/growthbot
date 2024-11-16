'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { redirects } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { MessageCircle, Users, Book, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SpiritualGrowth</h1>
          <Link
            href={redirects.toLogin}
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            Login
          </Link>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Grow Your Faith with AI-Powered Guidance
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            Connect with our chatbot and mentors for personalized spiritual
            growth
          </p>
          <Link
            href={redirects.toSignup}
            className={cn(
              buttonVariants({ variant: 'default', size: 'lg' }),
              'bg-blue-600 hover:bg-blue-700'
            )}
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            How We Help You Grow
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 text-blue-600" />
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
                  <Users className="mr-2 text-blue-600" />
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
                  <Book className="mr-2 text-blue-600" />
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
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-8">
              Connect with Experienced Mentors
            </h3>
            <p className="text-center text-xl mb-8">
              Our platform connects you with knowledgeable Christian mentors who
              can guide you on your spiritual journey.
            </p>
            <div className="flex justify-center">
              <Button variant="secondary" size="lg">
                Find a Mentor
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="container mx-auto px-4 py-16">
          <h3 className="text-3xl font-bold text-center mb-12">
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
            <h3 className="text-3xl font-bold mb-4">
              Start Your Spiritual Growth Journey Today
            </h3>
            <p className="text-xl mb-8">
              Join thousands of others who are deepening their faith with
              SpiritualGrowth
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Sign Up Now
              <Heart className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 SpiritualGrowth. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
