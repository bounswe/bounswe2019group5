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
  english_grammar: null,
  english_voc: null,
  english_listen: null,
  english_read: null,
  turkish_grammar: null,
  turkish_voc: null,
  turkish_listen: null,
  turkish_read: null,
  german_grammar: null,
  german_voc: null,
  german_listen: null,
  german_read: null,
  english_general_test_result: null,
  turkish_general_test_result: null,
  german_general_test_result: null,
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
