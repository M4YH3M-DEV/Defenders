// src/ai/flows/personalized-coping-strategies.ts
'use server';

/**
 * @fileOverview Provides personalized coping strategies to the user based on past conversations.
 *
 * - personalizedCopingStrategies - A function that suggests personalized coping strategies.
 * - PersonalizedCopingStrategiesInput - The input type for the personalizedCopingStrategies function.
 * - PersonalizedCopingStrategiesOutput - The return type for the personalizedCopingStrategies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCopingStrategiesInputSchema = z.object({
  pastConversations: z
    .string()
    .describe('The history of past conversations with the user.'),
  currentMood: z.string().describe('The current mood of the user.'),
  currentSituation: z.string().describe('The current situation of the user.'),
});

export type PersonalizedCopingStrategiesInput = z.infer<
  typeof PersonalizedCopingStrategiesInputSchema
>;

const PersonalizedCopingStrategiesOutputSchema = z.object({
  suggestedStrategies: z
    .string()
    .describe(
      'A list of personalized coping strategies and techniques that have been effective for the user in the past, based on their past conversations, current mood and current situation.'
    ),
});

export type PersonalizedCopingStrategiesOutput = z.infer<
  typeof PersonalizedCopingStrategiesOutputSchema
>;

export async function personalizedCopingStrategies(
  input: PersonalizedCopingStrategiesInput
): Promise<PersonalizedCopingStrategiesOutput> {
  return personalizedCopingStrategiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCopingStrategiesPrompt',
  input: {schema: PersonalizedCopingStrategiesInputSchema},
  output: {schema: PersonalizedCopingStrategiesOutputSchema},
  prompt: `You are a mental health support chatbot. Based on the user's past
conversations, current mood, and current situation, suggest personalized
coping strategies that have been effective for them in the past.

Past Conversations: {{{pastConversations}}}
Current Mood: {{{currentMood}}}
Current Situation: {{{currentSituation}}}

Suggested Coping Strategies:`,
});

const personalizedCopingStrategiesFlow = ai.defineFlow(
  {
    name: 'personalizedCopingStrategiesFlow',
    inputSchema: PersonalizedCopingStrategiesInputSchema,
    outputSchema: PersonalizedCopingStrategiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
