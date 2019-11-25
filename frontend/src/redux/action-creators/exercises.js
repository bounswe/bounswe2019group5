import {
  VOCABULARY_TEST_REQUESTED,
  VOCABULARY_TEST,
  GRAMMAR_TEST_REQUESTED,
  GRAMMAR_TEST,
  LISTENING_TEST_REQUESTED,
  LISTENING_TEST,
  SEARCH_TEST,
} from "../actions";

import { get_vocabulary_test as get_vocabulary_test_api } from "../../api/exercises";
import { get_grammar_test as get_grammar_test_api } from "../../api/exercises";
import { get_listening_test as get_listening_test_api } from "../../api/exercises";
import { search_test as search_test_api } from  "../../api/exercises";

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

export const get_grammar_test = (token, selectedLanguage) => {
  return dispatch => {
    dispatch({
      type: GRAMMAR_TEST_REQUESTED
    });
    get_grammar_test_api(token, selectedLanguage).then(response => {
      dispatch({
        type: GRAMMAR_TEST,
        grammarTest: response
      });
    });
  };
};

export const get_listening_test = (token, selectedLanguage) => {
  return dispatch => {
    dispatch({
      type: LISTENING_TEST_REQUESTED
    });
    get_listening_test_api(token, selectedLanguage).then(response => {
      dispatch({
        type: LISTENING_TEST,
        listeningTest: response
      });
    });
  };
};

export const search_test = (token, tag, keyword, language, type) => {
  return dispatch =>  {
    search_test_api(token, tag, keyword, language, type).then(response => {
      dispatch({
        type: SEARCH_TEST,
        searchedTest: response,    
      });
    });
  };
};
