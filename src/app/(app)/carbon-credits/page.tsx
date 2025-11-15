import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Leaf, Recycle, Wind } from "lucide-react";

const ecoTips = [
    {
        icon: Recycle,
        title: "Practice crop rotation",
        description: "Rotating crops like legumes can naturally fix nitrogen in the soil, reducing the need for chemical fertilizers."
    },
    {
        icon: Droplets,
        title: "Use drip irrigation",
        description: "This method significantly reduces water usage and evaporation, saving a vital resource and energy."
    },
    {
        icon: Leaf,
        title: "Incorporate cover crops",
        description: "Planting cover crops during off-seasons protects and enriches the soil, preventing erosion and sequestering carbon."
    },
    {
        icon: Wind,
        title: "Adopt no-till farming",
        description: "Minimizing soil disturbance helps keep carbon locked in the ground and improves soil health over time."
    }
]

export default function CarbonCreditsPage() {
  const carbonData = {
    estimated: 1.4,
    verified: 0.8,
    value: 900,
  };

  return (
    <div>
      <PageHeader
        title="Carbon Credit & Sustainability"
        description="Track your farm's positive environmental impact and learn how to improve it."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardHeader>
                <CardTitle>Estimated Savings</CardTitle>
                <CardDescription>Total carbon saved this season.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold text-green-700 dark:text-green-400">{carbonData.estimated} tons</p>
            </CardContent>
        </Card>
         <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
                <CardTitle>Verified Credits</CardTitle>
                <CardDescription>Carbon credits officially verified.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold text-blue-700 dark:text-blue-400">{carbonData.verified} tons</p>
            </CardContent>
        </Card>
        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardHeader>
                <CardTitle>Estimated Value</CardTitle>
                <CardDescription>Current market value of your credits.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold text-yellow-700 dark:text-yellow-400">₹ {carbonData.value}</p>
            </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Eco-Friendly Tips</CardTitle>
            <CardDescription>Boost your sustainability and earn more carbon credits with these practices.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ecoTips.map(tip => {
                    const Icon = tip.icon;
                    return (
                        <div key={tip.title} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                            <div className="bg-primary/10 text-primary p-3 rounded-lg">
                                <Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold">{tip.title}</h3>
                                <p className="text-sm text-muted-foreground">{tip.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
