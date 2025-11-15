'use server';
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { callGemini } from '../utils/gemini';
import { callExternalAPI } from '../utils/fallback';

const LivestockDetectionInputSchema = z.object({
  imageUrl: z.string(),
});

const LivestockDetectionOutputSchema = z.object({
  breed: z.string().optional(),
  possibleDiseases: z.array(z.string()).optional(),
  careTips: z.string().optional(),
  source: z.string(),
  description: z.string().optional(),
  confidence: z.number().optional(),
});

export const livestockDetectionFlow = ai.defineFlow({
  name: 'livestockDetectionFlow',
  inputSchema: LivestockDetectionInputSchema,
  outputSchema: LivestockDetectionOutputSchema,
  async handler({ imageUrl }) {
    const result = await callGemini({
      prompt: `Identify animal breed and detect potential diseases. Image: ${imageUrl}. Return breed, disease risks, care tips.`,
    });

    if (!result.breed || (result.confidence ?? 0) < 0.7) {
      return callExternalAPI(imageUrl);
    }

    return {
      breed: result.breed,
      possibleDiseases: result.possibleDiseases,
      careTips: result.careTips,
      source: 'gemini',
    };
  },
});
