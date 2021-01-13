import React, { useState } from "react";

export const MyContextCurrentCities = React.createContext()

export const DataProviderCities = ({ children }) => {
  const [currentCity, setCurrentCity] = useState({city: null, review: null})


  return (
    <MyContextCurrentCities.Provider value={{currentCity, setCurrentCity}}>
    {children}
    </MyContextCurrentCities.Provider>
  )
}


export const MyContextDest1Review = React.createContext()

export const DataProviderDest1Review = ({ children }) => {
  const [dest1Review, setDest1Review] = useState(null)


  return (
    <MyContextDest1Review.Provider value={{dest1Review, setDest1Review}}>
    {children}
    </MyContextDest1Review.Provider>
  )
}

