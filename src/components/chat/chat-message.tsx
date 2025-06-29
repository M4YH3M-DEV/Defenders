'use client';

import { Bot, User, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string | string[] | undefined;
}

export function ChatMessage({ message }: { message: Message }) {
  const { role, content } = message;

  const renderContent = () => {
    if (role === 'system' && Array.isArray(content)) {
      return (
        <Card className="bg-destructive/10 border-destructive/50">
            <CardHeader className="flex-row items-center gap-3 pb-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                <CardTitle className="text-destructive text-lg">Immediate Support</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4 text-destructive/90">
                    It sounds like you are in distress. Please consider reaching out to one of the following resources for immediate help.
                </p>
                <ul className="space-y-2">
                    {content.map((item, index) => (
                        <li key={index} className="text-sm font-medium text-destructive">
                           <a href={item.startsWith('http') ? item : `tel:${item.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{item}</a>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      );
    }
    return <p className="leading-relaxed whitespace-pre-wrap">{content}</p>;
  }

  if (role === 'system') {
    return renderContent();
  }

  return (
    <div
      className={cn(
        'flex items-start gap-4',
        role === 'user' && 'justify-end'
      )}
    >
      {role === 'assistant' && (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>
      )}
      <div
        className={cn(
          'max-w-md rounded-xl px-4 py-3',
          role === 'user'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground'
        )}
      >
        {renderContent()}
      </div>
       {role === 'user' && (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <User className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
