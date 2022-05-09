import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase.utils";

// the actual value you want to access
export const UserContext = createContext({
  setCurrentUser: () => null, // method to set a value in the context
  currentUser: null, // the setted value
});

// the actual component, it allows any of its child component to access the values inside of its used-state
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  // only runs the function inside when component first mounts and will check for user authentication
  useEffect(() => {
    // OBSERVER PATTERN
    const unsubscribe = onAuthStateChangedListener((user) => {
      // for googlePopup
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
