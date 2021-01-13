import "./Jumbotron.css";
import CountryList from "./country-list";
import StarRating from "react-bootstrap-star-rating";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../FetchContext";
import { MyContextCurrentCities } from "../cityContext";
import { MyContextCurrentCountry } from "../countryContext";
import Weather from "./weather";
import { Redirect } from "react-router-dom";
import Map from "./Map";
import CountryApi from "./CountryApi";
import { useHistory } from "react-router-dom";
import firebase from "../config";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBView,
  MDBIcon,
  MDBMask,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";

/**
 * Jumbotron which spawns when country is clicked on
 * @param {} props
 */

const JumbotronPage = () => {
  const DataContext = useContext(MyContext);
  const DataContextCities = useContext(MyContextCurrentCities);
  // const DataContextCountry = useContext(MyContextCurrentCountry)
  const apikey = "f271b818d90f436eaa9aa6611881aa14";
  const { currentContinent } = DataContext;
  const { currentCity } = DataContextCities;
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [celsius, setCelsius] = useState(null);
  const [temp_max, setTemp_max] = useState(null);
  const [temp_min, setTemp_min] = useState(null);
  const [desc, setDesc] = useState(null);
  const [large, setLarge] = useState(true);
  const [showImage, setShowImage] = useState("height");

  /**
   * To execute getWeather function
   */

  useEffect(() => {
    getWeather();

    return () => {
      if (window.performance.navigation.type == 1) {
        window.location.href = "/Memories";
      }
    };
  }, []);

  const fullImage = () => {
    console.log("hej");
    setLarge(!large);
    if (large === true) {
      setShowImage("");
    } else if (large === false) {
      setShowImage("height");
    }
  };

  const getWeather = async () => {
    const api_call = await fetch(
      `https://api.weatherbit.io/v2.0/current?city=${currentCity}&key=${apikey}
      `
    );

    const response = await api_call.json();
    setCity(response.data[0].city_name);
    setCountry(response.data[0].country_code);
    setTemp_max(response.data[0].app_temp);
  };

  return (
    <div>
    <MDBCard className="my-5 px-5 pb-5">
      <MDBCardBody className="text-center">
        <MDBRow>
          <MDBCol lg="4" md="12" className="mb-lg-0 mb-4" onClick={fullImage}>
            <MDBView className="rounded z-depth-2 mb-4" id={showImage}>
              <CountryList
                id="height"
                continent={currentContinent}
                displayFields={["imgUrl"]}
              />
            </MDBView>

              <a href="#!" className="pink-text">
                <h6 className="font-weight-bold mb-3">
                  <MDBIcon icon="map" className="pr-2" />
                  Adventure
                </h6>
              </a>
              <h4 className="font-weight-bold mb-3">
                <CountryList
                  continent={currentContinent}
                  displayFields={["dest1"]}
                />
              </h4>

              <p className="dark-grey-text">
                <CountryList
                  continent={currentContinent}
                  displayFields={["reviewDest1"]}
                />
              </p>
            </MDBCol>
            <MDBCol lg="4" md="12" className="mb-lg-0 mb-4" className="height">
              <MDBView className="rounded z-depth-2 mb-4">
                <Map id="map" currentCity={currentCity} />
              </MDBView>
              <a href="#!" className="deep-orange-text">
                <h6 className="font-weight-bold mb-3">
                  <MDBIcon icon="graduation-cap" className="pr-2" />
                  Geography
                </h6>
              </a>
              <h4 className="font-weight-bold mb-3">
                <CountryList
                  continent={currentContinent}
                  displayFields={["dest2"]}
                />
              </h4>

              <p className="dark-grey-text">
                <CountryList
                  continent={currentContinent}
                  displayFields={["reviewDest2"]}
                />
              </p>
            </MDBCol>
            <MDBCol lg="4" md="12" className="mb-lg-0 mb-4">
              <MDBView
                hover
                className="rounded z-depth-2 mb-4"
                waves
                id="height"
              >
                <div className="weather-top">
                  <Weather
                    id="weather-margin"
                    city={city}
                    country={country}
                    temp_celsius={celsius}
                    temp_max={temp_max}
                    temp_min={temp_min}
                    desc={desc}
                  />
                </div>
                <MDBMask overlay="white-slight" />
              </MDBView>
              <a href="#!" className="blue-text">
                <h6 className="font-weight-bold mb-3">
                  <MDBIcon icon="rain" className="pr-2" />
                  Weather
                </h6>
              </a>
              <h4 className="font-weight-bold mb-3">
                <CountryList
                  continent={currentContinent}
                  displayFields={["dest3"]}
                />
              </h4>

              <p className="dark-grey-text">
                <CountryList
                  continent={currentContinent}
                  displayFields={["reviewDest3"]}
                />
              </p>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
        
      </MDBCard>
      <div className="beer">
      <p className="dark-grey-text">
          <CountryList
            continent={currentContinent}
            displayFields={["beerPrice"]}
          />
        </p>
        </div>
        <div className="recommended">
        
        <CountryList
          continent={currentContinent}
          displayFields={["recommended"]}
        />
        </div>
        <div className="food">
        <p className="dark-grey-text">
          <CountryList
            continent={currentContinent}
            displayFields={["foodPrice"]}
          />
        </p>

        </div>

        <div className="hostel">
        <p className="dark-grey-text">
          <CountryList
            continent={currentContinent}
            displayFields={["hostelPrice"]}
          />
        </p>

        </div>
    </div>
  );
};

export default JumbotronPage;
