import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.componet";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component.jsx";

import { useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase.utils";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/user/user.action";

function App() {
  const dispatch = useDispatch();

  // only runs the function inside when component first mounts and will check for user authentication
  useEffect(() => {
    // OBSERVER PATTERN
    const unsubscribe = onAuthStateChangedListener((user) => {
      // for googlePopup
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
