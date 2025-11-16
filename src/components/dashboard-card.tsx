import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";


export default function Dashboard() {
  const dummyWeather = {
    location: "Kurukshetra",
    temp: 28,
    condition: "partly cloudy",
    humidity: 62,
    wind: 12,
    feelsLike: 30,
  };

  return (
    <div className="space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Weather — {dummyWeather.location}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Temperature: {dummyWeather.temp}°C (feels like {dummyWeather.feelsLike}°C)</p>
          <p className="text-sm">Condition: {dummyWeather.condition}</p>
          <p className="text-sm">Humidity: {dummyWeather.humidity}% • Wind: {dummyWeather.wind} km/h</p>
        </CardContent>
      </Card>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export function DashboardCard({
  title,
  description,
  href,
  icon: Icon,
}: DashboardCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full transition-all duration-300 hover:border-primary hover:shadow-xl hover:-translate-y-1">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="bg-primary/10 text-primary p-3 rounded-lg">
              <Icon className="w-8 h-8" />
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-xl font-semibold mb-2 font-headline">{title}</CardTitle>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
