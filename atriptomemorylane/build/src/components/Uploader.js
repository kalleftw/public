// import React, { Component, useState } from "react";
// import { render } from "react-dom";
// import { storage } from "../config";

// /**
//  * Method that sets the state of picture upload
//  * Isnt this already used?
//  */
// const ReactFireBaseFileUpload = () => {
//   const [image, setImage] = useState(null);
//   const [url, setUrl] = useState("");
//   const [progress, setProgress] = useState(0);

//   /**
//    * State handler
//    * @param {*} e 
//    */
//   const handleChange = (e) => {
//     if (e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleUpload = () => {
//     const uploadTask = storage.ref(`${image.name}`).put(image);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         setProgress(progress);
//       },
//       (error) => {
//         console.log(error);
//       },
//       () => {
//         storage
//           .ref("images")
//           .child(image.name)
//           .getDownloadURL()
//           .then((url) => {
//             setUrl(url);
//           });
//       }
//     );
//   };

//   console.log("image: ", image);
//   return (
//     <div>
//       <progress value={progress} max="100" />
//       <br />
//       <br />
//       <input type="file" onChange={handleChange} />
//       <button onClick={handleUpload}> Upload</button>
//       <br />
//       <img src={url} alt="dead-image" />
//       </div>

//   );
// };

// export default ReactFireBaseFileUpload;
