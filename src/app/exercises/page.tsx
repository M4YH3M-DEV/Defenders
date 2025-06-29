import { BreathingExercise } from "@/components/exercises/breathing-exercise";
import { MeditationList } from "@/components/exercises/meditation-list";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExercisesPage() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground">
                    Calming Exercises
                </h1>
                <p className="text-muted-foreground mt-1">
                    Find a moment of peace and recenter yourself.
                </p>
            </header>

            <div className="grid gap-8 md:grid-cols-2">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Guided Breathing</CardTitle>
                        <CardDescription>Follow the visual guide to regulate your breath and calm your mind.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BreathingExercise />
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Guided Meditations</CardTitle>
                        <CardDescription>Listen to these short meditations to find your focus.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MeditationList />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
