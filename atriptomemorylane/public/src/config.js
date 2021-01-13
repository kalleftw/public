import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyDfW0RHAcwn9lwEQxZ22Q6FWWXuDQLEwzw",
  authDomain: "dv430-project.firebaseapp.com",
  databaseURL: "https://dv430-project.firebaseio.com",
  projectId: "dv430-project",
  storageBucket: "dv430-project.appspot.com",
  messagingSenderId: "401362161060",
  appId: "1:401362161060:web:5b639b855aed586f4c4531",
  measurementId: "G-C35RDWFSHY",
};

const fire = firebase.initializeApp(config);
const storage = firebase.storage();

export {storage, fire as default}
