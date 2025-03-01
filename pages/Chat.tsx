'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Brain, LogOut, Send, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
  unread?: boolean;
}

const Chat = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    { id: '1', title: 'Anxiety Management', preview: "Let's discuss some techniques to manage anxiety", timestamp: new Date(2023, 5, 15, 14, 30), unread: true },
    { id: '2', title: 'Sleep Improvement', preview: 'Here are some strategies for better sleep', timestamp: new Date(2023, 5, 10, 9, 45) },
  ]);

  const [activeChat, setActiveChat] = useState<string>('1');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: 'Hello! How are you feeling today?', sender: 'bot', timestamp: new Date(2023, 5, 15, 14, 31) },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setNewMessage('');

      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "Let's work on some strategies to help you feel better.",
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className={cn("w-80 border-r flex-shrink-0 flex flex-col fixed inset-y-0 left-0 z-50", sidebarOpen ? "translate-x-0" : "-translate-x-full", "md:translate-x-0 transition-transform duration-200")}>      
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold">MindSync</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="md:hidden">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-grow p-4 space-y-1">
          {chatSessions.map((chat) => (
            <button key={chat.id} onClick={() => setActiveChat(chat.id)} className={cn("w-full text-left px-3 py-2 rounded-lg flex flex-col", activeChat === chat.id ? "bg-sidebar-accent" : "hover:bg-sidebar-accent transition-colors duration-200")}>
              <span className="font-medium truncate">{chat.title}</span>
            </button>
          ))}
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <User className="h-5 w-5" />
              </Avatar>
              <div>
                <p className="text-sm font-medium">User Profile</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="ghost" size="icon">
                <LogOut className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </aside>
      <main className="flex-grow flex flex-col">
        <header className="h-16 border-b flex items-center px-4 justify-between">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <h3 className="font-medium">Anxiety Management</h3>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </header>
        <ScrollArea className="flex-grow p-4">
          {messages.map((message) => (
            <motion.div key={message.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={cn("flex", message.sender === 'user' ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[80%] rounded-2xl p-4", message.sender === 'user' ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground")}>
                <p>{message.content}</p>
              </div>
            </motion.div>
          ))}
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="max-w-3xl mx-auto relative">
            <input type="text" placeholder="Type your message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} className="w-full rounded-full border px-4 py-3 pr-12" />
            <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;