
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { placeholderImages } from "@/lib/placeholder-images";
import { Leaf, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const hardcodedEmail = "admin@example.com";
const hardcodedPassword = "123456";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const heroImage = placeholderImages.find((img) => img.id === 'hero-background');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate network delay
    setTimeout(() => {
      if (email === hardcodedEmail && password === hardcodedPassword) {
        toast({
          title: "Login Successful",
          description: "Welcome! Redirecting you to the dashboard.",
        });
        router.push("/dashboard");
      } else {
        const errorMessage = "Invalid email or password.";
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: errorMessage,
        });
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="relative min-h-screen w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex min-h-screen items-center justify-center py-12">
        <Card className="mx-auto w-full max-w-sm bg-black/50 backdrop-blur-sm border-white/20 text-white">
          <CardHeader>
            <div className="flex justify-center mb-4">
                <Leaf className="w-12 h-12 text-green-400"/>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
                Login to KissansevaAI
            </CardTitle>
            <CardDescription className="text-center text-gray-300 pt-1">
                Enter your credentials to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 focus:ring-green-400"
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 focus:ring-green-400"
                    disabled={isLoading}
                />
              </div>
               {error && (
                <Alert variant="destructive" className="bg-red-900/80 border-red-500/50 text-white">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Login Failed</AlertTitle>
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold shadow-lg shadow-green-500/20" disabled={isLoading}>
                {isLoading ? "Logging In..." : "Login"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              <span className="text-gray-400">Don't have an account?</span>{" "}
              <Link href="/signup" className="underline text-green-400">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
