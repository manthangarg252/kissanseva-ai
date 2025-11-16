
// "use client";

// import { useState, useRef, useEffect } from "react";
// import { PageHeader } from "@/components/page-header";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Bot, AlertCircle, Send, User, UploadCloud, Tractor, FileUp } from "lucide-react";
// import Image from "next/image";
// import { Progress } from "@/components/ui/progress";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { detectLivestockDiseaseAndSuggestTreatment, type DetectLivestockDiseaseAndSuggestTreatmentOutput } from "@/ai/flows/detect-livestock-disease-and-suggest-treatment";
// import { generateLivestockCareAnswers } from "@/ai/flows/generate-livestock-care-answers";
// import { placeholderImages } from "@/lib/placeholder-images";
// import { Badge } from "@/components/ui/badge";

// const DiseaseDetection = () => {
//     const [file, setFile] = useState<File | null>(null);
//     const [preview, setPreview] = useState<string | null>(null);
//     const [result, setResult] = useState<DetectLivestockDiseaseAndSuggestTreatmentOutput | null>(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const livestockPlaceholder = placeholderImages.find(p => p.id === 'livestock-placeholder');
//     const inputRef = useRef<HTMLInputElement>(null);

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const selectedFile = e.target.files?.[0];
//         if (selectedFile) {
//             setFile(selectedFile);
//             const reader = new FileReader();
//             reader.onloadend = () => setPreview(reader.result as string);
//             reader.readAsDataURL(selectedFile);
//             setError(null);
//             setResult(null);
//         }
//     };
    
//     const handleUploadClick = () => {
//         inputRef.current?.click();
//     };

//     const handleSubmit = async () => {
//         if (!file || !preview) {
//             setError("Please upload an image.");
//             return;
//         }
//         setIsLoading(true);
//         setError(null);
//         setResult(null);
//         try {
//             const resultData = await detectLivestockDiseaseAndSuggestTreatment({ animalPhotoDataUri: preview });
//             setResult(resultData);
//         } catch (e) {
//             setError("An error occurred during diagnosis. Please try again.");
//             console.error(e);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-4 sm:p-6 lg:p-8">
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Livestock Diagnosis</CardTitle>
//                     <CardDescription>Provide an image of your animal for an AI diagnosis.</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                      <div 
//                         className="relative w-full aspect-video rounded-lg overflow-hidden border-dashed border-2 bg-muted flex items-center justify-center text-center cursor-pointer hover:bg-muted/80 transition-colors"
//                         onClick={handleUploadClick}
//                     >
//                         <Input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
//                          {preview ? <Image src={preview} alt="Livestock preview" fill style={{ objectFit: "contain" }} /> : (
//                              <div className="flex flex-col items-center gap-2 text-muted-foreground">
//                                 <FileUp className="w-8 h-8" />
//                                 <p className="font-semibold">Click to upload an image</p>
//                                 <p className="text-xs">PNG, JPG, up to 5MB</p>
//                              </div>
//                          )}
//                     </div>
//                     <Button onClick={handleSubmit} disabled={isLoading || !file} className="w-full">
//                         {isLoading ? "Diagnosing..." : "Diagnose Animal"}
//                     </Button>
//                      {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
//                 </CardContent>
//             </Card>
//             <Card className="sticky top-24">
//                 <CardHeader>
//                     <CardTitle>Diagnosis Result</CardTitle>
//                     <CardDescription>AI-powered diagnosis for your livestock.</CardDescription>
//                 </CardHeader>
//                 <CardContent className="min-h-[300px] flex items-center justify-center">
//                     {isLoading && <div className="text-center"><UploadCloud className="mx-auto h-12 w-12 animate-bounce text-muted-foreground" /><p className="mt-4">Diagnosing... please wait.</p></div>}
//                     {!isLoading && !result && <div className="text-center text-muted-foreground"><Tractor className="mx-auto h-12 w-12" /><p className="mt-4">Results will appear here.</p></div>}
//                     {result && (
//                         <div className="w-full space-y-4">
//                             <p><strong>Breed Prediction:</strong> <Badge>{result.breed}</Badge></p>
//                             <div>
//                                 <p className="font-semibold mb-2">Potential Diseases:</p>
//                                 <div className="flex flex-wrap gap-2">
//                                     {result.possibleDiseases?.map(d => (
//                                         <Badge key={d} variant="destructive">{d}</Badge>
//                                     ))}
//                                 </div>
//                                 {(!result.possibleDiseases || result.possibleDiseases.length === 0) && <p className="text-sm text-muted-foreground">No specific diseases detected with high confidence.</p>}
//                             </div>
//                             <div>
//                                 <p className="font-semibold">Care Tips:</p>
//                                 <p className="text-sm text-muted-foreground">{result.careTips}</p>
//                             </div>
//                         </div>
//                     )}
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// const AiAssistant = () => {
//     const [input, setInput] = useState("");
//     const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const scrollAreaRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
//     }, [messages]);
    
//     const handleSendMessage = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!input.trim() || isLoading) return;
//         const userMessage = { role: 'user' as const, content: input };
//         setMessages(prev => [...prev, userMessage]);
//         setInput("");
//         setIsLoading(true);

