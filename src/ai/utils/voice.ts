// client-side helper for Web Speech API (React usage)
export function speak(text: string, lang = 'en-IN') {
  if (typeof window === 'undefined') return;
  const synth = window.speechSynthesis;
  if (!synth) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  synth.cancel();
  synth.speak(utter);
}

export function listen(onResult: (t: string) => void, lang = 'en-IN') {
  if (typeof window === 'undefined') return () => {};
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) return () => {};
  const rec = new SpeechRecognition();
  rec.lang = lang;
  rec.interimResults = false;
  rec.onresult = (e: any) => onResult(e.results[0][0].transcript);
  rec.onerror = (e: any) => console.warn('speech error', e);
  rec.start();
  return () => rec.stop();
}
