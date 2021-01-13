import React from 'react'
import renderer from 'react-test-renderer'
import {Africa} from '../Africa'
import {Asia} from '../Asia'
import {Europe} from '../Europe'
import {Oceania} from '../Oceania'
import {NorthAmerica} from '../NorthAmerica'
import {SouthAmerica} from '../SouthAmerica'
import {MyContext} from '../../../context/FetchContext'


test('Africa shows value from provider', () => {
    const tree = (
      <MyContext.Provider value="Africa">
        <Africa />
      </MyContext.Provider>
    )
    
    expect.toHaveTextContent('Africa')
  })

  test('Asia shows value from provider', () => {
    const tree = (
      <MyContext.Provider value="Asia">
        <Asia />
      </MyContext.Provider>
    )
    
    expect.toHaveTextContent('Asia')
  })

  test('Europe shows value from provider', () => {
    const tree = (
      <MyContext.Provider value="Europe">
        <Europe />
      </MyContext.Provider>
    )
    
    expect.toHaveTextContent('Europe')
  })


  test('Oceania shows value from provider', () => {
    const tree = (
      <MyContext.Provider value="Oceania">
        <Oceania />
      </MyContext.Provider>
    )
    
    expect.toHaveTextContent('Oceania')
  })


  test('NorthAmerica shows value from provider', () => {
    const tree = (
      <MyContext.Provider value="NorthAmerica">
        <NorthAmerica />
      </MyContext.Provider>
    )
    
    expect.toHaveTextContent('NorthAmerica')
  })


  test('SouthAmerica shows value from provider', () => {
    const tree = (
      <MyContext.Provider value="SouthAmerica">
        <SouthAmerica />
      </MyContext.Provider>
    )
    
    expect.toHaveTextContent('SouthAmerica')
  })
