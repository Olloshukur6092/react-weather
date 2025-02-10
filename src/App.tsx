import React from 'react';
import AppRoot from './root/appRoot';

const API_KEY = import.meta.env.VITE_API_KEY // Replace with your OpenWeatherMap API key
const BASE_URL = import.meta.env.VITE_BASE_URL;


const App: React.FC = () => {

  return (
    <AppRoot apiUrl={BASE_URL} apiKey={API_KEY} />
  );
}

export default App;