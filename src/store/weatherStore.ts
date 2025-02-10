import { create } from "zustand";

interface WeatherStore {
  city: string;
  setCity: (city: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  savedCities: string[];
  addSavedCity: (city: string) => void;
  removeSavedCity: (city: string) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  city: "",
  setCity: (city) => set({ city }),
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  savedCities: [],
  addSavedCity: (city) =>
    set((state) => ({
      savedCities: [...new Set([...state.savedCities, city])],
    })),
  removeSavedCity: (city) =>
    set((state) => ({
      savedCities: state.savedCities.filter((c) => c !== city),
    })),
}));
