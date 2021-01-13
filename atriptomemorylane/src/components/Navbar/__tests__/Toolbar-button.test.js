import React from 'react'
import renderer from 'react-test-renderer'
import MainNav from '../Toolbar'
import { Nav, Navbar, NavDropdown } from "react-bootstrap";



it('renders navbar link to CreateNewMemories', () => {
   const tree = renderer
    .create( <Nav.Link href="/CreateNewMemories"></Nav.Link>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})


it('renders navbar link to Memories', () => {
    const tree = renderer
     .create(  <Nav.Link href="/Memories" />)
     .toJSON()
   expect(tree).toMatchSnapshot()
 })

 it('renders navbar link to Login', () => {
    const tree = renderer
     .create(  <Nav.Link href="/Login" />)
     .toJSON()
   expect(tree).toMatchSnapshot()
 })

 it('renders navbar link to About', () => {
    const tree = renderer
     .create(  <Nav.Link href="/About" />)
     .toJSON()
   expect(tree).toMatchSnapshot()
 })