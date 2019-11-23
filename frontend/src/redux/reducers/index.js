import { combineReducers } from "redux";
import authentication from "./authentication";
import test from "./test";
import userInfo from "./userInfo";
import exercises from "./exercises";
import chat from "./chat";
import recommendation from "./recommendation";
import writinglist from "./writinglist";

const rootReducer = combineReducers({
  authentication,
  test,
  userInfo,
  exercises,
  chat,
  recommendation,
  writinglist,
});

export default rootReducer;
