import { isReactNative } from "@firebase/util";
import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase.utils";

const SignIn = () => {
  // when mounting we will get the response from the redirect that just happened
  useEffect(() => {
    (async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    })();
  }, []);

  const logGoogleUser = async () => {
    // const response = await signInWithGooglePopup();
    // console.log(response); // we want the user-object from the response

    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  const logGoogleRedirectUser = async () => {
    const { user } = await signInWithGoogleRedirect();
    console.log(user);
  };
  return (
    <div>
      <div>sign in Page</div>
      <button onClick={logGoogleUser}>sign in with google popup</button>
      <button onClick={logGoogleRedirectUser}>
        sign in with google redirect
      </button>
    </div>
  );
};

export default SignIn;
