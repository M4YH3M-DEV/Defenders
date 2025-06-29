'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { ChatMessage, type Message } from '@/components/chat/chat-message';
import { getChatbotResponse } from '@/app/actions';
import { Skeleton } from '../ui/skeleton';

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      role: 'assistant',
      content: "Hello! I'm MindEase, your personal mental wellness assistant. How can I support you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');

    startTransition(async () => {
        const conversationHistory = messages
            .map((msg) => `${msg.role}: ${msg.content}`)
            .join('\n');
        
        const response = await getChatbotResponse(input, conversationHistory);
        
        if (response.type === 'emergency') {
            const emergencyMessage: Message = {
                id: Date.now().toString() + '-emergency',
                role: 'system',
                content: response.suggestions,
            };
            setMessages((prev) => [...prev, emergencyMessage]);
        } else {
            const assistantMessage: Message = {
                id: Date.now().toString() + '-assistant',
                role: 'assistant',
                content: response.message,
            };
            setMessages((prev) => [...prev, assistantMessage]);
        }
    });
  };

  return (
    <Card className="h-full flex flex-col shadow-lg rounded-xl">
      <CardContent className="flex-1 flex flex-col p-4 md:p-6">
        <ScrollArea className="flex-1 pr-4 -mr-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isPending && (
                <div className="flex items-start gap-4">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <BotIcon className="size-5" />
                    </div>
                    <div className="flex-1 space-y-2 pt-1">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
        <div className="mt-6 border-t pt-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 resize-none rounded-lg p-3"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              disabled={isPending}
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isPending} aria-label="Send message">
              <SendHorizonal className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

function BotIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}
