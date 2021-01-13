
import Carousel from "react-bootstrap/Carousel";
import a1 from "../../assets/na/na1.jpg";
import a2 from "../../assets/na/na2.jpg";
import a3 from "../../assets/na/na3.jpg";
import "./Continents.css";
import VerContinentToolbar from "../Navbar/VerContinentToolbar";
import React, { useContext, useEffect } from "react";
import { MyContext } from "../../FetchContext";

export const NorthAmerica = () => {
  const DataContext = useContext(MyContext);
  const { setCurrentContinent, currentContinent } = DataContext;
  useEffect(() => {
    setCurrentContinent("North America");
  }, []);

  return (
    <div className="image_carousel">
      <VerContinentToolbar continent={"North America"} />

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
