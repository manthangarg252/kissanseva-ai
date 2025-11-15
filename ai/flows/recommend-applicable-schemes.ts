'use server';

/**
 * @fileOverview Recommends applicable government schemes based on a farmer's profile and crops.
 *
 * - recommendApplicableSchemes - A function that recommends applicable government schemes.
 * - RecommendApplicableSchemesInput - The input type for the recommendApplicableSchemes function.
 * - RecommendApplicableSchemesOutput - The return type for the recommendApplicableSchemes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendApplicableSchemesInputSchema = z.object({
  farmProfile: z
    .object({
      cropSown: z.string().describe('The crop sown on the farm.'),
      soilType: z.string().describe('The type of soil on the farm.'),
      area: z.number().describe('The area of the farm in acres.'),
      irrigationType: z.string().describe('The type of irrigation used on the farm.'),
      location: z
        .object({
          lat: z.number().describe('The latitude of the farm location.'),
          lng: z.number().describe('The longitude of the farm location.'),
        })
        .describe('The location of the farm.'),
    })
    .describe('The farmer’s farm profile.'),
  availableSchemes: z
    .array(
      z.object({
        name: z.string().describe('The name of the government scheme.'),
        type: z.string().describe('The type of scheme (e.g., Irrigation, Fertilizer).'),
        description: z.string().describe('A description of the government scheme.'),
        link: z.string().url().describe('A link to the government scheme details.'),
        eligibility: z.array(z.string()).describe('The eligibility criteria for the scheme.'),
      })
    )
    .describe('A list of available government schemes.'),
});

export type RecommendApplicableSchemesInput = z.infer<
  typeof RecommendApplicableSchemesInputSchema
>;

const RecommendApplicableSchemesOutputSchema = z.array(
  z.object({
    name: z.string().describe('The name of the recommended government scheme.'),
    type: z.string().describe('The type of scheme.'),
    description: z.string().describe('A description of the scheme.'),
    link: z.string().url().describe('A link to the scheme details.'),
    eligibility: z.array(z.string()).describe('The eligibility criteria for the scheme.'),
    reason: z.string().describe('The reason why this scheme is recommended.'),
  })
);

export type RecommendApplicableSchemesOutput = z.infer<
  typeof RecommendApplicableSchemesOutputSchema
>;

export async function recommendApplicableSchemes(
  input: RecommendApplicableSchemesInput
): Promise<RecommendApplicableSchemesOutput> {
  return recommendApplicableSchemesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendApplicableSchemesPrompt',
  input: {schema: RecommendApplicableSchemesInputSchema},
  output: {schema: RecommendApplicableSchemesOutputSchema},
  prompt: `You are an AI assistant helping farmers identify relevant government schemes.

  Given a farmer's farm profile and a list of available government schemes, determine which schemes are most applicable to the farmer and provide a reason for each recommendation.

  Farm Profile:
  Crop Sown: {{{farmProfile.cropSown}}}
  Soil Type: {{{farmProfile.soilType}}}
  Area: {{{farmProfile.area}}} acres
  Irrigation Type: {{{farmProfile.irrigationType}}}
  Location: Latitude {{{farmProfile.location.lat}}}, Longitude {{{farmProfile.location.lng}}}

  Available Schemes:
  {{#each availableSchemes}}
  - Name: {{{name}}}
    Type: {{{type}}}
    Description: {{{description}}}
    Link: {{{link}}}
    Eligibility: {{#each eligibility}}{{{this}}}, {{/each}}
  {{/each}}

  \n  Recommend the most applicable schemes from the list of available schemes, and explain why each scheme is recommended for this particular farmer.  Return the results in the specified JSON format.
  Make sure to include ALL fields from the input in the output.
  `,
});

const recommendApplicableSchemesFlow = ai.defineFlow(
  {
    name: 'recommendApplicableSchemesFlow',
    inputSchema: RecommendApplicableSchemesInputSchema,
    outputSchema: RecommendApplicableSchemesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
