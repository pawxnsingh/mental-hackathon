import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

export async function EnhancedLandingPage() {
  const User=await currentUser();
  console.log(User?.id);
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-purple-500 text-white">
        {/* Logo */}
        <div className="flex items-center">
          <span className="flex items-center justify-center w-8 h-8 bg-white text-purple-500 rounded-full font-bold mr-2">R</span>
          <span className="text-xl font-bold">ReplyGuy</span>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex gap-8">
          <a href="#faq" className="font-medium hover:underline">FAQ</a>
          <a href="#pricing" className="font-medium hover:underline">Pricing</a>
          <a href="#blog" className="font-medium hover:underline">Blog</a>
        </nav>
        
        {/* Auth Button */}
        <div>
        <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
            <Button>
              <SignInButton />
              </Button>
              <Button>
              <SignUpButton />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
        </div>
      </header>

      {/* Mobile Navigation (shown only on small screens) */}
      <div className="md:hidden flex justify-center gap-4 py-2 bg-purple-400 text-white">
        <a href="#faq" className="font-medium hover:underline">FAQ</a>
        <a href="#pricing" className="font-medium hover:underline">Pricing</a>
        <a href="#blog" className="font-medium hover:underline">Blog</a>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ReplyGuy</h1>
          <p className="text-xl md:text-2xl text-gray-600">
            Streamline your customer communications with our intuitive platform.
          </p>
          <div className="mt-8">
            <Button className="rounded-full px-8 py-6 bg-purple-500 hover:bg-purple-600 text-white">
              Get Started
            </Button>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle>Unified Inbox</CardTitle>
              <CardDescription>Manage all customer messages in one place</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Combine messages from email, social media, and chat platforms into a single streamlined interface.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Smart Automation</CardTitle>
              <CardDescription>Save time with automated workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Set up rules to categorize, prioritize, and route messages to the right team members automatically.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Gain insights from your communications</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Track response times, customer satisfaction, and team performance with detailed analytics.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

