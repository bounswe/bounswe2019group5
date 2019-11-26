import {
  SET_SELECTED_LANGUAGE,
  USER_PROFILE_CLEAR,
  SET_TOKEN,
  USER_PROFILE_REQUESTED,
  USER_PROFILE_SET,
  OTHER_USER_PROFILE_SET,
  OTHER_USER_PROFILE_REQUESTED,
  SET_ENGLISH_GRAMMAR_RESULT,
  SET_ENGLISH_VOC_RESULT,
  SET_ENGLISH_LISTEN_RESULT,
  SET_ENGLISH_READ_RESULT,
  SET_TURKISH_GRAMMAR_RESULT,
  SET_TURKISH_VOC_RESULT,
  SET_TURKISH_LISTEN_RESULT,
  SET_TURKISH_READ_RESULT,
  SET_GERMAN_GRAMMAR_RESULT,
  SET_GERMAN_VOC_RESULT,
  SET_GERMAN_LISTEN_RESULT,
  SET_GERMAN_READ_RESULT,
  SET_ENGLISH_GENERAL_TEST_RESULT,
  SET_TURKISH_GENERAL_TEST_RESULT,
  SET_GERMAN_GENERAL_TEST_RESULT,
} from "../actions";

const initialState = {

  selectedLanguage: null,
  token: null,
  loading: false,
  overallRating: null,
  userProfile: null,
  otherUserProfile: null,
  english_grammar: {
    "number_of_true": 0,
    "number_of_false": 0
  },
  english_voc: {
    "number_of_true": 0,
    "number_of_false": 0
  },
  english_listen: {
    "number_of_true": 0,
    "number_of_false": 0
  },
  english_read: {
    "number_of_true": 0,
    "number_of_false": 0
  },
  turkish_grammar: {
    "number_of_true": 0,
    "number_of_false": 0
  },
  turkish_voc: {
    "number_of_true": 0,
    "number_of_false": 0
  },
  turkish_listen: {
    "number_of_true": 0,
    "number_of_false": 0
  },
  turkish_read: {
    "number_of_true": 0,
    "number_of_false": 0
  },
  german_grammar: {
    "number_of_true": 0,
    "number_of_false": 0
  },
  german_voc: {
    "number_of_true": 0,
    "number_of_false": 0
  },
  german_listen: {
    "number_of_true": 0,
    "number_of_false": 0
  },
  german_read: {
    "number_of_true": 0,
    "number_of_false": 0
  },
  english_general_test_result: {
    "number_of_true": 0,
    "number_of_false": 0
  },
  turkish_general_test_result: {
    "number_of_true": 0,
    "number_of_false": 0
  },
  german_general_test_result: {
    "number_of_true": 0,
    "number_of_false": 0
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
      return{
        ...state,
        loading:true,
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
    case SET_ENGLISH_GRAMMAR_RESULT:
        return {
          ...state,
          english_grammar: action.english_grammar,
          loading: false,
        };
    case SET_ENGLISH_VOC_RESULT:
        return {
          ...state,
          english_voc: action.english_voc,
          loading: false,
        };
    case SET_ENGLISH_LISTEN_RESULT:
        return {
          ...state,
          english_listen: action.english_listen,
          loading: false,
        };
    case SET_ENGLISH_READ_RESULT:
        return {
          ...state,
          english_read: action.english_read,
          loading: false,
        };
    case SET_TURKISH_GRAMMAR_RESULT:
        return {
          ...state,
          turkish_grammar: action.turkish_grammar,
          loading: false,
        };
    case SET_TURKISH_VOC_RESULT:
        return {
          ...state,
          turkish_voc: action.turkish_voc,
          loading: false,
        };
    case SET_TURKISH_LISTEN_RESULT:
        return {
          ...state,
          turkish_listen: action.turkish_listen,
          loading: false,
        };
    case SET_TURKISH_READ_RESULT:
        return {
          ...state,
          turkish_read: action.turkish_read,
          loading: false,
        };
    case SET_GERMAN_GRAMMAR_RESULT:
        return {
          ...state,
          german_grammar: action.german_grammar,
          loading: false,
        };
    case SET_GERMAN_VOC_RESULT:
        return {
          ...state,
          german_voc: action.german_voc,
          loading: false,
        };
    case SET_GERMAN_LISTEN_RESULT:
        return {
          ...state,
          german_listen: action.german_listen,
          loading: false,
        };
    case SET_GERMAN_READ_RESULT:
        return {
          ...state,
          german_read: action.german_read,
          loading: false,
        };
    case SET_ENGLISH_GENERAL_TEST_RESULT:
      return {
        ...state,
        english_general_test_result: action.english_general_test_result,
        loading: false,
      };
      case SET_TURKISH_GENERAL_TEST_RESULT:
          return {
            ...state,
            turkish_general_test_result: action.turkish_general_test_result,
            loading: false,
          };
    case SET_GERMAN_GENERAL_TEST_RESULT:
      return {
        ...state,
        german_general_test_result: action.german_general_test_result,
        loading: false,
      };
    default:
      return state;
  }
};
