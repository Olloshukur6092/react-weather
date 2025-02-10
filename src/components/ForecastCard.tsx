import React from "react";
import { ForecastData } from "../types/weather";

interface Props {
    data: ForecastData;
}

export const ForecastCard: React.FC<Props> = ({ data }) => {
    const dailyForecasts = data.list.filter((_, index) => index % 8 === 0);
    const getWeatherData = () => {
        console.log(dailyForecasts);
    };
    return (
        <>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md mt-4">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">5 kunlik prognoz</h3>
                <div className="grid grid-cols-5 gap-2">
                    {dailyForecasts.map((forecast) => (
                        <div
                            key={forecast.dt}
                            className="text-center p-2"
                        >
                            <p className="text-sm dark:text-gray-300">
                                {new Date(forecast.dt * 1000).toLocaleDateString('uz-UZ', {
                                    weekday: 'short',
                                })}
                            </p>
                            <img
                                src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                                alt={forecast.weather[0].description}
                                className="mx-auto"
                            />
                            <p className="font-semibold dark:text-white">
                                {Math.round(forecast.main.temp)}°C
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <button onClick={getWeatherData} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 w-full">
                    Jo'natish
                </button>
            </div>
        </>
    );
};