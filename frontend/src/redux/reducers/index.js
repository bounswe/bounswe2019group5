import { combineReducers } from "redux";
import counter from "./counter";
import authentication from "./authentication";
import test from "./test";
import userInfo from "./userInfo";


const rootReducer = combineReducers({
  counter,
  authentication,
  test,
  userInfo,
});

export default rootReducer;
