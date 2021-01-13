import React from 'react'
import renderer from 'react-test-renderer'
import VerNav from '../VerToolbar'


it('renders navbar', () => {
   const tree = renderer
    .create(<VerNav />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})