import React from "react";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";

const Dropdown = () => {
  return (
    <MDBDropdown>
      <MDBDropdownToggle caret color="dark">
        Continents quickfind
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>
        <MDBDropdownItem href="/Africa">Africa</MDBDropdownItem>
        <MDBDropdownItem href="/Asia">Asia</MDBDropdownItem>
        <MDBDropdownItem href="/Europe">Europe</MDBDropdownItem>
        <MDBDropdownItem href="/Oceania">Oceania</MDBDropdownItem>
        <MDBDropdownItem href="/NorthAmerica">North America</MDBDropdownItem>
        <MDBDropdownItem href="/SouthAmerica">South America</MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
  );
};

export default Dropdown;
