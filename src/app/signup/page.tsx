
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { placeholderImages } from "@/lib/placeholder-images";
import { getFirebaseServices } from "@/lib/firebase";
import { createUserWithEmailAndPassword, type Auth } from "firebase/auth";
import { doc, setDoc, type Firestore } from "firebase/firestore";
import { Leaf } from "lucide-react";
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
import { AlertCircle } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [firebaseServices, setFirebaseServices] = useState<{auth: Auth, db: Firestore} | null>(null);

  const heroImage = placeholderImages.find((img) => img.id === 'hero-background-2');
  
  useEffect(() => {
    getFirebaseServices().then(services => setFirebaseServices(services));
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firebaseServices) {
      setError("Firebase services are not available. Please try again in a moment.");
      return;
    }

    setIsLoading(true);
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const { auth, db } = firebaseServices;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      });

      toast({
        title: "Account Created",
        description: "Welcome! You can now log in.",
      });
      router.push("/");
    } catch (err: any) {
      let message = "An unknown error occurred.";
      if (err.code === 'auth/email-already-in-use') {
        message = "This email address is already in use.";
      } else if (err.code === 'auth/weak-password') {
        message = "The password is too weak.";
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
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
                Create an Account
            </CardTitle>
            <CardDescription className="text-center text-gray-300 pt-1">
                Join KissansevaAI to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="farmer@example.com"
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
                  <AlertTitle>Sign Up Failed</AlertTitle>
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold shadow-lg shadow-green-500/20" disabled={isLoading || !firebaseServices}>
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              <span className="text-gray-400">Already have an account?</span>{" "}
              <Link href="/" className="underline text-green-400">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
