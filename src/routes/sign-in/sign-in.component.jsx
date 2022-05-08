import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/utils.firebase";

const SignIn = () => {
  const logGoogleUser = async () => {
    // const response = await signInWithGooglePopup();
    // console.log(response); // we want the user-object from the response

    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <div>sign in</div>
      <button onClick={logGoogleUser}>sign in with google popup</button>
    </div>
  );
};

export default SignIn;
