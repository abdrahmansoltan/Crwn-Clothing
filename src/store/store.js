import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// they run before actions hit the reducers
// const middleWares = [process.env.NODE_ENV === "development" && logger].filter(
//   Boolean
// );
const middleWares = [logger].filter(Boolean);

// generate composed enhancers that apply middlewares 
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