//         try {
//             const { answer } = await generateLivestockCareAnswers({ question: input });
//             setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
//         } catch (error) {
//             setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't get an answer. Please try again." }]);
//             console.error(error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <Card className="h-[70vh] flex flex-col max-w-4xl mx-auto w-full">
//             <CardHeader>
//                 <CardTitle>AI Livestock Assistant</CardTitle>
//                 <CardDescription>Ask any question about livestock care, feeding, or health.</CardDescription>
//             </CardHeader>
//             <CardContent className="flex-1 overflow-hidden">
//                 <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
//                     <div className="space-y-4">
//                         {messages.length === 0 && <div className="text-center text-muted-foreground pt-16"><Bot size={48} className="mx-auto" /><p>Ask me anything!</p></div>}
//                         {messages.map((msg, index) => (
//                             <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
//                                 {msg.role === 'assistant' && <div className="bg-primary text-primary-foreground rounded-full p-2 w-10 h-10 flex items-center justify-center"><Bot size={20} /></div>}
//                                 <div className={`max-w-sm p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
//                                     {msg.content}
//                                 </div>
//                                 {msg.role === 'user' && <div className="bg-muted rounded-full p-2 w-10 h-10 flex items-center justify-center"><User size={20} /></div>}
//                             </div>
//                         ))}
//                          {isLoading && <div className="flex gap-3"><div className="bg-primary text-primary-foreground rounded-full p-2 w-10 h-10 flex items-center justify-center"><Bot size={20} /></div><div className="max-w-sm p-3 rounded-lg bg-muted">Thinking...</div></div>}
//                     </div>
//                 </ScrollArea>
//             </CardContent>
//             <CardFooter>
//                 <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
//                     <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Type your question..." disabled={isLoading} />
//                     <Button type="submit" disabled={isLoading || !input.trim()}><Send className="h-4 w-4" /></Button>
//                 </form>
//             </CardFooter>
//         </Card>
//     );
// };

// export default function LivestockCarePage() {
//     return (
//         <div className="p-4 sm:p-6 lg:p-8">
//             <PageHeader title="Livestock Care" description="Advanced tools to monitor and care for your livestock." />
//             <Tabs defaultValue="detection" className="w-full">
//                 <TabsList className="grid w-full grid-cols-2">
//                     <TabsTrigger value="detection">Disease Detection</TabsTrigger>
//                     <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="detection" className="mt-6">
//                     <DiseaseDetection />
//                 </TabsContent>
//                 <TabsContent value="assistant" className="mt-6">
//                     <AiAssistant />
//                 </TabsContent>
//             </Tabs>
//         </div>
//     );
// }\
"use client";

import { useState, useRef } from "react";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, FileUp, Tractor, UploadCloud } from "lucide-react";
import Image from "next/image";
import { detectLivestockDiseaseAndSuggestTreatment, type DetectLivestockDiseaseAndSuggestTreatmentOutput } from "@/ai/flows/detect-livestock-disease-and-suggest-treatment";
import { Badge } from "@/components/ui/badge";

const DiseaseDetection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<DetectLivestockDiseaseAndSuggestTreatmentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
      setError(null);
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!file || !preview) {
      setError("Please upload an image.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const resultData = await detectLivestockDiseaseAndSuggestTreatment({ animalPhotoDataUri: preview });
      setResult(resultData);
    } catch (e) {
      setError("An error occurred during diagnosis.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-4 sm:p-6 lg:p-8">

      {/* Upload Card */}
      <Card>
        <CardHeader>
          <CardTitle>Livestock Diagnosis</CardTitle>
          <CardDescription>Upload an image for AI diagnosis</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div
            className="relative w-full aspect-video rounded-lg overflow-hidden border-dashed border-2 bg-muted flex items-center justify-center text-center cursor-pointer hover:bg-muted/80"
            onClick={() => inputRef.current?.click()}
          >
            <Input type="file" ref={inputRef} accept="image/*" onChange={handleFileChange} className="hidden" />

            {preview ? (
              <Image src={preview} alt="Preview" fill className="object-contain" />
            ) : (
              <div className="text-muted-foreground flex flex-col items-center gap-2">
                <FileUp className="w-8 h-8" />
                <p className="font-semibold">Click to upload image</p>
                <p className="text-xs">PNG, JPG, up to 5MB</p>
              </div>
            )}
          </div>

          <Button onClick={handleSubmit} disabled={isLoading || !file} className="w-full">
            {isLoading ? "Diagnosing..." : "Diagnose"}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Result Card */}
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle>Diagnosis Result</CardTitle>
        </CardHeader>

        <CardContent className="min-h-[300px]">
          {isLoading && <p>Diagnosing...</p>}

          {!isLoading && !result && (
            <div className="text-center text-muted-foreground">
              <Tractor className="mx-auto h-12 w-12" />
              <p className="mt-4">Results will appear here.</p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <p><strong>Breed:</strong> <Badge>{result.breed}</Badge></p>

              <div>
                <p className="font-semibold mb-2">Possible Diseases:</p>
                <div className="flex flex-wrap gap-2">
                  {result.possibleDiseases?.length ? (
                    result.possibleDiseases.map((d) => <Badge key={d} variant="destructive">{d}</Badge>)
                  ) : (
                    <p className="text-sm text-muted-foreground">No diseases detected.</p>
                  )}
                </div>
              </div>

              <div>
                <p className="font-semibold">Care Tips:</p>
                <p className="text-sm text-muted-foreground">{result.careTips}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default function LivestockCarePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader title="Livestock Care" description="Advanced livestock diagnosis tools" />

      <Tabs defaultValue="detection">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="detection">Disease Detection</TabsTrigger>
        </TabsList>

        <TabsContent value="detection" className="mt-6">
          <DiseaseDetection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
