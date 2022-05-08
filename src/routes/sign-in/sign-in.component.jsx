import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase.utils";

const SignIn = () => {
  // using Popup
  const logGoogleUser = async () => {
    // getting user from googleSignIn
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <div>sign in Page</div>
      <button onClick={logGoogleUser}>sign in with google popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
