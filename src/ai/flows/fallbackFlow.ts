'use server';
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { callExternalAPI } from '../utils/fallback';

const FallbackInputSchema = z.object({
  imageUrl: z.string(),
});

const FallbackOutputSchema = z.object({
  description: z.string(),
  confidence: z.number(),
  source: z.string(),
});

export const fallbackFlow = ai.defineFlow({
  name: 'fallbackFlow',
  inputSchema: FallbackInputSchema,
  outputSchema: FallbackOutputSchema,
  async handler({ imageUrl }) {
    return callExternalAPI(imageUrl);
  },
});
