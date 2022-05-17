import { USER_ACTION_TYPES } from "./user.types";

export const USER_INITIAL_STATE = {
  currentUser: null,
};

// here we neep to manually-provide the state with initial state as it doesn't have access to the useReduce-Hook
export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload }; // return the object but modify the currentUser
    default:
      return state; // here we don't return an error, instead -> we return the (current state-object) as this means that the action is not for this particular reducer
    // the object is the same in memory, so it won't result reRendering
  }
};
