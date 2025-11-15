'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing personalized crop recommendations to farmers based on disease detection, soil analysis, and carbon data.
 *
 * - getPersonalizedCropRecommendations - A function that orchestrates the process of gathering data and generating personalized recommendations.
 * - PersonalizedCropRecommendationsInput - The input type for the getPersonalizedCropRecommendations function.
 * - PersonalizedCropRecommendationsOutput - The return type for the getPersonalizedCropRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCropRecommendationsInputSchema = z.object({
  diseaseDetectionResults: z.string().describe('Results from crop disease detection analysis.'),
  soilAnalysisResults: z.string().describe('Results from soil analysis.'),
  carbonDataResults: z.string().describe('Results from carbon data analysis.'),
  farmProfile: z.string().describe('Farmer farm profile including crop, soil type, area, irrigation type, and location'),
  languagePreference: z.string().describe('The language preference of the user (e.g., en, hi, mr).'),
});
export type PersonalizedCropRecommendationsInput = z.infer<typeof PersonalizedCropRecommendationsInputSchema>;

const PersonalizedCropRecommendationsOutputSchema = z.object({
  cropRotationAdvice: z.string().describe('Personalized advice for crop rotation.'),
  fertilizerOptimization: z.string().describe('Personalized recommendations for fertilizer optimization.'),
  irrigationSchedules: z.string().describe('Personalized irrigation schedules.'),
  livestockDietPlans: z.string().describe('Personalized livestock diet plans, if applicable.'),
  recommendations: z.string().describe('Overall recommendations for the user'),
});
export type PersonalizedCropRecommendationsOutput = z.infer<typeof PersonalizedCropRecommendationsOutputSchema>;

export async function getPersonalizedCropRecommendations(input: PersonalizedCropRecommendationsInput): Promise<PersonalizedCropRecommendationsOutput> {
  return getPersonalizedCropRecommendationsFlow(input);
}

const personalizedCropRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedCropRecommendationsPrompt',
  input: {schema: PersonalizedCropRecommendationsInputSchema},
  output: {schema: PersonalizedCropRecommendationsOutputSchema},
  prompt: `You are an expert agricultural advisor providing personalized recommendations to farmers.

  Based on the following data, provide actionable recommendations for crop rotation, fertilizer optimization, irrigation schedules, and livestock diet plans.

  Disease Detection Results: {{{diseaseDetectionResults}}}
  Soil Analysis Results: {{{soilAnalysisResults}}}
  Carbon Data Results: {{{carbonDataResults}}}
  Farm Profile: {{{farmProfile}}}

  Provide the recommendations in the farmer's preferred language: {{{languagePreference}}}.

  Ensure the recommendations are practical and consider the farmer's specific circumstances to improve their farm's efficiency and sustainability.

  Output the response according to the defined output schema.`, 
});

const getPersonalizedCropRecommendationsFlow = ai.defineFlow(
  {
    name: 'getPersonalizedCropRecommendationsFlow',
    inputSchema: PersonalizedCropRecommendationsInputSchema,
    outputSchema: PersonalizedCropRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedCropRecommendationsPrompt(input);
    return output!;
  }
);
