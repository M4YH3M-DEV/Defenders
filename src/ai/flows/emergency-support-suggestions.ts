// src/ai/flows/emergency-support-suggestions.ts
'use server';

/**
 * @fileOverview Emergency support suggestion flow.
 *
 * This file defines a Genkit flow that analyzes user input for signs of distress and provides emergency contact suggestions.
 *
 * @file EmergencySupportSuggestions
 * Exports:
 * - `emergencySupportSuggestions`: A function that takes user input and returns emergency contact suggestions if distress is detected.
 * - `EmergencySupportSuggestionsInput`: The input type for the emergencySupportSuggestions function.
 * - `EmergencySupportSuggestionsOutput`: The return type for the emergencySupportSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EmergencySupportSuggestionsInputSchema = z.object({
  userInput: z.string().describe('The user input to analyze for signs of distress.'),
});
export type EmergencySupportSuggestionsInput = z.infer<
  typeof EmergencySupportSuggestionsInputSchema
>;

const EmergencySupportSuggestionsOutputSchema = z.object({
  isDistressed: z
    .boolean()
    .describe(
      'Whether the user input indicates the user is in distress or requires immediate support.'
    ),
  suggestions: z
    .array(z.string())
    .describe(
      'A list of suggestions for emergency contacts and resources, tailored to the user input, if the user is distressed.'
    ),
});
export type EmergencySupportSuggestionsOutput = z.infer<
  typeof EmergencySupportSuggestionsOutputSchema
>;

export async function emergencySupportSuggestions(
  input: EmergencySupportSuggestionsInput
): Promise<EmergencySupportSuggestionsOutput> {
  return emergencySupportSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'emergencySupportSuggestionsPrompt',
  input: {schema: EmergencySupportSuggestionsInputSchema},
  output: {schema: EmergencySupportSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to analyze user messages for signs of distress and provide emergency contact suggestions.

  Analyze the following user input:
  {{userInput}}

  Determine if the user is in distress based on keywords, phrases, and overall sentiment. Consider indicators such as expressions of hopelessness, self-harm, or suicidal thoughts.

  If the user is in distress, provide a list of suggestions for emergency contacts and resources. These suggestions should include emergency hotline numbers, mental health crisis lines, and links to relevant support websites. Do not include resources that are not related to mental health.
  If the user is not in distress, the suggestions should be an empty list.

  Set the isDistressed output field to true if distress is detected, and false otherwise.
  The suggestions field should have a resource even if isDistressed is false, and the message is innocuous.
  Always populate suggestions with appropriate resources.

  Example Output 1:
  {
    "isDistressed": true,
    "suggestions": [
      "Emergency Hotline: 911",
      "Suicide Prevention Lifeline: 988",
      "Crisis Text Line: Text HOME to 741741",
      "The Trevor Project: 1-866-488-7386",
      "https://www.crisistextline.org",
    ],
  }

  Example Output 2:
  {
    "isDistressed": false,
    "suggestions": [
      "Emergency Hotline: 911",
      "Suicide Prevention Lifeline: 988",
      "Crisis Text Line: Text HOME to 741741",
      "The Trevor Project: 1-866-488-7386",
      "https://www.crisistextline.org",
    ],
  }
  `,
});

const emergencySupportSuggestionsFlow = ai.defineFlow(
  {
    name: 'emergencySupportSuggestionsFlow',
    inputSchema: EmergencySupportSuggestionsInputSchema,
    outputSchema: EmergencySupportSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
