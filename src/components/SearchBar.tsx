import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useWeatherStore } from "../store/weatherStore";

export const SearchBar = () => {
    const [input, setInput] = useState('');
    const { setCity } = useWeatherStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            setCity(input.trim());
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Shahar nomini kiriting..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400"
                >
                    <Search size={20} />
                </button>
            </div>
        </form>
    );
};