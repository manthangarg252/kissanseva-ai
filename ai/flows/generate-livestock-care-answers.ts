'use server';
/**
 * @fileOverview A livestock care question answering AI agent.
 *
 * - generateLivestockCareAnswers - A function that answers questions about livestock care.
 * - GenerateLivestockCareAnswersInput - The input type for the generateLivestockCareAnswers function.
 * - GenerateLivestockCareAnswersOutput - The return type for the generateLivestockCareAnswers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLivestockCareAnswersInputSchema = z.object({
  question: z.string().describe('The question about livestock care.'),
});
export type GenerateLivestockCareAnswersInput = z.infer<typeof GenerateLivestockCareAnswersInputSchema>;

const GenerateLivestockCareAnswersOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about livestock care.'),
});
export type GenerateLivestockCareAnswersOutput = z.infer<typeof GenerateLivestockCareAnswersOutputSchema>;

export async function generateLivestockCareAnswers(input: GenerateLivestockCareAnswersInput): Promise<GenerateLivestockCareAnswersOutput> {
  return generateLivestockCareAnswersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLivestockCareAnswersPrompt',
  input: {schema: GenerateLivestockCareAnswersInputSchema},
  output: {schema: GenerateLivestockCareAnswersOutputSchema},
  prompt: `You are an expert in livestock care. Answer the following question about livestock care:\n\nQuestion: {{{question}}}`,
});

const generateLivestockCareAnswersFlow = ai.defineFlow(
  {
    name: 'generateLivestockCareAnswersFlow',
    inputSchema: GenerateLivestockCareAnswersInputSchema,
    outputSchema: GenerateLivestockCareAnswersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
