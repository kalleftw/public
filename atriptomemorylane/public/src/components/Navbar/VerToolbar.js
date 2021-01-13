import React from "react";
import "./VerToolbar.css";
import { slide as Menu } from "react-burger-menu";

/**
 * Vertical toolbar which holds each continent
 * @param {} param0 does nothing
 * @param {*} props reads the fields(continents)
 */
const VerNav = ({ displayFields = [] }, props) => {
  return (
    <Menu className="nav-icon">
      {displayFields.includes("Africa") && (
        <a className="menu-item" href="/Africa">
          Africa
        </a>
      )}
      {displayFields.includes("Asia") && (
        <a className="menu-item" href="/Asia">
          Asia
        </a>
      )}
      {displayFields.includes("Europe") && (
        <a className="menu-item" href="/Europe">
          Europe
        </a>
      )}

      {displayFields.includes("Oceania") && (
        <a className="menu-item" href="/Oceania">
          Oceania
        </a>
      )}
      {displayFields.includes("NorthAmerica") && (
        <a className="menu-item" href="/NorthAmerica">
          North America
        </a>
      )}

      {displayFields.includes("SouthAmerica") && (
        <a className="menu-item" href="/SouthAmerica">
          South America
        </a>
      )}
    </Menu>
  );
};

export default VerNav;
