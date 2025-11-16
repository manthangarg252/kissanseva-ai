
// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { placeholderImages } from "@/lib/placeholder-images";

// // ================ WEATHER COMPONENT =================

// type WeatherProps = {
//   data: {
//     location: string;
//     temp: number;
//     condition: string;
//     humidity?: number;
//     wind?: number;
//     feelsLike?: number;
//   };
// };

// function Weather({ data }: WeatherProps) {
//   return (
//     <div className="relative backdrop-blur-md bg-gradient-to-br from-blue-600/70 to-indigo-600/70 border-2 border-white/60 rounded-3xl p-8 shadow-2xl">
//       <div className="flex items-center justify-between">
//         <div>
//           <div className="text-base font-semibold text-white mb-2">
//             📍 {data.location}
//           </div>
//           <div className="text-6xl font-bold text-white mb-2">
//             {data.temp}°C
//           </div>
//           <div className="text-lg capitalize text-white/95 font-medium">
//             {data.condition}
//           </div>
//         </div>

//         <div className="text-right space-y-3 bg-white/20 backdrop-blur-sm rounded-xl p-4">
//           <div className="flex items-center gap-3 text-white font-medium">
//             <span className="text-2xl">💧</span>
//             <span className="text-base">{data.humidity}%</span>
//           </div>
//           <div className="flex items-center gap-3 text-white font-medium">
//             <span className="text-2xl">🌬️</span>
//             <span className="text-base">{data.wind} km/h</span>
//           </div>
//           <div className="flex items-center gap-3 text-white font-medium">
//             <span className="text-2xl">🌡️</span>
//             <span className="text-base">{data.feelsLike}°C</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const weatherData: WeatherProps["data"] = {
//   location: "Delhi",
//   temp: 26,
//   condition: "Cloudy",
//   humidity: 65,
//   wind: 12,
//   feelsLike: 28,
// };

// // ================ FEATURE CARDS =================

// const featureCards = [
//   {
//     title: "Crop Disease Detection (AI Model)",
//     description: "Upload or capture crop images to detect plant diseases using AI.",
//     href: "/ai-model",
//     imageId: "dashboard-card-1",
//   },
//   {
//     title: "Livestock Care",
//     description: "Monitor and manage animal health records.",
//     href: "/livestock",
//     imageId: "dashboard-card-2",
//   },
//   {
//     title: "Market Insights",
//     description: "Get live price updates, weather, and yield recommendations.",
//     href: "/market",
//     imageId: "dashboard-card-3",
//   },
//   {
//     title: "IoT Monitoring",
//     description: "Track soil moisture, humidity, temperature in real-time.",
//     href: "/iot",
//     imageId: "dashboard-card-4",
//   },
//   {
//     title: "Government Schemes",
//     description: "Explore schemes and get AI recommendations.",
//     href: "/schemes",
//     imageId: "dashboard-card-5",
//   },
//   {
//     title: "Traders & Buyers",
//     description: "Connect with traders and buyers for your crops.",
//     href: "/traders",
//     imageId: "dashboard-card-6",
//   },
// ];

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1 },
//   },
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: { type: "spring", stiffness: 100 },
//   },
// };

// // ================ MAIN DASHBOARD PAGE =================

// export default function DashboardPage() {
//   const bgImage = placeholderImages.find(
//     (p) => p.id === "hero-background-2"
//   );

//   return (
//     <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
//       {/* Background image */}
//       {bgImage && (
//         <div className="absolute top-0 left-0 w-full h-[320px] overflow-hidden -z-10">
//           <Image
//             src={bgImage.imageUrl}
//             alt="Farm background"
//             fill
//             className="object-cover opacity-15 blur-sm"
//           />
//         </div>
//       )}

//       {/* Gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 -z-10" />

//       {/* Main content */}
//       <div className="relative z-10 p-4 sm:p-6 lg:p-8">
//         {/* WEATHER - NOW SUPER VISIBLE */}
//         <motion.div 
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="relative z-50 max-w-2xl mx-auto mb-12 mt-8"
//         >
//           <Weather data={weatherData} />
//         </motion.div>

//         {/* HEADER */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="text-center mb-8 lg:mb-12"
//         >
//           <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
//             KissansevaAI Dashboard
//           </h1>
//           <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto drop-shadow-md">
//             Your complete smart farming toolkit.
//           </p>
//         </motion.div>

