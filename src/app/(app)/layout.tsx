
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { placeholderImages } from "@/lib/placeholder-images";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const userAvatar = placeholderImages.find((img) => img.id === 'user-avatar');
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, you'd revoke a session here.
    // For this mock implementation, we just redirect.
    router.push('/');
  };

  return (
      <div className="min-h-screen w-full flex flex-col bg-background">
        <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-white/10 bg-black/30 backdrop-blur-md px-4 lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-white">
              <Leaf className="h-6 w-6 text-green-400" />
              <span className="">KissansevaAI</span>
          </Link>
          <div className="flex-1" />
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
                  <Avatar>
                      {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" data-ai-hint={userAvatar.imageHint} />}
                      <AvatarFallback>FN</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-900/80 border-white/20 text-white backdrop-blur-md">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10"/>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </header>
        <main className="flex-1">
            {children}
        </main>
      </div>
  );
}
