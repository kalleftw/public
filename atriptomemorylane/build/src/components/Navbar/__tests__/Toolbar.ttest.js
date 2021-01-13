import React from 'react'
import renderer from 'react-test-renderer'
import MainNav from '../Toolbar'


it('renders navbar', () => {
   const tree = renderer
    .create(<MainNav />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})