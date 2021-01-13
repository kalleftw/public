import firebase from "../../config";
import "firebase/firestore";

test("create collection", async () => {
  let error = "";
  try {
    await firebase.firestore().collection("test").doc("test").set({
      testvalue: "1",
    });
  } catch (err) {
    error = err.toString();
  }
  expect(error).toEqual("");
});

test("read from collection", async () => {
  let error = "";
  let string = "";
  try {
    await firebase
      .firestore()
      firebase.firestore().doc(`test/${test}`)
      .get()
      .then((doc) => {
        console.log(doc)
        expect(doc).toEqual("123");

      });
  } catch (err) {
    error = err.toString();
  }
  expect(string).toEqual("123");
});
