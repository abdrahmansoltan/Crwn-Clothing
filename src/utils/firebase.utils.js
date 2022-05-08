import { initializeApp } from "firebase/app"; // Importing the functions you need from the SDKs you need
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// // My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9IodBpoAIG5UM3ko313DDfaVVhocKuR4",
  authDomain: "crwn-clothing-db-6749f.firebaseapp.com",
  projectId: "crwn-clothing-db-6749f",
  storageBucket: "crwn-clothing-db-6749f.appspot.com",
  messagingSenderId: "37029458171",
  appId: "1:37029458171:web:68a72afcf39bc010bdc05e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inintializing google provider instance
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  promt: "select_account", // forcing the user to select google account
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

// -----------FireStore----------- //
// using getFireStore() to access the database
export const db = getFirestore();
// create users function
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // check if the user is in the database or not
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // setting a document for the new user
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef; // if user already exists
};
