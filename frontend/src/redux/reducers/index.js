import { combineReducers } from "redux";
import authentication from "./authentication";
import test from "./test";
import userInfo from "./userInfo";
import exercises from "./exercises";
import chat from "./chat";

const rootReducer = combineReducers({
  authentication,
  test,
  userInfo,
  exercises,
  chat
});

export default rootReducer;
