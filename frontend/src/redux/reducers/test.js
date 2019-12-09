import {
    PROF_TEST_REQUESTED,
    PROF_TEST,
    TEST_RESULT_REQUESTED,
    TEST_RESULT,
    PROF_TEST_CLEAR,
} from '../actions';

const initialState = {
  loading: false,
  profTest: null,
  isFinished: false,
  testResult: null,
};

export default (state = initialState, action) => {

  switch (action.type) {

    case PROF_TEST_REQUESTED:
      return {
        ...state,
        loading: true,
        isFinished: false,
        profTest: null,
        testResult: null,
      }
    
    case PROF_TEST:
      return {
        ...state,
        loading: false,
        profTest: action.profTest,
      }
    
    case TEST_RESULT_REQUESTED:
      return {
        ...state,
        loading: true,
        testResult: null,
      }
    
    case TEST_RESULT:
      return {
        ...state,
        loading: false,
        isFinished: action.testResult!=null,
        testResult: action.testResult,
      }
    
    case PROF_TEST_CLEAR:
        return {
          ...state,
          ...initialState,
        }

    default:
      return state
  }
  
}
