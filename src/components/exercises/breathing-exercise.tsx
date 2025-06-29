"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const cycle = [
  { text: "Breathe In", duration: 4000 },
  { text: "Hold", duration: 7000 },
  { text: "Breathe Out", duration: 8000 },
];

export function BreathingExercise() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAnimating) {
      timer = setTimeout(() => {
        setPhase((prevPhase) => (prevPhase + 1) % cycle.length);
      }, cycle[phase].duration);
    }
    return () => clearTimeout(timer);
  }, [isAnimating, phase]);

  const handleToggle = () => {
    setIsAnimating((prev) => !prev);
    if (isAnimating) {
        setPhase(0);
    }
  };
  
  const currentPhase = cycle[phase];

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4 h-80 bg-accent/50 rounded-lg">
      <div className="relative flex items-center justify-center w-48 h-48">
        <div
          className={cn(
            "absolute bg-primary/20 rounded-full transition-all duration-[2000ms] ease-in-out",
            isAnimating && currentPhase.text === "Breathe In" && "w-48 h-48",
            isAnimating && currentPhase.text === "Hold" && "w-48 h-48",
            isAnimating && currentPhase.text === "Breathe Out" && "w-24 h-24",
            !isAnimating && "w-24 h-24"
          )}
        />
        <div
          className={cn(
            "absolute bg-primary/40 rounded-full transition-all duration-[2000ms] ease-in-out",
            isAnimating && currentPhase.text === "Breathe In" && "w-40 h-40",
            isAnimating && currentPhase.text === "Hold" && "w-40 h-40",
            isAnimating && currentPhase.text === "Breathe Out" && "w-20 h-20",
            !isAnimating && "w-20 h-20"
          )}
        />
        <div className="z-10 text-center">
            <p className="text-xl font-semibold text-primary-foreground font-headline">
            {isAnimating ? currentPhase.text : "Ready?"}
            </p>
            {isAnimating && (
                <p className="text-sm text-primary-foreground/80">
                    {currentPhase.duration / 1000} seconds
                </p>
            )}
        </div>
      </div>
      <Button onClick={handleToggle}>
        {isAnimating ? "Stop" : "Start 4-7-8 Breath"}
      </Button>
    </div>
  );
}
