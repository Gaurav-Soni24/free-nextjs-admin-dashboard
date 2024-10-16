"use client";

import React, { useEffect, useState } from 'react';
import { useLocation } from '@/components/contexts/LocationContext';
import axios from 'axios';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';
import { FiSunrise, FiSunset } from 'react-icons/fi';
import useColorMode from "@/hooks/useColorMode";

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  icon: string;
  sunrise: number;
  sunset: number;
}

const WeatherDashboard: React.FC = () => {
  const { lat, lng, locationName } = useLocation();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [colorMode] = useColorMode();

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (lat === null || lng === null) {
        setError("Location data is not available. Please ensure you've selected a location.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=b8bf61da6ffe2cdd969b0df05d40c897&units=metric`
        );

        setWeatherData({
          temperature: Math.round(response.data.main.temp),
          description: response.data.weather[0].description,
          humidity: response.data.main.humidity,
          windSpeed: response.data.wind.speed,
          feelsLike: Math.round(response.data.main.feels_like),
          icon: response.data.weather[0].icon,
          sunrise: response.data.sys.sunrise,
          sunset: response.data.sys.sunset,
        });
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError("Failed to fetch weather data. Please try again later.");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [lat, lng]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500 bg-red-100 rounded-lg p-4">{error}</div>;
  }

  if (!weatherData) {
    return <div className="text-center py-10 text-gray-500">No weather data available</div>;
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">{locationName}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center">
            <img 
              src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt={weatherData.description}
              className="w-20 h-20"
            />
            <div>
              <p className="text-6xl font-bold text-green-600">{weatherData.temperature}°C</p>
              <p className="text-sm text-green-700 capitalize">{weatherData.description}</p>
              <p className="text-sm text-green-600">Feels like {weatherData.feelsLike}°C</p>
            </div>
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-2">
          <WeatherDetail icon={<WiHumidity size={24} />} label="Humidity" value={`${weatherData.humidity}%`} />
          <WeatherDetail icon={<WiStrongWind size={24} />} label="Wind Speed" value={`${weatherData.windSpeed.toFixed(2)} m/s`} />
          <WeatherDetail icon={<FiSunrise size={20} />} label="Sunrise" value={formatTime(weatherData.sunrise)} />
          <WeatherDetail icon={<FiSunset size={20} />} label="Sunset" value={formatTime(weatherData.sunset)} />
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-green-700 mb-2">Hourly Forecast</h3>
        <div className="grid grid-cols-4 gap-2">
          {['12 PM', '3 PM', '6 PM', '9 PM'].map((time, index) => (
            <div key={index} className="bg-green-50 rounded-lg p-2 text-center">
              <p className="text-sm text-green-700">{time}</p>
              <img 
                src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                alt={weatherData.description}
                className="w-8 h-8 mx-auto"
              />
              <p className="text-sm font-semibold text-green-600">{Math.round(weatherData.temperature - index * 2)}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const WeatherDetail: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => {
  return (
    <div className="bg-green-50 rounded-lg p-2 flex items-center">
      <div className="text-green-600 mr-2">{icon}</div>
      <div>
        <p className="text-xs text-green-700">{label}</p>
        <p className="text-sm font-semibold text-green-600">{value}</p>
      </div>
    </div>
  );
};

export default WeatherDashboard;
