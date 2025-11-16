import React from "react";

export default function Weather({ data }) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-5 rounded-2xl shadow-xl w-full max-w-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">🌤️ Weather Update</h2>
        <span className="text-sm opacity-80">{data.location}</span>
      </div>

      {/* Main Temp */}
      <div className="text-center my-4">
        <div className="text-6xl font-extrabold">{data.temp}°C</div>
        <div className="text-lg capitalize mt-2 opacity-90">
          {data.condition}
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex justify-between text-sm mt-6">
        
        <div className="flex flex-col items-center">
          <span className="text-xl">💧</span>
          <span>Humidity</span>
          <span className="font-semibold">{data.humidity}%</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xl">🌬️</span>
          <span>Wind</span>
          <span className="font-semibold">{data.wind} km/h</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xl">🌡️</span>
          <span>Feels Like</span>
          <span className="font-semibold">{data.feelsLike}°C</span>
        </div>

      </div>
    </div>
  );
}