//         {/* FEATURE CARDS */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
//         >
//           {featureCards.map((card) => {
//             const cardImage = placeholderImages.find(
//               (p) => p.id === card.imageId
//             );

//             return (
//               <motion.div key={card.title} variants={itemVariants}>
//                 <Link href={card.href}>
//                   <motion.div
//                     whileHover={{ scale: 1.05, y: -5 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                     className="group relative block h-64 rounded-xl overflow-hidden shadow-lg border border-white/10"
//                   >
//                     {cardImage && (
//                       <Image
//                         src={cardImage.imageUrl}
//                         alt={card.title}
//                         fill
//                         className="z-0 transition-transform duration-300 group-hover:scale-110 object-cover brightness-75"
//                       />
//                     )}

//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

//                     <div className="relative z-20 flex flex-col justify-end h-full p-6 text-white">
//                       <h3 className="text-xl font-bold">{card.title}</h3>
//                       <p className="text-sm mt-2 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                         {card.description}
//                       </p>
//                     </div>
//                   </motion.div>
//                 </Link>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </div>
//     </div>
//   );
// }
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { placeholderImages } from "@/lib/placeholder-images";

// ================ WEATHER COMPONENT =================

type WeatherProps = {
  data: {
    location: string;
    temp: number;
    condition: string;
    humidity?: number;
    wind?: number;
    feelsLike?: number;
  };
};

function Weather({ data }: WeatherProps) {
  return (
    <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-6 shadow-lg text-white">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-200">{data.location}</div>
          <div className="text-4xl font-bold">{data.temp}°C</div>
          <div className="text-sm capitalize text-gray-100">
            {data.condition}
          </div>
        </div>

        <div className="text-right text-sm text-gray-100">
          <div>💧 Humidity: {data.humidity}%</div>
          <div>🌬️ Wind: {data.wind} km/h</div>
          <div>🌡️ Feels like: {data.feelsLike}°C</div>
        </div>
      </div>
    </div>
  );
}

const weatherData: WeatherProps["data"] = {
  location: "Delhi",
  temp: 26,
  condition: "Cloudy",
  humidity: 65,
  wind: 12,
  feelsLike: 28,
};

// ================ FEATURE CARDS =================

const featureCards = [
  {
    title: "Crop Disease Detection (AI Model)",
    description: "Upload or capture crop images to detect plant diseases using AI.",
    href: "/ai-model",
    imageId: "dashboard-card-1",
  },
  {
    title: "Livestock Care",
    description: "Monitor and manage animal health records.",
    href: "/livestock",
    imageId: "dashboard-card-2",
  },
  {
    title: "Market Insights",
    description: "Get live price updates, weather, and yield recommendations.",
    href: "/market",
    imageId: "dashboard-card-3",
  },
  {
    title: "IoT Monitoring",
    description: "Track soil moisture, humidity, temperature in real-time.",
    href: "/iot",
    imageId: "dashboard-card-4",
  },
  {
    title: "Government Schemes",
    description: "Explore schemes and get AI recommendations.",
    href: "/schemes",
    imageId: "dashboard-card-5",
  },
  {
    title: "Traders & Buyers",
    description: "Connect with traders and buyers for your crops.",
    href: "/traders",
    imageId: "dashboard-card-6",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

// ================ MAIN DASHBOARD PAGE =================

export default function DashboardPage() {
  const bgImage = placeholderImages.find(
    (p) => p.id === "hero-background-2"
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      {bgImage && (
        <div className="absolute top-0 left-0 w-full h-[320px] overflow-hidden -z-10">
          <Image
            src={bgImage.imageUrl}
            alt="Farm background"
            fill
            className="object-cover opacity-20 blur-sm"
          />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 -z-10" />

      {/* Main content */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        {/* WEATHER */}
        <div className="max-w-md mx-auto mb-10 mt-6">
          <Weather data={weatherData} />
        </div>

        {/* HEADER */}
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

        {/* FEATURE CARDS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {featureCards.map((card) => {
            const cardImage = placeholderImages.find(
              (p) => p.id === card.imageId
            );

            return (
              <motion.div key={card.title} variants={itemVariants}>
                <Link href={card.href}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group relative block h-64 rounded-xl overflow-hidden shadow-lg border border-white/10"
                  >
                    {cardImage && (
                      <Image
                        src={cardImage.imageUrl}
                        alt={card.title}
                        fill
                        className="z-0 transition-transform duration-300 group-hover:scale-110 object-[center_90%]"
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
