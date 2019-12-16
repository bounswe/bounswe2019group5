import {
  EXERCISE_REQUESTED,
  EXERCISE,
  TEST_RESULT_REQUESTED,
  TEST_RESULT,
  SEARCH_TEST,
} from "../actions";

const initialState = {
  loading: false,
  exercise: null,
  isFinished: false,
  testResult: null,
  searchedTest: {
    grammar: null,
    vocabulary: null,
    listening: null,
    reading: null,
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EXERCISE_REQUESTED:
      return {
        ...state,
        loading: true,
        isFinished: false,
        exercise: null,
        testResult: null,
      };

    case EXERCISE:
      return {
        ...state,
        loading: false,
        exercise: action.exercise,
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

    case SEARCH_TEST:
      return {
        ...state,
        searchedTest: {...state.searchedTest, [action.exercise_type]: action.searchedTest}
      }

    default:
      return state;
  }
};
