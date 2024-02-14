// Weather.tsx
import { useTemperatureContext } from "@/context/TemperatureProvider";
import { WeatherResponse } from "@/types";
import { formatTime } from "@/utils";
import WeatherCard from "../WeatherCard";
import { Button } from "../ui/button";

const Weather = ({ data }: { data: WeatherResponse | null }) => {
  const { isCelsius, toggleTemperatureUnit } = useTemperatureContext();

  const temperatureUnit = (temperature: number) => {
    return isCelsius ? `${temperature.toFixed(1)} °C` : `${((temperature * 9) / 5 + 32).toFixed(1)} °F`;
  };

  let temperatureDisplay = "";
  if (data) {
    temperatureDisplay = temperatureUnit(data.main.temp);
  }

  const weatherCardArray = data
    ? [
        {
          title: "Sunrise",
          imgSrc: "/weather/sunrise.svg",
          value: `${formatTime(data?.sys?.sunrise)}`,
        },
        {
          title: "Sunset",
          imgSrc: "/weather/sunset.svg",
          value: `${formatTime(data?.sys?.sunset)}`,
        },
        {
          title: "Wind",
          imgSrc: "/weather/wind.svg",
          value: `${data?.wind?.speed} km/h`,
        },
        {
          title: "Humidity",
          imgSrc: "/weather/humidity.svg",
          value: `${data?.main?.humidity} %`,
        },
        {
          title: "Feels Like",
          imgSrc: "/weather/feels.svg",
          value: temperatureDisplay,
        },
        {
          title: "Visibility",
          imgSrc: "/weather/visibility.svg",
          value: `${data.visibility} km`,
        },
      ]
    : [];

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
 
     <Button onClick={() => toggleTemperatureUnit()}>
     Change to {isCelsius ? "°F" : "°C"}
     </Button>

      {weatherCardArray.map((card, index) => (
        <WeatherCard
          title={card.title}
          imgSrc={card.imgSrc}
          value={card.value}
          key={index}
        />
      ))}
    </div>
  );
};

export default Weather;
