import {NextRequest, NextResponse} from 'next/server';
import { detectCropDiseaseAndSuggestTreatment } from '@/ai/flows/detect-crop-disease-and-suggest-treatment';
import { detectLivestockDiseaseAndSuggestTreatment } from '@/ai/flows/detect-livestock-disease-and-suggest-treatment';

export async function POST(req: NextRequest) {
  try {
    const { mode, photoDataUri, location, soilType, userId, language, animalPhotoDataUri } = await req.json();
    if (mode === 'crop') {
      const out = await detectCropDiseaseAndSuggestTreatment({ photoDataUri, location, soilType, userId, language });
      return NextResponse.json(out);
    }
    if (mode === 'livestock') {
        const out = await detectLivestockDiseaseAndSuggestTreatment({ animalPhotoDataUri, userId, language });
      return NextResponse.json(out);
    }
    return NextResponse.json({ error: 'mode must be crop or livestock' }, { status: 400 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'internal error' }, { status: 500 });
  }
}
