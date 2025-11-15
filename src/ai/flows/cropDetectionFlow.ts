'use server';
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { callGemini } from "../utils/gemini";
import { callExternalAPI } from "../utils/fallback";

const CropDetectionInputSchema = z.object({
  imageUrl: z.string(),
  location: z.string(),
  soilType: z.string(),
});

const CropDetectionOutputSchema = z.object({
  cropName: z.string().optional(),
  disease: z.string().optional(),
  confidence: z.number().optional(),
  recommendation: z.string().optional(),
  source: z.string(),
  description: z.string().optional(),
});

export const cropDetectionFlow = ai.defineFlow(
  {
    name: 'cropDetectionFlow',
    inputSchema: CropDetectionInputSchema,
    outputSchema: CropDetectionOutputSchema,
  },
  async ({ imageUrl, location, soilType }) => {
    const result = await callGemini({
      prompt: `Analyze crop image at ${imageUrl}. Location: ${location}, Soil: ${soilType}. Predict crop type, disease (if any), and provide treatment + farming advice.`,
    });

    const confidence = result.confidence ?? 0.6;
    if (confidence < 0.65) {
      return callExternalAPI(imageUrl);
    }

    return {
      cropName: result.cropName,
      disease: result.disease,
      confidence,
      recommendation: result.recommendation,
      source: "gemini",
    };
  }
);
