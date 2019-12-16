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
  loading: false,
  overallRating: null,
  userProfile: null,
  otherUserProfile: null,
  progress: {
    english: {
      general: null,
      grammar: null,
      reading: null,
      listening: null,
      vocabulary: null,
    },
    turkish: {
      general: null,
      grammar: null,
      reading: null,
      listening: null,
      vocabulary: null,
    },
    german: {
      general: null,
      grammar: null,
      reading: null,
      listening: null,
      vocabulary: null,
    },
  },  
  testResult: {
    english: {
      general: null,
      grammar: null,
      reading: null,
      listening: null,
      vocabulary: null,
    },
    turkish: {
      general: null,
      grammar: null,
      reading: null,
      listening: null,
      vocabulary: null,
    },
    german: {
      general: null,
      grammar: null,
      reading: null,
      listening: null,
      vocabulary: null,
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
        loading: true,
      }
    case USER_PROFILE_SET:
      return {
        ...state,
        userProfile: action.profile,
        overallRating: action.overall_rating,
        loading: false,
      };

    case OTHER_USER_PROFILE_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case OTHER_USER_PROFILE_SET:
      return {
        ...state,
        otherUserProfile: action.profile,
        overallRating: action.overall_rating,
        loading: false,
      };

    case SET_TEST_RESULT:
      return {
        ...state,
        loading: false,
        testResult: {...testResult, [action.language]: {...testResult[action.language], [action.exercise_type]: action.test_result}},
      };

    case SET_USER_PROGRESS:
      return {
        ...state,
        loading: false,
        progress: {...progress, [action.prog_language]: {...progress[action.prog_language], [action.exercise_type] : action.progress}},       
      };

    default:
      return state;
  }

};
