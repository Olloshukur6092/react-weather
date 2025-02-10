import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Moon, Sun } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from "./components/WeatherCard";
import { ForecastCard } from "./components/ForecastCard";
import { useWeatherStore } from "./store/weatherStore";
import { WeatherData, ForecastData } from "./types/weather";

const API_KEY = import.meta.env.API_KEY; // Replace with your OpenWeatherMap API key
const BASE_URL = import.meta.env.BASE_URL;

const App: React.FC = () => {
  const { city, isDarkMode, toggleDarkMode } = useWeatherStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const { data: weatherData, isLoading: weatherLoading } = useQuery<WeatherData>({
    queryKey: ['weather', city],
    queryFn: async () => {
      if (!city) return null;
      const response = await fetch(
        `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}&lang=uz`
      );
      if (!response.ok) throw new Error('Weather data not found');
      return response.json();
    },
    enabled: !!city,
  });

  const { data: forecastData, isLoading: forecastLoading } = useQuery<ForecastData>({
    queryKey: ['forecast', city],
    queryFn: async () => {
      if (!city) return null;
      const response = await fetch(
        `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}&lang=uz`
      );
      if (!response.ok) throw new Error('Forecast data not found');
      return response.json();
    },
    enabled: !!city,
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Ob-havo ma'lumotlari
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDarkMode ? (
              <Sun className="text-yellow-500" size={24} />
            ) : (
              <Moon className="text-gray-600" size={24} />
            )}
          </button>
        </div>

        <div className="flex flex-col items-center gap-6">
          <SearchBar />

          {weatherLoading || forecastLoading ? (
            <div className="text-center dark:text-white">Ma'lumotlar yuklanmoqda...</div>
          ) : weatherData && forecastData ? (
            <>
              <WeatherCard data={weatherData} />
              <ForecastCard data={forecastData} />
            </>
          ) : city ? (
            <div className="text-center text-red-500 dark:text-red-400">
              Shahar topilmadi
            </div>
          ) : (
            <div className="text-center dark:text-white">
              Ob-havo ma'lumotlarini ko'rish uchun shahar nomini kiriting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;