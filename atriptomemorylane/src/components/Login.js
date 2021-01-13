import React, { Component } from "react";
import "../css/Login.css";
import firebase from ".././config";


/**
 * Log in class
 */
class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: "",
      password: "",
      title: "Log in",
      authState: "Not logged in",
    };
  }

  /**
   * Method which always runs when component is used
   * Checks if user is logged in or not
   */
  componentDidMount = (e) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        
        if(user.email === "kbekberg@gmail.com") {
          
        }
        
        this.setState({
          authState: user.email + " is already logged in",
        });
      }
    });
  };

  /**
   * Method which signs user out,
   * passing auth, singuout to firebase,
   * return promise och conf
   */
  signOutUser = (e) => {
    
    firebase
      .auth()
      .signOut()
      .then(function (user) {
        
      })
      .catch(function (error) {
        
      });
  };

  /**
   * Method which handles change in fields
   * @param {*} e
   */
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * Method which signs user in,
   * auth to firebase
   * @param {String} e
   */
  login(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {})
      .catch((error) => {
        
        this.setState({authState: error.message})

        
      });
  }

  /**
   * Method which creates a new user with email and pw
   * @param {String} e
   */
  

  render() {
    return (
      <form
        class="text-center border border-light p-5"
        action="#!"
        className="main"
      >
        <p class="h4 mb-4">Sign in</p>

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

        <button class="btn btn-info btn-block my-4" type="submit" onClick={this.login}>
          Sign in
        </button>
        <button class="btn btn-info btn-block my-4" type="submit" onClick={this.signOutUser}>
          Sign out
        </button>

        <p>
          Not a member?
          <a id="registerText" href="/Signup"> Register</a>
          
        </p>
        <br>
        </br>
        {this.state.authState}
      </form>
    );
  }
}

export default Login;

