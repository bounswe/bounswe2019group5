import {
    PROF_TEST_REQUESTED,
    PROF_TEST,
    TEST_RESULT_REQUESTED,
    TEST_RESULT,
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
      }
    
    case PROF_TEST:
      return {
        ...state,
        loading: false,
        isFinished: false,
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
            isFinished: true,
            testResult: action.testResult,
        }

    default:
      return state
  }
  
}
