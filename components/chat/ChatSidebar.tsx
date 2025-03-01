'use client';

import Link from 'next/link';
import { ArrowLeft, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  title: string;
  setSidebarOpen: (open: boolean) => void;
}

const ChatHeader = ({ title, setSidebarOpen }: ChatHeaderProps) => {
  return (
    <header className="h-16 border-b border-border flex items-center px-4 justify-between">
      <div className="flex items-center space-x-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setSidebarOpen(true)}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default ChatHeader;
