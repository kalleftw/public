import React, { Component, useState } from "react";

export const MyContextCurrentCities = React.createContext()

export const DataProviderCities = ({ children }) => {
  const [currentCity, setCurrentCity] = useState(null)


  return (
    <MyContextCurrentCities.Provider value={{currentCity, setCurrentCity}}>
    {children}
    </MyContextCurrentCities.Provider>
  )
}

