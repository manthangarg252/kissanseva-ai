export async function callExternalVision(imageUrl: string) {
  const apiKey = process.env.EXTERNAL_AI_API_KEY;
  if (!apiKey) throw new Error("EXTERNAL_AI_API_KEY not set");

  const body = { image: imageUrl };
  const res = await fetch(process.env.EXTERNAL_VISION_ENDPOINT || "https://api.openai.com/v1/images/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(body)
  });
  const json = await res.json();

  // normalize to expected shape
  return {
    cropName: json.cropName ?? json.label ?? json.description ?? null,
    disease: json.disease ?? null,
    confidence: json.confidence ?? json.probability ?? 0.45,
    recommendation: json.recommendation ?? json.advice ?? (json.description || "No confident prediction."),
    possibleDiseases: json.possibleDiseases ?? [],
    careTips: json.careTips ?? null
  };
}
