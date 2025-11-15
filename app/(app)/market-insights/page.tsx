
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getPersonalizedCropRecommendations, type PersonalizedCropRecommendationsOutput } from "@/ai/flows/get-personalized-crop-recommendations";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Lightbulb, Loader2, Sparkles, TrendingUp, CheckCircle, Wheat } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

export default function MarketInsightsPage() {
  const [farmProfile, setFarmProfile] = useState({
    crop: "Wheat",
    soilType: "Loamy",
    area: "5",
    irrigationType: "Drip",
    location: "Punjab, India",
  });
  const [recommendations, setRecommendations] = useState<PersonalizedCropRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFarmProfile(prev => ({ ...prev, [name]: value }));
  };
    
  const handleSelectChange = (name: string, value: string) => {
    setFarmProfile(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const input = {
        farmProfile: `Crop: ${farmProfile.crop}, Soil Type: ${farmProfile.soilType}, Area: ${farmProfile.area} acres, Irrigation: ${farmProfile.irrigationType}, Location: ${farmProfile.location}`,
        diseaseDetectionResults: "No recent diseases detected.",
        soilAnalysisResults: "pH: 6.8, Nitrogen: High, Phosphorus: Medium, Potassium: Medium.",
        carbonDataResults: "Farm has a positive carbon credit score.",
        languagePreference: "en",
      };
      const result = await getPersonalizedCropRecommendations(input);
      setRecommendations(result);
    } catch (err) {
      setError("Failed to fetch recommendations. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const RecommendationItem = ({ icon, title, content }: { icon: React.ReactNode, title: string, content: string | undefined }) => (
    <div className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-2 rounded-full">
            {icon}
        </div>
        <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{content || 'No specific advice provided.'}</p>
        </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="AI Crop & Market Insights"
        description="Get AI-powered recommendations for your farm and simulated market predictions."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Farm Profile</CardTitle>
              <CardDescription>Enter details for personalized insights.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" value={farmProfile.location} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="soilType">Soil Type</Label>
                   <Select name="soilType" onValueChange={(value) => handleSelectChange('soilType', value)} value={farmProfile.soilType}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Loamy">Loamy</SelectItem>
                            <SelectItem value="Clay">Clay</SelectItem>
                            <SelectItem value="Sandy">Sandy</SelectItem>
                            <SelectItem value="Silty">Silty</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                  <Label htmlFor="area">Farm Area (in acres)</Label>
                  <Input id="area" name="area" type="number" value={farmProfile.area} onChange={handleInputChange} />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Fetching...</> : <><Sparkles className="mr-2 h-4 w-4"/> Get AI Recommendations</>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!recommendations && !isLoading && !error && (
            <Card className="flex flex-col items-center justify-center text-center h-full min-h-[300px]">
              <CardHeader>
                  <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">Your personalized recommendations will appear here.</p>
                <p className="text-muted-foreground">Fill out your farm profile and click the button to start.</p>
              </CardContent>
            </Card>
          )}

          {isLoading && (
             <Card className="flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                <CardHeader>
                    <Loader2 className="mx-auto h-12 w-12 text-muted-foreground animate-spin" />
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-semibold">Our AI is crunching the numbers for you...</p>
                    <p className="text-muted-foreground">This may take a moment.</p>
                </CardContent>
             </Card>
          )}

          {recommendations && (
            <Card>
                <CardHeader>
                    <CardTitle>AI-Generated Recommendations</CardTitle>
                    <CardDescription>Based on your farm profile and simulated data.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <RecommendationItem 
                            icon={<Sparkles size={20}/>}
                            title="Overall Summary"
                            content={recommendations.recommendations}
                        />
                    </div>
                    <Separator />
                    <div className="grid gap-6">
                       <RecommendationItem 
                            icon={<CheckCircle size={20}/>}
                            title="Crop Rotation Advice"
                            content={recommendations.cropRotationAdvice}
                        />
                        <RecommendationItem 
                            icon={<Wheat size={20}/>}
                            title="Fertilizer Optimization"
                            content={recommendations.fertilizerOptimization}
                        />
                        <RecommendationItem 
                            icon={<TrendingUp size={20}/>}
                            title="Irrigation Schedules"
                            content={recommendations.irrigationSchedules}
                        />
                    </div>
                </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
