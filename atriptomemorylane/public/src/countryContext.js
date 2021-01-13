import React, { Component, useState, useEffect } from "react";

export const MyContextCurrentCountry = React.createContext()

export const DataProviderCountries = ({ children }) => {
  const [currentCountry, setCurrentCountry] = useState(null)

  useEffect(() => {
    if (currentCountry != null) {
      window.localStorage.setItem('country', currentCountry)
    }
    
  }, [currentCountry]);
  return (
    <MyContextCurrentCountry.Provider value={{currentCountry, setCurrentCountry}}>
    {children}
    </MyContextCurrentCountry.Provider>
  )
}

