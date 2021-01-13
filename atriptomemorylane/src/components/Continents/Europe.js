import Carousel from "react-bootstrap/Carousel";
import a1 from "../../assets/europe/e1.jpg";
import a2 from "../../assets/europe/e2.jpg";
import a3 from "../../assets/europe/e3.jpg";
import "../../css/Continents.css";
import VerContinentToolbar from "../Navbar/VerContinentToolbar";
import React, { useContext, useEffect } from "react";
import { MyContext } from "../../context/FetchContext";

/**
 * Simple component that renders everything under the continent "Europe"
 */
export const Europe = () => {
  const DataContext = useContext(MyContext);
  const { setCurrentContinent } = DataContext;
  useEffect(() => {
    setCurrentContinent("Europe");
  });

  return (
    <div className="image_carousel">
      <VerContinentToolbar continent={"Europe"} />

      <Carousel className="Carousel">
        <Carousel.Item>
          <img className="d-block w-100" src={a1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={a2} alt="Third slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={a3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
