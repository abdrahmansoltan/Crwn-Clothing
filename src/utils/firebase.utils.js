import { initializeApp } from "firebase/app"; // Importing the functions you need from the SDKs you need
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword, // the native provider for sign-up
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

export const auth = getAuth(); // keep track of users inside the entire Application

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
// or it can be used with GoogleRedirect

// -----------FireStore----------- //
// using getFireStore() to access the database
export const db = getFirestore();

// GOOGLE SIGN-UP (CREATING A NEW USER )
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {} // to add displayName or other info if not added or null
) => {
  if (!userAuth) return;

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
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef; // if user already exists
};

// NATIVE SIGN-UP (CREATING A NEW USER )
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
