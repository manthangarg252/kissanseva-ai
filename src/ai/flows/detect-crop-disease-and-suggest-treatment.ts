'use server';
/**
 * @fileOverview Detects crop diseases from an image and suggests treatment options.
 *
 * - detectCropDiseaseAndSuggestTreatment - A function that handles the crop disease detection and treatment suggestion process.
 * - DetectCropDiseaseAndSuggestTreatmentInput - The input type for the detectCropDiseaseAndSuggestTreatment function.
 * - DetectCropDiseaseAndSuggestTreatmentOutput - The return type for the detectCropDiseaseAndSuggestTreatment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { callExternalVision } from '../utils/fallback';
import { logFeedback } from '../utils/feedback';


const DetectCropDiseaseAndSuggestTreatmentInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a crop, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
    location: z.string(),
    soilType: z.string(),
    userId: z.string().optional(),
    language: z.string().optional(),
});
export type DetectCropDiseaseAndSuggestTreatmentInput = z.infer<typeof DetectCropDiseaseAndSuggestTreatmentInputSchema>;

const DetectCropDiseaseAndSuggestTreatmentOutputSchema = z.object({
  cropName: z.string().optional(),
  disease: z.string().optional(),
  confidence: z.number(),
  recommendation: z.string(),
  source: z.string(),
});
export type DetectCropDiseaseAndSuggestTreatmentOutput = z.infer<typeof DetectCropDiseaseAndSuggestTreatmentOutputSchema>;

export async function detectCropDiseaseAndSuggestTreatment(input: DetectCropDiseaseAndSuggestTreatmentInput): Promise<DetectCropDiseaseAndSuggestTreatmentOutput> {
  return detectCropDiseaseAndSuggestTreatmentFlow(input);
}

const geminiOutputSchema = z.object({
    cropName: z.string().optional(),
    disease: z.string().optional(),
    confidence: z.number().optional(),
    recommendation: z.string().optional(),
});


const detectCropDiseaseAndSuggestTreatmentFlow = ai.defineFlow(
  {
    name: 'detectCropDiseaseAndSuggestTreatmentFlow',
    inputSchema: DetectCropDiseaseAndSuggestTreatmentInputSchema,
    outputSchema: DetectCropDiseaseAndSuggestTreatmentOutputSchema,
  },
  async ({ photoDataUri, location, soilType, userId, language }) => {
    const prompt = ai.definePrompt({
        name: 'detectCropDiseasePrompt',
        input: { schema: DetectCropDiseaseAndSuggestTreatmentInputSchema },
        output: { schema: geminiOutputSchema },
        prompt: `You are an expert agronomist. Analyze the crop image. Location: ${location}. Soil: ${soilType}. Return JSON with keys: cropName, disease (or 'healthy'), confidence (0-1), recommendation (short steps). Image: {{media url=photoDataUri}}`,
    });

    const { output: geminiRes } = await prompt({ photoDataUri, location, soilType, userId, language });
    
    const conf = (geminiRes?.confidence ?? 0);

    const THRESHOLD = 0.70;
    if (!geminiRes || conf < THRESHOLD) {
      const fallback = await callExternalVision(photoDataUri);
      await logFeedback({ type: "crop", userId, imageUrl: photoDataUri, gemini: geminiRes, fallback, final: fallback });
      return { ...fallback, confidence: fallback.confidence ?? conf, source: "external_api" };
    }

    await logFeedback({ type: "crop", userId, imageUrl: photoDataUri, gemini: geminiRes, final: geminiRes });

    return {
      cropName: geminiRes.cropName,
      disease: geminiRes.disease || "healthy",
      confidence: conf,
      recommendation: geminiRes.recommendation || "Follow local guidance.",
      source: "gemini"
    };
  }
);
