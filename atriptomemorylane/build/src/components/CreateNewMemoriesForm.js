import { useForm } from "react-hook-form";
import React, { useState, useEffect, useContext } from "react";
import { storage } from "../config";
import firebase from ".././config";
import { FaStar, FaCopy } from "react-icons/fa";
import "./StarRating.css";
import Form from "react-bootstrap/Form";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdbreact";

import "./CreateMemories.css";

/**
 * Method which sets the state of each continent
 */
const AddCountryForm = () => {
  const [continent, setContinent] = useState("");
  const [revName, setRevName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [dest1, setDest1] = useState("");
  const [dest2, setDest2] = useState("");
  const [dest3, setDest3] = useState("");
  const [beerPrice, setBeerPrice] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [hostelPrice, setHostelPrice] = useState("");
  const [review, setReview] = useState("");
  const [recommended, setRecommended] = useState("");
  const [url, setUrl] = useState([]);
  const [fileArray, setFileArray] = useState([]);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [reviewDest1, setReviewDest1] = useState(null);
  const [reviewDest2, setReviewDest2] = useState(null);
  const [reviewDest3, setReviewDest3] = useState(null);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.backgroundImage = `url("https://lostintentions.com/wp-content/uploads/2016/09/youtube-banner2.jpg")`;

    document.body.style.backgroundRrepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user.uid);
      }
    });
  }, []);

  const toggle = () => setOpen(!dropdownOpen);

  /**
   * Function which is called when the form is submitted,
   * Setting the info in the form to its state
   * @param {*} e
   */
  function onSubmit(e) {
    firebase
      .firestore()
      .collection(continent)
      .doc(revName)
      .set({
        continent,
        revName,
        countryName,
        dest1,
        reviewDest1,
        dest2,
        reviewDest2,
        dest3,
        reviewDest3,
        beerPrice,
        foodPrice,
        hostelPrice,
        review,
        url,
        rating,
        user,
        recommended,
      })
      .then(() => {
        setContinent("");
        setRevName("");
        setCountryName("");
        setDest1("");
        setReviewDest1("");
        setDest2("");
        setReviewDest2("");
        setDest3("");
        setReviewDest3("");
        setBeerPrice("");
        setFoodPrice("");
        setHostelPrice("");
        setReview("");
        setUrl("");
        setRating("");
        setUser("");
        setRecommended("");
      });
  }

  /**
   * Method which targets image
   * @param {} e
   */
  const handleChange = (e) => {
    setFileArray(e.target.files);
  };

  /**
   * Method which uploads image to firebase
   * @param {*} e
   */
  const handleUpload = (e) => {
    e.preventDefault();

    if (fileArray.length > 1) {
      for (let i = 0; i < fileArray.length; i++) {
        const uploadTask = storage
          .ref(`images/${fileArray[i].name}`)
          .put(fileArray[i]);

        uploadTask.on(
          "state_changed",

          () => {
            storage
              .ref("images")
              .child(fileArray[i].name)
              .getDownloadURL()
              .then((res) => {
                setUrl([...url, res]);
              });
          }
        );
      }
    }
    if (fileArray.length === 1) {
      const uploadTask = storage
        .ref(`images/${fileArray[0].name}`)
        .put(fileArray[0]);
      uploadTask.on(
        "state_changed",

        () => {
          storage
            .ref("images")
            .child(fileArray[0].name)
            .getDownloadURL()
            .then((res) => {
              setUrl([res]);
            });
        }
      );
    }
  };

  const { register, handleSubmit, errors } = useForm();

  return (
    <div className="wrapperContainer">
      <form class="form-style-9" onSubmit={handleSubmit(onSubmit)}>
        <ul>
          <li>
            <input
              type="text"
              name="field1"
              class="field-style field-split align-left"
              placeholder="Review Name"
              value={revName}
              onChange={(e) => setRevName(e.currentTarget.value)}
              ref={register({ required: true })}
            />
            <input
              type="text"
              name="field2"
              class="field-style field-split align-right"
              placeholder="Country"
              value={countryName}
              onChange={(e) => setCountryName(e.currentTarget.value)}
              ref={register({ required: true })}
            />
          </li>

          <li>
            <select
              type="text"
              name="field3"
              class="field-style field-full align-none"
              placeholder="Continent"
              onClick={(e) => setContinent(e.target.value)}
              ref={register({ required: true })}
            >
              <option value="Select">Please select a continent</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Oceania">Oceania</option>
            </select>
          </li>
          <li>
            <input
              type="text"
              name="field3"
              class="field-style field-full align-none"
              placeholder="Destination one"
              value={dest1}
              onChange={(e) => setDest1(e.currentTarget.value)}
              ref={register({ required: true })}
            />
          </li>
          <li>
            <textarea
              name="field5"
              class="field-style"
              placeholder="Destination one review"
              ref={register({ required: true, min: 200 })}
              value={reviewDest1}
              onChange={(e) => setReviewDest1(e.currentTarget.value)}
            ></textarea>
          </li>

          {/* ///////// */}

          <li>
            <input
              type="text"
              name="field3"
              class="field-style field-full align-none"
              placeholder="Destination Two"
              ref={register}
              value={dest2}
              onChange={(e) => setDest2(e.currentTarget.value)}
            />
          </li>
          <li>
            <textarea
              name="field5"
              class="field-style"
              placeholder="Destination two review"
              ref={register({ required: false, min: 200 })}
              value={reviewDest2}
              onChange={(e) => setReviewDest2(e.currentTarget.value)}
            ></textarea>
          </li>

          <li>
            <input
              type="text"
              name="field3"
              class="field-style field-full align-none"
              placeholder="Destination Three"
              ref={register}
              value={dest3}
              onChange={(e) => setDest3(e.currentTarget.value)}
            />
          </li>
          <li>
            <textarea
              name="field5"
              class="field-style"
              placeholder="Destination Three review"
              ref={register({ required: false, min: 200 })}
              value={reviewDest3}
              onChange={(e) => setReviewDest3(e.currentTarget.value)}
            ></textarea>
          </li>

          {/* //////////////////////// */}

          <li>
            <input
              type="text"
              name="field1"
              class="field-style field-full align-none"
              placeholder="Beer price"
              ref={register({ required: true })}
              value={beerPrice}
              onChange={(e) => setBeerPrice(e.currentTarget.value)}
            />
          </li>

          <li>
            <input
              type="text"
              name="field1"
              class="field-style field-full align-none"
              placeholder="Food Price"
              value={foodPrice}
              onChange={(e) => setFoodPrice(e.currentTarget.value)}
              ref={register({ required: true })}
            />
          </li>

          <li>
            <input
              type="text"
              name="field1"
              class="field-style field-full align-none"
              placeholder="Hostel Price"
              ref={register({ required: true })}
              value={hostelPrice}
              onChange={(e) => setHostelPrice(e.currentTarget.value)}
            />
          </li>
          <select
            name="Please select a value"
            ref={register({ required: true })}
            onClick={(e) => setRecommended(e.target.value)}
          >
            <option value="Yes">Would you recommend these destinations?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <li>
            <input type="submit" value="Send Message" />
          </li>
        </ul>

        <form class="md-form"></form>
        <div class="file-field">
          <div class="mb-4">
            <img
              src={url}
              class="rounded-circle z-depth-1-half avatar-pic"
              alt="No image uploaded :("
            />
          </div>
          <div class="d-flex justify-content-center">
            <div class="btn btn-mdb-color btn-rounded float-left">
              <span>
                {" "}
                <button onClick={handleUpload}>Click to Upload</button>
              </span>
              <input type="file" onChange={handleChange} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddCountryForm;
