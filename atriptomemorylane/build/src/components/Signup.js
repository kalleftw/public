import React, { Component } from "react";
import "./Login.css";
import firebase from ".././config";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

/**
 * Log in class
 */
class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: "",
      password: "",
      signupText: "Please enter an email address and a password."
    };
  }

  /**
   * Method which handles change in fields
   * @param {*} e
   */
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * Method which creates a new user with email and pw
   * @param {String} e
   */
  signup(e) {
    e.preventDefault();
    if (this.state.password.length < 6) {
      this.setState({signupText: 'Password too short. Minimum password length is: 6 characters'})
      
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((userData) => {
          firebase.auth().signOut();
          // Send Confirmation email
          if (userData && userData.user.emailVerified === false) {
            userData.user
              .sendEmailVerification()
              .then(() => {
                this.setState({signupText: "E-mail verification sent to " + this.state.email})
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            console.log("error");
          }
        });
    }
  }

  render() {
    return (
      <form
        class="text-center border border-light p-5"
        action="#!"
        className="main"
      >
        <p class="h4 mb-4">Sign up</p>

        <input
          type="email"
          value={this.state.email}
          onChange={this.handleChange}
          id="defaultLoginFormEmail"
          class="form-control mb-4"
          placeholder="E-mail"
          name="email"
        />

        <input
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          id="defaultLoginFormPassword"
          class="form-control mb-4"
          placeholder="Password"
          name="password"
        />

        <div>{this.state.signupText}</div>

        <button
          class="btn btn-info my-4 btn-block"
          type="submit"
          onClick={this.signup}
        >
          Sign up
        </button>

        <p>or sign up with:</p>

        <a href="#" class="mx-2" role="button">
          <i class="fab fa-facebook-f light-blue-text"></i>
        </a>
        <a href="#" class="mx-2" role="button">
          <i class="fab fa-twitter light-blue-text"></i>
        </a>
        <a href="#" class="mx-2" role="button">
          <i class="fab fa-linkedin-in light-blue-text"></i>
        </a>
        <a href="#" class="mx-2" role="button">
          <i class="fab fa-github light-blue-text"></i>
        </a>

        <hr />
      </form>
    );
  }
}

export default Signup;
