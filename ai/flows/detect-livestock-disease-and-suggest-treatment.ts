'use server';
/**
 * @fileOverview This file defines a Genkit flow for detecting livestock diseases from images and suggesting treatment options.
 *
 * - `detectLivestockDiseaseAndSuggestTreatment`: The main function that orchestrates the livestock disease detection process.
 * - `DetectLivestockDiseaseAndSuggestTreatmentInput`: The input type for the `detectLivestockDiseaseAndSuggestTreatment` function, which includes the livestock image.
 * - `DetectLivestockDiseaseAndSuggestTreatmentOutput`: The output type for the `detectLivestockDiseaseAndSuggestTreatment` function, providing disease predictions and treatment suggestions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { callExternalVision } from '../utils/fallback';
import { logFeedback } from '../utils/feedback';

const DetectLivestockDiseaseAndSuggestTreatmentInputSchema = z.object({
  animalPhotoDataUri: z
    .string()
    .describe(
      'A photo of the livestock, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
  userId: z.string().optional(),
  language: z.string().optional(),
});

export type DetectLivestockDiseaseAndSuggestTreatmentInput = z.infer<
  typeof DetectLivestockDiseaseAndSuggestTreatmentInputSchema
>;

const DetectLivestockDiseaseAndSuggestTreatmentOutputSchema = z.object({
  breed: z.string().optional(),
  possibleDiseases: z.array(z.string()).optional(),
  careTips: z.string().optional(),
  confidence: z.number(),
  source: z.string()
});

export type DetectLivestockDiseaseAndSuggestTreatmentOutput = z.infer<
  typeof DetectLivestockDiseaseAndSuggestTreatmentOutputSchema
>;

const geminiOutputSchema = z.object({
    breed: z.string().optional(),
    possibleDiseases: z.array(z.object({name: z.string(), risk: z.string(), prevention: z.string()})).optional(),
    confidence: z.number().optional(),
    careTips: z.string().optional(),
});

export async function detectLivestockDiseaseAndSuggestTreatment(
  input: DetectLivestockDiseaseAndSuggestTreatmentInput
): Promise<DetectLivestockDiseaseAndSuggestTreatmentOutput> {
  return detectLivestockDiseaseAndSuggestTreatmentFlow(input);
}


const detectLivestockDiseaseAndSuggestTreatmentFlow = ai.defineFlow(
  {
    name: 'detectLivestockDiseaseAndSuggestTreatmentFlow',
    inputSchema: DetectLivestockDiseaseAndSuggestTreatmentInputSchema,
    outputSchema: DetectLivestockDiseaseAndSuggestTreatmentOutputSchema,
  },
  async ({ animalPhotoDataUri, userId, language }) => {
     const prompt = ai.definePrompt({
      name: 'detectLivestockDiseasePrompt',
      input: {schema: DetectLivestockDiseaseAndSuggestTreatmentInputSchema},
      output: {schema: geminiOutputSchema},
      prompt: `You are a veterinary expert. Analyze the image. Identify if cow or buffalo and breed. List likely diseases or health issues with risk levels and short prevention/care steps. Respond in JSON: {breed, possibleDiseases:[{name,risk,prevention}], confidence, careTips}. Image: {{media url=animalPhotoDataUri}}`,
    });

    const { output: geminiRes } = await prompt({ animalPhotoDataUri, userId, language });
    const conf = geminiRes?.confidence ?? 0;
    const THRESHOLD = 0.72;

    if (!geminiRes || conf < THRESHOLD) {
      const fallback = await callExternalVision(animalPhotoDataUri);
      await logFeedback({ type: "livestock", userId, imageUrl: animalPhotoDataUri, gemini: geminiRes, fallback, final: fallback });
      return { ...fallback, confidence: fallback.confidence, source: "external_api" };
    }

    await logFeedback({ type: "livestock", userId, imageUrl: animalPhotoDataUri, gemini: geminiRes, final: geminiRes });

    return {
      breed: geminiRes.breed,
      possibleDiseases: geminiRes.possibleDiseases?.map(d => d.name) || [],
      careTips: geminiRes.careTips || "Follow local veterinary guidance.",
      confidence: conf,
      source: "gemini"
    };
  }
);
