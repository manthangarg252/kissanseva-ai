
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { governmentSchemes } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { recommendApplicableSchemes, type RecommendApplicableSchemesOutput } from "@/ai/flows/recommend-applicable-schemes";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowUpRight, CheckCircle, Lightbulb, Loader2, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


type Scheme = typeof governmentSchemes[0];

export default function SchemesPage() {
  const [recommendedSchemes, setRecommendedSchemes] = useState<RecommendApplicableSchemesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRecommend = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendedSchemes(null);
    try {
        const farmProfile = {
            cropSown: "Rice",
            soilType: "Clay",
            area: 2.5,
            irrigationType: "Drip Irrigation",
            location: { lat: 28.6139, lng: 77.2090 },
        };

        const result = await recommendApplicableSchemes({
            farmProfile,
            availableSchemes: governmentSchemes,
        });
      setRecommendedSchemes(result);
    } catch (e) {
      setError("Could not fetch recommendations. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const isRecommended = (schemeName: string) => {
    return recommendedSchemes?.some(rs => rs.name === schemeName);
  }

  const getRecommendationReason = (schemeName: string) => {
    return recommendedSchemes?.find(rs => rs.name === schemeName)?.reason;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Government Schemes"
        description="Explore agricultural schemes and get AI-powered recommendations."
      />
      
      <Card className="mb-6">
        <CardHeader>
            <CardTitle>Personalized AI Recommendations</CardTitle>
            <CardDescription>Click the button to analyze your profile and find the best schemes for you.</CardDescription>
        </CardHeader>
        <CardContent>
            <Button onClick={handleRecommend} disabled={isLoading}>
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : <><Sparkles className="mr-2 h-4 w-4" /> Get AI Recommendations</>}
            </Button>
             {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {governmentSchemes.map((scheme: Scheme) => (
          <Card key={scheme.name} className={`flex flex-col transition-all ${isRecommended(scheme.name) ? 'border-primary shadow-lg' : ''}`}>
            <CardHeader>
                <CardTitle>{scheme.name}</CardTitle>
                <Badge variant={isRecommended(scheme.name) ? 'default' : 'secondary'} className="w-fit mt-1">{scheme.type}</Badge>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{scheme.description}</CardDescription>
              <div className="mt-4">
                <p className="font-semibold text-sm mb-2">Eligibility:</p>
                <div className="flex flex-wrap gap-2">
                  {scheme.eligibility.map((criterion) => (
                    <Badge key={criterion} variant="outline">
                      {criterion}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
             <div className="p-6 pt-0">
                {isRecommended(scheme.name) && (
                    <div className="mb-4 p-3 bg-primary/10 rounded-lg text-sm">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-primary">Recommended for you</h4>
                                <p className="text-primary/80">{getRecommendationReason(scheme.name)}</p>
                            </div>
                        </div>
                    </div>
                  )}
                 <Button variant="outline" size="sm" asChild className="w-full">
                  <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                    Visit Official Site <ArrowUpRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
