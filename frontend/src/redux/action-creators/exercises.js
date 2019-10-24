import {
  VOCABULARY_TEST_REQUESTED,
  VOCABULARY_TEST,
  TEST_RESULT_REQUESTED,
  TEST_RESULT
} from "../actions";

import { get_vocabulary_test as get_vocabulary_test_api } from "../../api/exercises";
import { get_test_result as get_test_result_api } from "../../api/test";

export const get_vocabulary_test = (token, selectedLanguage) => {
  return dispatch => {
    dispatch({
      type: VOCABULARY_TEST_REQUESTED
    });
    get_vocabulary_test_api(token, selectedLanguage).then(response => {
      dispatch({
        type: VOCABULARY_TEST,
        vocabularyTest: response
      });
    });
  };
};
/*
export const get_test_result = (token, testId, answers) => {
  return dispatch => {
    dispatch({
      type: TEST_RESULT_REQUESTED
    });

    get_test_result_api(token, testId, answers).then(response => {
      dispatch({
        type: TEST_RESULT,
        testResult: response
      });
    });
  };
};
*/
