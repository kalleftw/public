import React from 'react'
import renderer from 'react-test-renderer'
import { slide as Menu } from "react-burger-menu";
import CountryList from "../../country-list";
import VerContinentToolbar from '../VerContinentToolbar'


it('renders menu', () => {
   const tree = renderer
    .create(<Menu />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

