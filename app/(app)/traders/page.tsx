
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { traders } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Search, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Trader = typeof traders[0];

export default function TradersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredTraders = traders.filter((trader) => {
    const matchesSearch =
      trader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trader.crops.some((crop) =>
        crop.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesLocation = locationFilter
      ? trader.location.toLowerCase() === locationFilter.toLowerCase()
      : true;
    return matchesSearch && matchesLocation;
  });

  const locations = [...new Set(traders.map(t => t.location))];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Trader & Buyer Directory"
        description="Find and connect with traders and buyers for your crops."
      />
      <div className="mb-6">
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-1/2 lg:w-1/3">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                        placeholder="Search by name or crop..."
                        className="pl-8 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Select onValueChange={setLocationFilter} value={locationFilter}>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="All Locations" />
                            </SelectTrigger>
                            <SelectContent>
                                {locations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        {locationFilter && (
                            <Button variant="ghost" onClick={() => setLocationFilter("")}>
                                <X className="mr-2 h-4 w-4" />
                                Clear
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTraders.length > 0 ? (
            filteredTraders.map((trader: Trader) => (
            <Card key={trader.id} className="flex flex-col">
                <CardHeader>
                <CardTitle>{trader.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 pt-1">
                    <MapPin className="w-4 h-4" /> {trader.location}
                </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                <p className="font-semibold text-sm mb-2">Deals in:</p>
                <div className="flex flex-wrap gap-2">
                    {trader.crops.map((crop) => (
                    <Badge key={crop} variant="secondary">
                        {crop}
                    </Badge>
                    ))}
                </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                        <a href={`tel:${trader.contact}`}>
                            <Phone className="w-4 h-4 mr-2" /> Call Now
                        </a>
                    </Button>
                </CardFooter>
            </Card>
            ))
        ) : (
            <div className="text-center py-10 col-span-full">
                <p className="text-muted-foreground">No traders found matching your criteria.</p>
            </div>
        )}
      </div>
    </div>
  );
}
