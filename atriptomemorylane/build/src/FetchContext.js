import React, { Component, useState, useEffect } from "react";

export const MyContext = React.createContext()

export const DataProvider = ({ children }) => {
  const [currentContinent, setCurrentContinent] = useState(null)
  
  return (
    <MyContext.Provider value={{currentContinent, setCurrentContinent}}>
    {children}
    </MyContext.Provider>
  )
}

