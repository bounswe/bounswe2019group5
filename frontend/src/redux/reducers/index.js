import { combineReducers } from "redux";
import authentication from "./authentication";
import test from "./test";
import userInfo from "./userInfo";
import exercises from "./exercises";
import chat from "./chat";
import recommendation from "./recommendation";

const rootReducer = combineReducers({
  authentication,
  test,
  userInfo,
  exercises,
  chat,
  recommendation
});

export default rootReducer;
