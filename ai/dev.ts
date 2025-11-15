import { config } from 'dotenv';
config();

import '@/ai/flows/get-personalized-crop-recommendations.ts';
import '@/ai/flows/recommend-applicable-schemes.ts';
import '@/ai/flows/detect-livestock-disease-and-suggest-treatment.ts';
import '@/ai/flows/detect-crop-disease-and-suggest-treatment.ts';
import '@/ai/flows/generate-livestock-care-answers.ts';