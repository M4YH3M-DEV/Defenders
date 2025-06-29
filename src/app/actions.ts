'use server';

import { emergencySupportSuggestions } from '@/ai/flows/emergency-support-suggestions';
import { personalizedCopingStrategies } from '@/ai/flows/personalized-coping-strategies';

export interface ChatResponse {
    type: 'response' | 'emergency';
    message?: string;
    suggestions?: string[];
}

export async function getChatbotResponse(userInput: string, conversationHistory: string): Promise<ChatResponse> {
  try {
    const emergencyCheck = await emergencySupportSuggestions({ userInput });

    if (emergencyCheck.isDistressed) {
      return {
        type: 'emergency',
        suggestions: emergencyCheck.suggestions,
      };
    }

    // In a real app, mood would be tracked and passed. Here we use a neutral default.
    const response = await personalizedCopingStrategies({
      pastConversations: conversationHistory,
      currentMood: 'neutral',
      currentSituation: userInput,
    });

    return {
      type: 'response',
      message: response.suggestedStrategies,
    };
  } catch (error) {
    console.error("Error in getChatbotResponse:", error);
    return {
      type: 'response',
      message: "I'm having a little trouble connecting right now. Please try again in a moment.",
    }
  }
}
