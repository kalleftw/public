import React from "react";
import mapboxgl from "mapbox-gl";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "../css/Map.css";
mapboxgl.accessToken =
  "pk.eyJ1IjoiamFubmVtYW5uZW4iLCJhIjoiY2s5dHB0MXliMDY0ejNsczFhcjBsNW4zMCJ9.J_ERDqrQT4i-YE_ErHwaWA";

  /**
   * Map component
   */
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 8,
      lat: 34,
      zoom: 12,
    };
  }

  /**
   * Async call to update state with coords
   */
  async componentDidMount() {
    this.getAPI()

  }

  /**
   * REST to fetch coords
   */
  async getAPI() {
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: this.props.currentCity.city });
    this.setState({
      lng: results[0].x,
      lat: results[0].y
    })

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });
    map.resize()
  }

  render() {
    return (
      <div className="mapContainer">
        <div ref={(el) => (this.mapContainer = el)}  />
      </div>
    );
  }
}

export default Map;
