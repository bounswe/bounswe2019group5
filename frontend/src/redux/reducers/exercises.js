import {
  VOCABULARY_TEST_REQUESTED,
  VOCABULARY_TEST,
  GRAMMAR_TEST_REQUESTED,
  GRAMMAR_TEST,
  LISTENING_TEST_REQUESTED,
  LISTENING_TEST,
  TEST_RESULT_REQUESTED,
  TEST_RESULT
} from "../actions";

const initialState = {
  loading: false,
  vocabularyTest: null,
  grammarTest: null,
  listeningTest: null,
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

    case GRAMMAR_TEST_REQUESTED:
      return {
        ...state,
        loading: true,
        isFinished: false,
        grammarTest: null,
        testResult: null
      };

    case GRAMMAR_TEST:
      return {
        ...state,
        loading: false,
        grammarTest: action.grammarTest
      };

    case LISTENING_TEST_REQUESTED:
      return {
        ...state,
        loading: true,
        isFinished: false,
        listeningTest: null,
        testResult: null
      };

    case LISTENING_TEST:
      return {
        ...state,
        loading: false,
        listeningTest: action.listeningTest
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
        isFinished: action.testResult != null,
        testResult: action.testResult
      };

    default:
      return state;
  }
};
