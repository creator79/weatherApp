// @ts-nocheck
"use client";

import React, { createContext, useContext, useState } from 'react';

const TemperatureContext = createContext<{
  isCelsius: boolean;
  toggleTemperatureUnit: () => void;
}>({
  isCelsius: true,
  toggleTemperatureUnit: () => {},
});

export const TemperatureProvider: React.FC = ({ children }) => {
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  };

  return (
    <TemperatureContext.Provider value={{ isCelsius, toggleTemperatureUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
};

export const useTemperatureContext = () => useContext(TemperatureContext);
