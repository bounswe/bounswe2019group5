import { VOCABULARY_TEST_REQUESTED, VOCABULARY_TEST } from "../actions";

import { get_vocabulary_test as get_vocabulary_test_api } from "../../api/exercises";

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
