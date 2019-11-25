import {
  SET_SELECTED_LANGUAGE,
  USER_PROFILE_CLEAR,
  SET_TOKEN,
  USER_PROFILE_SET,
  OTHER_USER_PROFILE_SET,
  OTHER_USER_PROFILE_REQUESTED,
} from "../actions";

import { get_user_profile as get_user_profile_api } from "../../api/userInfo";
import { get_user_test_results as get_user_test_results_api } from "../../api/userInfo";

export const set_selected_language = selectedLanguage => {
  return dispatch => {
    dispatch({
      type: SET_SELECTED_LANGUAGE,
      selectedLanguage
    });
  };
};

export const clear_user_profile = () => {
  return dispatch => {
    dispatch({
      type: USER_PROFILE_CLEAR
    });
  };
};

export const set_token = (token, username) => {
  return dispatch => {
    dispatch({
      type: SET_TOKEN,
      token,
      username
    });
  };
};

export const set_user_profile = token => {
  function calculateRating(profile) {
    total_rate = 0;
    no_of_rates = profile.user_comments.length;
    for (rating of profile.user_comments) {
      rate = rate + rating.rate;
    }
    return [total_rate, no_of_rates];
  };
  return dispatch => {
    get_user_profile_api(token, "").then(profile => {
      dispatch({
        type: USER_PROFILE_SET,
        profile,
        overall_rating: calculateRating(profile)
      });
    });
    get_user_test_results_api(token, "english", "grammar","").then(english_grammar => {
      dispatch({
        type: SET_ENGLISH_GRAMMAR_RESULT,
        english_grammar,
      });
    });
    get_user_test_results_api(token, "english", "vocabulary","").then(english_voc => {
      dispatch({
        type: SET_ENGLISH_VOC_RESULT,
        english_voc,
      });
    });
    get_user_test_results_api(token, "english", "listening","").then(english_listen => {
      dispatch({
        type: SET_ENGLISH_LISTEN_RESULT,
        english_listen,
      });
    });
    get_user_test_results_api(token, "english", "reading","").then(english_read => {
      dispatch({
        type: SET_ENGLISH_READ_RESULT,
        english_read,
      });
    });
    get_user_test_results_api(token, "turkish", "grammar","").then(turkish_grammar => {
      dispatch({
        type: SET_TURKISH_GRAMMAR_RESULT,
        turkish_grammar,
      });
    });
    get_user_test_results_api(token, "turkish", "vocabulary","").then(turkish_voc => {
      dispatch({
        type: SET_TURKISH_VOC_RESULT,
        turkish_voc,
      });
    });
    get_user_test_results_api(token, "turkish", "listening","").then(turkish_listen => {
      dispatch({
        type: SET_TURKISH_LISTEN_RESULT,
        turkish_listen,
      });
    });
    get_user_test_results_api(token, "turkish", "reading","").then(turkish_read => {
      dispatch({
        type: SET_TURKISH_READ_RESULT,
        turkish_read,
      });
    });
    get_user_test_results_api(token, "german", "grammar","").then(german_grammar => {
      dispatch({
        type: SET_GERMAN_GRAMMAR_RESULT,
        german_grammar,
      });
    });
    get_user_test_results_api(token, "german", "vocabulary","").then(german_voc => {
      dispatch({
        type: SET_GERMAN_VOC_RESULT,
        german_voc,
      });
    });
    get_user_test_results_api(token, "german", "listening","").then(german_listen => {
      dispatch({
        type: SET_GERMAN_LISTEN_RESULT,
        german_listen,
      });
    });
    get_user_test_results_api(token, "german", "reading","").then(german_read => {
      dispatch({
        type: SET_GERMAN_READ_RESULT,
        german_read,
      });
    });
    get_user_test_results_api(token, "english", "","").then(english_general_test_result => {
      dispatch({
        type: SET_ENGLISH_GENERAL_TEST_RESULT,
        english_general_test_result,
      });
    });
    get_user_test_results_api(token, "turkish", "","").then(turkish_general_test_result => {
      dispatch({
        type: SET_TURKISH_GENERAL_TEST_RESULT,
        turkish_general_test_result,
      });
    });
    get_user_test_results_api(token, "german", "","").then(german_general_test_result => {
      dispatch({
        type: SET_GERMAN_GENERAL_TEST_RESULT,
        german_general_test_result,
      });
    });
  };
};

export const set_other_user_profile = (token, username) => {
  return dispatch => {
    dispatch({ type: OTHER_USER_PROFILE_REQUESTED });

    function calculateRating(profile) {
      total_rate = 0;
      no_of_rates = profile.user_comments.length;
      for (rating of profile.user_comments) {
        rate = rate + rating.rate;
      }
      return [total_rate, no_of_rates];
    }
      get_user_profile_api(token, username).then(profile => {
        dispatch({
          type: OTHER_USER_PROFILE_SET,
          profile,
          overall_rating: calculateRating(profile)
        });
      });
  };
};
