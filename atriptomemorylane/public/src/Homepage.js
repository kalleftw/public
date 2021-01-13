import React from "react";
import {
   MDBMask,
  MDBRow,
  MDBCol,
  MDBView,
  MDBContainer,
} from "mdbreact";
import "./Homepage.css";

class Homepage extends React.Component {

  render() {
   
    return (
      <div id="minimalistintro">
        <MDBView src="https://mdbootstrap.com/img/Photos/Others/img%20%2848%29.jpg">
          <MDBMask className="rgba-black-light" />
          <MDBContainer
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100%", width: "100%", paddingTop: "17rem" }}
          >
            <MDBRow>
              <MDBCol md="12" className="mb-4 white-text text-center">
                <h1 className="h1-reponsive white-text text-uppercase font-weight-bold mb-0 pt-md-5 pt-5 ">
                  A trip down memorylane
                </h1>
                <hr className="hr-light my-4" />
                <h5 className="text-uppercase mb-4 white-text ">
                  <strong>
                    Travel reviews, for backpackers, by backpackers
                  </strong>
                </h5>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBView>
      </div>
    );
  }
}

export default Homepage;
