import { createAction } from "../../utils/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

// this function creates an action that will be dispatched from root-reducer
export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
