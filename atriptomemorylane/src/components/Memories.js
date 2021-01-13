import React from "react";
import logo from ".././assets/angkor.jpg";
import barn from ".././assets/barn.jpg";
import burger from ".././assets/burger.jpg";
import Carousel from "react-bootstrap/Carousel";
import SideBar from "./Navbar/VerToolbar";
import "../css/Memories.css";

/**
 * Carousel for images
 */
const Memories = () => {
  return (
    <div className="image_carousel">
    <div className="memories_image_handler">
      <SideBar displayFields="Africa, Asia, Europe, NorthAmerica, Oceania, SouthAmerica" />

      <Carousel className="Carousel">
        <Carousel.Item>
          <img className="d-block w-100" src={logo} alt="First slide" />
          <Carousel.Caption>
            <h3>It's a hard life to be a stick insect. Imagine being a stick insect walking about in the jungle - you'd be forever going, 'Is that what's his name?</h3>
            <p>Karl Pilkington</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={barn} alt="Third slide" />

          <Carousel.Caption>
            <h3>Live with no excuses and travel with no regrets</h3>
            <p>Oscar Wilde</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={burger} alt="Third slide" />

          <Carousel.Caption>
            <h3>Not all those who wander are lost</h3>
            <p>J.R.R Tolkien</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
    </div>
  );
}



export default Memories;
