import {
  VOCABULARY_TEST_REQUESTED,
  VOCABULARY_TEST,
  TEST_RESULT_REQUESTED,
  TEST_RESULT
} from "../actions";

const initialState = {
  loading: false,
  vocabularyTest: null,
  isFinished: false,
  testResult: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VOCABULARY_TEST_REQUESTED:
      return {
        ...state,
        loading: true,
        isFinished: false,
        vocabularyTest: null,
        testResult: null
      };

    case VOCABULARY_TEST:
      return {
        ...state,
        loading: false,
        vocabularyTest: action.vocabularyTest
      };

    case TEST_RESULT_REQUESTED:
      return {
        ...state,
        loading: true,
        testResult: null
      };

    case TEST_RESULT:
      return {
        ...state,
        loading: false,
        isFinished: true,
        testResult: action.testResult
      };

    default:
      return state;
  }
};
