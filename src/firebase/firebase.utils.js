import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBUUkKhYUz7GsF4gk4F--HD-SMbFI91AUI",
  authDomain: "new-crown-674fa.firebaseapp.com",
  databaseURL: "https://new-crown-674fa.firebaseio.com",
  projectId: "new-crown-674fa",
  storageBucket: "new-crown-674fa.appspot.com",
  messagingSenderId: "76696944105",
  appId: "1:76696944105:web:2601db0ef397fb55d99f78",
  measurementId: "G-V3LD3Z0Z8R",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
