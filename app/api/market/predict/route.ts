import {NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const crop = searchParams.get('crop');
  const region = searchParams.get('region');
  const season = searchParams.get('season');
  const area = searchParams.get('area');
  
  // Simple regression-style heuristic; replace with trained model as needed
  const basePrice = { wheat: 2000, rice: 2200, maize: 1800 }[String(crop).toLowerCase()] ?? 1500;
  const seasonFactor = String(season) === 'rabi' ? 1.05 : 1.0;
  const predictedPrice = basePrice * seasonFactor * (1 + (Math.random() - 0.5) * 0.06);
  const inputCostPerAcre = (predictedPrice * 0.6);
  const profitPerAcre = predictedPrice - inputCostPerAcre;
  return NextResponse.json({ predictedPrice: Math.round(predictedPrice), inputCostPerAcre: Math.round(inputCostPerAcre), profitPerAcre: Math.round(profitPerAcre) });
}
