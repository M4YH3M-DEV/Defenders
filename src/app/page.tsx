import { ChatInterface } from '@/components/chat/chat-interface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
        <header className="mb-8">
            <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground">
                Welcome to Defenders
            </h1>
            <p className="text-muted-foreground mt-1">
                Your safe space to talk. How are you feeling today?
            </p>
        </header>
        <div className="flex-1 min-h-0">
            <ChatInterface />
        </div>
    </div>
  );
}
