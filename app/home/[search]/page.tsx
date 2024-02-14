"use client";
import Forecast from "@/components/sections/Forecast";
import Hero from "@/components/sections/Hero";
import Weather from "@/components/sections/Weather";

import { useLocationContext } from "@/context/ContextProvider";
import {
  getForecastByLocationService,
  getWeatherByLocationService,
} from "@/services";
import { useEffect, ReactNode } from "react";


const Home = ({ params }: { params: { search: string } }): ReactNode => {

  const { weather, setWeather, forecast, setForecast } = useLocationContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await getWeatherByLocationService(params.search);
        setWeather(weatherData);
        const forecastData = await getForecastByLocationService(params.search);
        setForecast(forecastData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [params.search, setWeather, setForecast]);

  return (
    <>
      <h1>Search page </h1>
      <Hero data={weather} />
      <section className="flexBetween lg:flex-row flex-col py-4 padding-x gap-y-6">
        <Weather data={weather} />
        <Forecast data={forecast} />
      </section>
    </>
  );
}

export default Home;