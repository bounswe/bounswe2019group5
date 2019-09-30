import { combineReducers } from "redux";
import counter from "./counter";
import authentication from "./authentication";
import signin from "./signin";

const rootReducer = combineReducers({
  counter,
  authentication,
  signin
});

export default rootReducer;
