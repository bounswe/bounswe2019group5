import { combineReducers } from "redux";
import authentication from "./authentication";
import test from "./test";
import userInfo from "./userInfo";
import exercises from "./exercises";

const rootReducer = combineReducers({
  authentication,
  test,
  userInfo,
  exercises
});

export default rootReducer;
