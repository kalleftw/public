import {
  signInWithEmailAndPassword,
  signOutFirebase,
  isAuthenticated,
} from "../../config";


import firebase from "../../config";

describe("Firebase Util Test Suite", () => {
  beforeAll(async () => {
    jest.setTimeout(1000);
    await init();
  });

  beforeEach(async () => {
    await signOutFirebase();
  });
});

test("signInWithEmailAndPassword should throw error with wrong credential", async () => {
  let error = "";
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword("kbekberg@gmail.com", "fds");
  } catch (err) {
    error = err.toString();
  }

  expect(error).toEqual(
    "Error: The password is invalid or the user does not have a password."
  );
});

test("signInWithEmailAndPassword should not throw error with correct credential", async () => {
  let error = "";
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword("kbekberg@gmail.com", "test123");
  } catch (err) {
    error = err.toString();
  }
  expect(error).toEqual("");
});

test("createUser with < 6 letter password should throw error", async () => {
  let error = "";
  try {
    await firebase.auth().createUserWithEmailAndPassword("hej@hej.se", "123");
  } catch (err) {
    error = err.toString();
  }
  expect(error).toEqual("Error: Password should be at least 6 characters");
});


test("create new user", async () => {
  let error = "";
  let email = "test@test" + Math.random() + ".se"
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, "123456");
    await firebase.auth().signInWithEmailAndPassword(email, "123456");
  } catch (err) {
    error = err.toString();
  }
  expect(error).toEqual("");
});


test("create duplicate user", async () => {
  let error = "";
  try {
    await firebase.auth().createUserWithEmailAndPassword("hejkissen@gmail.com", "123456");
    await firebase.auth().createUserWithEmailAndPassword("hejkissen@gmail.com", "123456");
    await firebase.auth().signInWithEmailAndPassword("hejkissen@gmail.com", "123456");
    firebase.auth().currentUser.delete()
  } catch (err) {
    error = err.toString();
  }
  expect(error).toEqual("Error: The email address is already in use by another account.");
});


test("isAuthenticated should return false if not authenticated", async () => {
  await firebase
    .auth()
    .signInWithEmailAndPassword("kalleftw@gmail.com", "kallex");
  expect(firebase.auth().currentUser.emailVerified).toBe(false);
});

