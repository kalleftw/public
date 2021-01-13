import React, { Component } from "react";
import "./App.css";
import MainNav from "./components/Navbar/Toolbar";
import { Europe } from "./components/Continents/Europe";
import { SouthAmerica } from "./components/Continents/SouthAmerica";
import { NorthAmerica } from "./components/Continents/NorthAmerica";
import { Africa } from "./components/Continents/Africa";
import { Oceania } from "./components/Continents/Oceania";
import { Asia } from "./components/Continents/Asia";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import JumbotronPage from "./components/Jumbotron";
// import SideBar from "./components/Navbar/VerToolbar";
import Memories from "./components/Memories";
import { DataProvider } from "./FetchContext";
import Homepage from "./Homepage";
import renderForm from "./components/CreateNewMemories";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "weather-icons/css/weather-icons.css";
import { DataProviderCities } from "./cityContext";
import CountryList from "./components/country-list";
import About from "./components/About";


class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (

        <DataProviderCities>
          <DataProvider>
            <Router>
              <div className="App">
                <MainNav />
                <Switch>
                  <Route exact path="/" component={JumbotronPageHome} />
                  <Route exact path="/Europe" component={Europe} />
                  <Route exact path="/SouthAmerica" component={SouthAmerica} />
                  <Route exact path="/NorthAmerica" component={NorthAmerica} />
                  <Route exact path="/Africa" component={Africa} />
                  <Route exact path="/Oceania" component={Oceania} />
                  <Route exact path="/Asia" component={Asia} />
                  <Route exact path="/Memories" component={Memories} />
                  <Route exact path="/Login" component={Login} />
                  <Route exact path="/Signup" component={Signup} />
                  <Route exact path="/Jumbotron" component={JumbotronPage} />
                  <Route exact path="/About" component={About} />
                  <Route
                    exact
                    path="/CreateNewMemories"
                    component={renderForm}
                  />
                  <Route exact path="/country-list" component={CountryList} />
                </Switch>
              </div>
            </Router>
          </DataProvider>
        </DataProviderCities>

    );
  }
}

const JumbotronPageHome = () => {
  return <Homepage></Homepage>;
};

export default App;
