 import Carousel from "react-bootstrap/Carousel";
 import a1 from "../../assets/africa/a1.jpg";
 import a2 from "../../assets/africa/a2.jpg";
 import a3 from "../../assets/africa/a3.jpg";
 import "./Continents.css";
 import VerContinentToolbar from "../Navbar/VerContinentToolbar";
import React, { useContext, useEffect } from "react";
import { MyContext } from "../../FetchContext";

export const Africa = () => {
  const DataContext = useContext(MyContext);
  const { setCurrentContinent, currentContinent } = DataContext;
  useEffect(() => {
    setCurrentContinent("Africa");   
  }, []);

  return (
    <div className="image_carousel">
      <VerContinentToolbar continent={"Africa"} />

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
