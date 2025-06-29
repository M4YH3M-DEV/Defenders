import { JournalClient } from "@/components/journal/journal-client";

export default function JournalPage() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground">
                    Mood Journal
                </h1>
                <p className="text-muted-foreground mt-1">
                    Take a moment to reflect on your feelings.
                </p>
            </header>
            <JournalClient />
        </div>
    );
}
