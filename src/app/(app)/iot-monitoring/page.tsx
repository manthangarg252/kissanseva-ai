"use client";
import { getFirebaseServices } from "@/lib/firebase";
import { collection, onSnapshot, type DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Thermometer, Droplets, Wind, Leaf, Signal } from "lucide-react";
import { format, isValid } from 'date-fns';

const mockData = [
    { id: '1', sensorType: 'Temperature', value: 28.5, unit: '°C', timestamp: new Date().toISOString() },
    { id: '2', sensorType: 'Humidity', value: 65, unit: '%', timestamp: new Date().toISOString() },
    { id: '3', sensorType: 'Soil Moisture', value: 45.2, unit: '%', timestamp: new Date().toISOString() },
    { id: '4', sensorType: 'pH Level', value: 6.8, unit: '', timestamp: new Date().toISOString() },
]

export default function IoTMonitoringPage() {
  const [data, setData] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeFirebase = async () => {
        try {
            const { db } = await getFirebaseServices();
            const unsub = onSnapshot(collection(db, "iotData"), (snapshot) => {
              if (snapshot.empty) {
                  setData(mockData); // Use mock data if collection is empty
              } else {
                  const newData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                  const latestData: {[key: string]: DocumentData} = {};
                  newData.forEach(item => {
                    if (item.sensorId) {
                        if (!latestData[item.sensorId] || item.timestamp > latestData[item.sensorId].timestamp) {
                            latestData[item.sensorId] = item;
                        }
                    } else if (item.sensorType) { // Fallback for docs without sensorId
                         if (!latestData[item.sensorType] || item.timestamp > latestData[item.sensorType].timestamp) {
                            latestData[item.sensorType] = item;
                        }
                    }
                  });
                  setData(Object.values(latestData).sort((a,b) => a.sensorType.localeCompare(b.sensorType)));
              }
              setIsLoading(false);
            }, (error) => {
                console.error("Error fetching IoT data:", error);
                setData(mockData); // Fallback to mock data on error
                setIsLoading(false);
            });
            return () => unsub();
        } catch (error) {
            console.error("Error initializing Firebase:", error);
            setData(mockData); // Fallback to mock data
            setIsLoading(false);
        }
    }
    
    initializeFirebase();
  }, []);

  const getSensorIcon = (sensorType: string) => {
    switch (sensorType.toLowerCase()) {
        case 'temperature':
            return <Thermometer className="w-8 h-8 text-amber-300" />;
        case 'humidity':
            return <Droplets className="w-8 h-8 text-sky-300" />;
        case 'soil moisture':
            return <Wind className="w-8 h-8 text-lime-400" />;
        case 'ph level':
            return <Leaf className="w-8 h-8 text-green-400" />;
        default:
            return <Signal className="w-8 h-8 text-gray-400" />;
    }
  }
  
  const formatTimestamp = (timestamp: any): string => {
    if (!timestamp) return 'N/A';
    try {
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return isValid(date) ? format(date, 'PPpp') : 'Invalid Date';
    } catch {
        return 'Invalid Date';
    }
  }


  return (
      <div className="p-4 sm:p-6 lg:p-8">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 lg:mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
              ⚙️ IoT Sensor Dashboard
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Live readings from your connected farm sensors.
            </p>
        </motion.div>

        {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-40 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 animate-pulse"></div>
                ))}
            </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {data.map((item, i) => (
              <motion.div
                key={item.id || i}
                variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                }}
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 flex flex-col justify-between"
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold text-gray-200">{item.sensorType || 'Unknown'}</h2>
                  {getSensorIcon(item.sensorType || '')}
                </div>
                <div>
                  <p className="text-4xl text-white font-bold mt-2">
                    {typeof item.value === 'number' ? item.value.toFixed(1) : item.value}
                    {item.unit && <span className="text-lg ml-1 text-gray-400">{item.unit}</span>}
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    Last Updated: {formatTimestamp(item.timestamp)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
  );
}
