"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type Mood = "😊" | "😐" | "😔" | "😠" | "😥";

interface JournalEntry {
  id: string;
  date: string;
  mood: Mood;
  text: string;
}

const moods: Mood[] = ["😊", "😐", "😔", "😠", "😥"];

export function JournalClient() {
  const [selectedMood, setSelectedMood] = useState<Mood>("😊");
  const [journalText, setJournalText] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedEntries = localStorage.getItem("journalEntries");
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
    } catch (error) {
      console.error("Failed to load journal entries from localStorage", error);
    }
  }, []);

  const handleSave = () => {
    if (!journalText.trim()) {
      toast({
        title: "Empty Entry",
        description: "Please write something before saving.",
        variant: "destructive",
      });
      return;
    }

    const newEntry: JournalEntry = {
      id: new Date().toISOString(),
      date: new Date().toISOString(),
      mood: selectedMood,
      text: journalText,
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    try {
        localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    } catch (error) {
        console.error("Failed to save journal entries to localStorage", error);
    }
    setJournalText("");
    setSelectedMood("😊");
    toast({
        title: "Entry Saved",
        description: "Your journal entry has been saved successfully.",
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>Select a mood and write down your thoughts.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around mb-6">
            {moods.map((mood) => (
              <Button
                key={mood}
                variant={selectedMood === mood ? "default" : "ghost"}
                size="icon"
                onClick={() => setSelectedMood(mood)}
                className="text-3xl rounded-full h-14 w-14 transition-transform transform hover:scale-110"
              >
                {mood}
              </Button>
            ))}
          </div>
          <Textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="What's on your mind?..."
            rows={8}
            className="rounded-lg"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} className="w-full">Save Entry</Button>
        </CardFooter>
      </Card>

      <div className="space-y-6 max-h-[calc(100vh-16rem)] overflow-y-auto pr-2">
        <h2 className="text-2xl font-bold font-headline">Past Entries</h2>
        {entries.length > 0 ? (
          entries.map((entry) => (
            <Card key={entry.id} className="shadow-md transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-4">
                  <span className="text-3xl">{entry.mood}</span>
                  <span>{format(new Date(entry.date), "MMMM d, yyyy 'at' h:mm a")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{entry.text}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground text-center pt-8">No entries yet. Start by writing one!</p>
        )}
      </div>
    </div>
  );
}
