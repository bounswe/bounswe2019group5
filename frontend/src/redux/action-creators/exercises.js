import {
  EXERCISE_REQUESTED,
  EXERCISE,
  SEARCH_TEST,
} from "../actions";

import { get_exercise as get_exercise_api } from "../../api/exercises";
import { search_test as search_test_api } from  "../../api/exercises";

export const get_exercise = (token, id) => {
  return dispatch => {
    dispatch({
      type: EXERCISE_REQUESTED,
    });
    get_exercise_api(token, id)
      .then(exercise => {
        dispatch({
          type: EXERCISE,
          exercise,
        });
      });
  };
};

export const search_test = (token, input, language, type) => {
  return dispatch =>  {
    search_test_api(token, input, "", language, type).then(data => {
      dispatch({
        type: SEARCH_TEST,
        searchedTest: data,
        with: "K",
        exercise_type: type   
      });
    });
    search_test_api(token, "", input, language, type).then(data => {
      dispatch({
        type: SEARCH_TEST,
        searchedTest: data,
        with: "T",
        exercise_type: type   
      });
    });
  };
};
