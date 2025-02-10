import React from 'react';
import {
    Cloud,
    Droplets,
    Star,
    StarOff,
    Sun,
    Wind,
} from 'lucide-react';
import { WeatherData } from '../types/weather';
import { useWeatherStore } from '../store/weatherStore';

interface Props {
    data: WeatherData;
}

export const WeatherCard: React.FC<Props> = ({ data }) => {
    const { savedCities, addSavedCity, removeSavedCity } = useWeatherStore();
    const isSaved = savedCities.includes(data.name);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {data.name}, {data.sys.country}
                    </h2>
                    <p className="text-4xl font-bold text-blue-500 mt-2">
                        {Math.round(data.main.temp)}°C
                    </p>
                </div>
                <button
                    onClick={() =>
                        isSaved ? removeSavedCity(data.name) : addSavedCity(data.name)
                    }
                    className="p-2 hover:text-blue-500 dark:text-gray-400"
                >
                    {isSaved ? <StarOff size={24} /> : <Star size={24} />}
                </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                    <Sun className="text-yellow-500" size={20} />
                    <span className="dark:text-gray-300">
                        His qilinishi: {Math.round(data.main.feels_like)}°C
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Droplets className="text-blue-500" size={20} />
                    <span className="dark:text-gray-300">
                        Namlik: {data.main.humidity}%
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Wind className="text-gray-500" size={20} />
                    <span className="dark:text-gray-300">
                        Shamol: {Math.round(data.wind.speed)} m/s
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Cloud className="text-gray-500" size={20} />
                    <span className="dark:text-gray-300">
                        {data.weather[0].description}
                    </span>
                </div>
            </div>
        </div>
    );
};