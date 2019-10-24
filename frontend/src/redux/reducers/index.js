import { combineReducers } from "redux";
import counter from "./counter";
import authentication from "./authentication";
import test from "./test";
import userInfo from "./userInfo";
import exercises from "./exercises";

const rootReducer = combineReducers({
  counter,
  authentication,
  test,
  userInfo,
  exercises
});

export default rootReducer;
