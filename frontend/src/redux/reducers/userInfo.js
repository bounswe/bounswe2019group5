import {
  SET_SELECTED_LANGUAGE,
  USER_PROFILE_CLEAR,
  SET_TOKEN,
  USER_PROFILE_REQUESTED,
  USER_PROFILE_SET,
  OTHER_USER_PROFILE_SET,
  OTHER_USER_PROFILE_REQUESTED,
  SET_TEST_RESULT,
  SET_USER_PROGRESS,
} from "../actions";

const initialState = {

  selectedLanguage: null,
  token: null,
  loadingS: false,
  loadingO: false,
  overallRatingS: null,
  overallRatingO: null,
  userProfile: null,
  otherUserProfile: null,
  progress: {
    english: {
      general: {
        number_of_test_completed: null,
        number_of_test: null,
        completed_exercise_current_level: null,
        exercise_in_current_level: null
      },
      grammar: {
        number_of_test_completed: null,
        number_of_test: null,
        completed_exercise_current_level: null,
        exercise_in_current_level: null
      },
      reading: {
        number_of_test_completed: null,
        number_of_test: null,
        completed_exercise_current_level: null,
        exercise_in_current_level: null
      },
      listening: {
        number_of_test_completed: null,
        number_of_test: null,
        completed_exercise_current_level: null,
        exercise_in_current_level: null
      },
      vocabulary: {
        number_of_test_completed: null,
        number_of_test: null,
        completed_exercise_current_level: null,
        exercise_in_current_level: null
      },
    },
    turkish: {
      general: {
        number_of_test_completed: null,
        number_of_test: null,
        completed_exercise_current_level: null,
        exercise_in_current_level: null
      },
      grammar: {
        number_of_test_completed: null,
        number_of_test: null,
        completed_exercise_current_level: null,
        exercise_in_current_level: null
      },
      reading: {
        number_of_test_completed: null,
        number_of_test: null,
        completed_exercise_current_level: null,
        exercise_in_current_level: null
      },
      listening: {
        number_of_test_completed: null,
        number_of_test: null,
        completed_exercise_current_level: null,
        exercise_in_current_level: null
      },
      vocabulary: {
        number_of_test_completed: null,
        number_of_test: null,
        completed_exercise_current_level: null,
        exercise_in_current_level: null
      },
    },
    german: {
      general: {
        number_of_test_completed: null,
        number_of_test: null,
        completed_exercise_current_level: null,
        exercise_in_current_level: null
      },
      grammar: {
        number_of_test_completed: null,
        number_of_test: null,
        completed_exercise_current_level: null,
        exercise_in_current_level: null
      },
      reading: {
        number_of_test_completed: null,
        number_of_test: null,
        completed_exercise_current_level: null,
        exercise_in_current_level: null
      },
      listening: {
        number_of_test_completed: null,
        number_of_test: null,
        completed_exercise_current_level: null,
        exercise_in_current_level: null
      },
      vocabulary: {
        number_of_test_completed: null,
        number_of_test: null,
        completed_exercise_current_level: null,
        exercise_in_current_level: null
      },
    },
  },  
  testResult: {
    english: {
      general: {
        number_of_true: null,
        umber_of_false: null
      },
      grammar: {
        number_of_true: null,
        umber_of_false: null
      },
      reading: {
        number_of_true: null,
        umber_of_false: null
      },
      listening: {
        number_of_true: null,
        umber_of_false: null
      },
      vocabulary: {
        number_of_true: null,
        umber_of_false: null
      },
    },
    turkish: {
      general: {
        number_of_true: null,
        umber_of_false: null
      },
      grammar: {
        number_of_true: null,
        umber_of_false: null
      },
      reading: {
        number_of_true: null,
        umber_of_false: null
      },
      listening: {
        number_of_true: null,
        umber_of_false: null
      },
      vocabulary: {
        number_of_true: null,
        umber_of_false: null
      },
    },
    german: {
      general: {
        number_of_true: null,
        umber_of_false: null
      },
      grammar: {
        number_of_true: null,
        umber_of_false: null
      },
      reading: {
        number_of_true: null,
        umber_of_false: null
      },
      listening: {
        number_of_true: null,
        umber_of_false: null
      },
      vocabulary: {
        number_of_true: null,
        umber_of_false: null
      },
    },
  },

};

export default (state = initialState, action) => {

  switch (action.type) {

    case SET_SELECTED_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.selectedLanguage,
      };

    case USER_PROFILE_CLEAR:
      return {
        ...state,
        ...initialState,

        selectedLanguage: state.selectedLanguage,    // We don't want to clear selected lang
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
        username: action.username,
      };
    case USER_PROFILE_REQUESTED:
      return {
        ...state,
        loadingS: !state.userProfile,
      }
    case USER_PROFILE_SET:
      return {
        ...state,
        userProfile: action.profile,
        overallRatingS: action.overall_rating,
        loadingS: false,
      };

    case OTHER_USER_PROFILE_REQUESTED:
      return {
        ...state,
        loadingO: !state.otherUserProfile,
      };
    case OTHER_USER_PROFILE_SET:
      return {
        ...state,
        otherUserProfile: action.profile,
        overallRatingO: action.overall_rating,
        loadingO: false,
      };

    case SET_TEST_RESULT:
      return {
        ...state,
        testResult: {...state.testResult, [action.language]: {...state.testResult[action.language], [action.exercise_type]: action.test_result}},
        loadingS: false,
      };

    case SET_USER_PROGRESS:
      return {
        ...state,
        progress: {...state.progress, [action.prog_language]: {...state.progress[action.prog_language], [action.exercise_type] : action.progress}},    
        loadingS: false,   
      };

    default:
      return state;
  }

};
