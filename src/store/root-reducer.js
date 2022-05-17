import { combineReducers } from "redux"; // to create final reducer that combine multiple reducer

import { userReducer } from "./user/user.reducer";

// here we pass an object that has key of reducer's slice Name - value of function itself
export const rootReducer = combineReducers({
  user: userReducer,
});
