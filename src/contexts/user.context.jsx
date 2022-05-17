import { createContext, useReducer, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase.utils";
import { createAction } from "../utils/reducer.utils";

// the actual value you want to access
export const UserContext = createContext({
  setCurrentUser: () => null, // method to set a value in the context
  currentUser: null, // the setted value
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload }; // return the object but modify the currentUser
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

// the actual component, it allows any of its child component to access the values inside of its used-state
export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) =>
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));

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
