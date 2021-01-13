import React from "react";
import '../../css/VerToolbar.css'
import { slide as Menu } from "react-burger-menu";
import CountryList from "../country-list";

/**
 * Vertical navigation bar
 * @param {} props fills with the continents in the countrylist
 */
  export const VerContinentToolbar = (props) => {
   return (
    <Menu className="nav-icon">
    <CountryList
      continent={props.continent}
      displayFields={["revName"]}
    />
  </Menu>

   );
 };

export default VerContinentToolbar;

