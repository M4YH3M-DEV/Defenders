import { Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const meditations = [
  { title: "Mindful Awareness", duration: "5 min" },
  { title: "Body Scan", duration: "10 min" },
  { title: "Loving-Kindness", duration: "7 min" },
  { title: "Stress Relief", duration: "8 min" },
];

export function MeditationList() {
  return (
    <div className="space-y-4">
      {meditations.map((meditation, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-accent/50 rounded-lg"
        >
          <div className="flex items-center gap-4">
            <Headphones className="h-5 w-5 text-primary" />
            <div>
              <p className="font-semibold text-foreground">{meditation.title}</p>
              <p className="text-sm text-muted-foreground">{meditation.duration}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">Play</Button>
        </div>
      ))}
    </div>
  );
}
