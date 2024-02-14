"use client";
// ts-nocheck
import { useLocationContext } from "@/context/ContextProvider";
import {
  getForecastByLocationService,
  getWeatherByLocationService,
} from "@/services";
import Image from "next/image";
import { ModeToggle } from "../../components/ModeToggle";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useRouter } from "next/navigation";


const Home = () => {
  const { search, setSearch, setWeather, setForecast } = useLocationContext();
  const router = useRouter();

  const handleClick = async () => {
    const term = search.toLowerCase();
    const weather = await getWeatherByLocationService(term);
    setWeather(weather);
    const forecast = await getForecastByLocationService(term);
    setForecast(forecast);
    router.push(`/home/${term}`, undefined);
  };

  return (
    <header className="padding-x">
      <nav className="w-full flexBetween py-3">
        <div className="flex items-center sm:gap-3 gap-1">
          <Image src="/logo/logo.svg" width={72} height={72} alt="logo-icon" />
          <ModeToggle />
        </div>
        <div className="flexEnd sm:gap-3 gap-2">
          <Input
            type="text"
            placeholder="Search Location..."
            className="sm:w-[100px] lg:w-[300px] w-[80px]"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Button onClick={handleClick}>Search</Button>
        </div>
      </nav>
    </header>
  );
};

export default Home;
