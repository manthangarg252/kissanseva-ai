'use server';
// thin wrapper to call your Genkit/Gemini flows or API
export async function callGemini({ prompt, language = "en" }: { prompt: string; language?: string }) {
  // Genkit may provide a client; this shows a generic fetch to your Genkit endpoint.
  const key = process.env.GENKIT_API_KEY;
  if (!key) throw new Error("GENKIT_API_KEY not set in environment");

  const res = await fetch(process.env.NEXT_PUBLIC_GENKIT_ENDPOINT || "/api/genkit/run", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ prompt, language })
  });
  if (!res.ok) return null;
  const data = await res.json();

  // Expect Genkit response with structured JSON in `data.output`.
  return data.output ?? data;
}
