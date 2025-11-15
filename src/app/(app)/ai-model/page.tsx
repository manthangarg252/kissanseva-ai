
"use client";

import { useState, useRef } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { detectCropDiseaseAndSuggestTreatment } from "@/ai/flows/detect-crop-disease-and-suggest-treatment";
import type { DetectCropDiseaseAndSuggestTreatmentOutput } from "@/ai/flows/detect-crop-disease-and-suggest-treatment";
import Image from "next/image";
import { Leaf, AlertCircle, UploadCloud, FileUp } from "lucide-react";
import { placeholderImages } from "@/lib/placeholder-images";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CropDiseasePage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<DetectCropDiseaseAndSuggestTreatmentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState("Punjab, India");
  const [soilType, setSoilType] = useState("Loamy");
  const cropPlaceholder = placeholderImages.find(p => p.id === 'crop-placeholder');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        setError("Please upload a valid image file.");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        setError("File size should not exceed 5MB.");
        return;
      }

      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setError(null);
      setResult(null);
    }
  };
  
  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!file || !preview) {
      setError("Please select a file to upload.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const resultData = await detectCropDiseaseAndSuggestTreatment({ photoDataUri: preview, location, soilType });
      setResult(resultData);
    } catch (e) {
      setError("An error occurred while analyzing the image. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card className="sm:col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle>Crop Diagnosis</CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      Upload an image of your crop to identify diseases and get expert recommendations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={handleSubmit} disabled={isLoading || !file} className="w-full sm:w-auto">
                      {isLoading ? "Analyzing..." : "Detect Disease"}
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Location</CardTitle>
                        <CardDescription>Your farm's region.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Input value={location} onChange={(e) => setLocation(e.target.value)} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Soil Type</CardTitle>
                        <CardDescription>Dominant soil in your field.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Select onValueChange={setSoilType} value={soilType}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Loamy">Loamy</SelectItem>
                                <SelectItem value="Clay">Clay</SelectItem>
                                <SelectItem value="Sandy">Sandy</SelectItem>
                                <SelectItem value="Silty">Silty</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>
            </div>
            
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                  <div 
                    className="relative w-full aspect-video rounded-lg overflow-hidden border-dashed border-2 bg-muted flex items-center justify-center text-center cursor-pointer hover:bg-muted/80 transition-colors"
                    onClick={handleUploadClick}
                   >
                    <Input ref={inputRef} id="crop-image" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    {preview ? (
                        <Image src={preview} alt="Crop preview" fill style={{ objectFit: "contain" }} />
                    ) : (
                       <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <FileUp className="w-8 h-8" />
                           <p className="font-semibold">Click to upload an image</p>
                           <p className="text-xs">PNG, JPG, up to 5MB</p>
                       </div>
                    )}
                </div>
              </CardContent>
            </Card>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
        </div>

        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
             <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Analysis Result</CardTitle>
                <CardDescription>The AI-powered diagnosis will appear here.</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px] flex items-center justify-center">
                {isLoading && (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                     <UploadCloud className="h-12 w-12 text-muted-foreground animate-bounce" />
                    <p className="text-muted-foreground">Analyzing your crop image... Please wait.</p>
                    <Progress value={50} className="w-full animate-pulse" />
                  </div>
                )}
                {!isLoading && !result && (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <Leaf className="h-12 w-12 mb-4" />
                    <p>Your analysis results will appear here.</p>
                  </div>
                )}
                {result && (
                  <div className="space-y-4 w-full">
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-sm font-semibold text-muted-foreground">Crop Name</h3>
                            <p className="text-lg font-bold">{result.cropName || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-muted-foreground">Detected Disease</h3>
                            <p className="text-lg font-bold text-primary">{result.disease}</p>
                        </div>
                     </div>
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground">Confidence Score</h3>
                      <div className="flex items-center gap-2">
                        <Progress value={result.confidence * 100} className="w-full" />
                        <span className="font-bold">{(result.confidence * 100).toFixed(1)}%</span>
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Recommendation</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm text-muted-foreground">{result.recommendation}</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </CardContent>
            </Card>
        </div>
    </div>
  );
}
