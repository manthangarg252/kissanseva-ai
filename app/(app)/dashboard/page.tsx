
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { placeholderImages } from "@/lib/placeholder-images";


const featureCards = [
  {
    title: "🌾 Crop Disease Detection (AI Model)",
    description: "Upload or capture crop images to detect plant diseases using AI.",
    href: "/ai-model",
    imageId: "dashboard-card-1",
  },
  {
    title: "🐄 Livestock Care",
    description: "Monitor and manage animal health records.",
    href: "/livestock",
    imageId: "dashboard-card-2",
  },
  {
    title: "📈 Market Insights",
    description: "Get live price updates, weather, and yield recommendations.",
    href: "/market",
    imageId: "dashboard-card-3",
  },
  {
    title: "⚙️ IoT Monitoring",
    description: "Track soil moisture, humidity, temperature in real-time.",
    href: "/iot",
    imageId: "dashboard-card-4",
  },
   {
    title: "💰 Government Schemes",
    description: "Explore schemes and get AI recommendations.",
    href: "/schemes",
    imageId: "dashboard-card-5",
  },
  {
    title: "🤝 Traders & Buyers",
    description: "Connect with traders and buyers for your crops.",
    href: "/traders",
    imageId: "dashboard-card-6",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function DashboardPage() {
  const bgImage = placeholderImages.find((p) => p.id === "hero-background-2");

  return (
      <div className="relative min-h-full w-full overflow-hidden">
        {bgImage && (
          <Image
            src={bgImage.imageUrl}
            alt="Farm background"
            layout="fill"
            objectFit="cover"
            className="z-0 opacity-20 blur-sm"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 z-10" />

        <div className="relative z-20 p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 lg:mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
              KissansevaAI Dashboard
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Your complete smart farming toolkit.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {featureCards.map((card) => {
              const cardImage = placeholderImages.find(p => p.id === card.imageId);
              return (
                <motion.div key={card.title} variants={itemVariants}>
                  <Link href={card.href} passHref>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="group relative block h-64 rounded-xl overflow-hidden shadow-lg border border-white/10"
                    >
                      {cardImage && (
                         <Image
                            src={cardImage.imageUrl}
                            alt={card.title}
                            layout="fill"
                            objectFit="cover"
                            className="z-0 transition-transform duration-300 group-hover:scale-110"
                            data-ai-hint={cardImage.imageHint}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                      <div className="relative z-20 flex flex-col justify-end h-full p-6 text-white">
                        <h3 className="text-xl font-bold">{card.title}</h3>
                        <p className="text-sm mt-2 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {card.description}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
  );
}
