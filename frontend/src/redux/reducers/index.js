import { combineReducers } from "redux";
import counter from "./counter";
import authentication from "./authentication";
import test from "./test";


const rootReducer = combineReducers({
  counter,
  authentication,
  test,
});

export default rootReducer;
