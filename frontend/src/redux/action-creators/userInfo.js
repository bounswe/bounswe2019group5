import {
  SET_SELECTED_LANGUAGE,
  USER_PROFILE_CLEAR,
  SET_TOKEN,
  USER_PROFILE_REQUESTED,
  USER_PROFILE_SET,
  OTHER_USER_PROFILE_SET,
  OTHER_USER_PROFILE_REQUESTED,
  SET_TEST_RESULT,
  SET_USER_PROGRESS
} from "../actions";

import { get_user_profile as get_user_profile_api } from "../../api/userInfo";
import { get_user_test_results as get_user_test_results_api } from "../../api/userInfo";
import { get_user_progress as get_user_progress_api } from "../../api/userInfo";


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

  return dispatch => {
    dispatch({ type: USER_PROFILE_REQUESTED });

    function calculateRating(profile) {
      let total_rate = 0;
      let no_of_rates = profile.user_comments.length;
      for (let rating of profile.user_comments) {
        total_rate = total_rate + rating.rate;
      }
      return [total_rate, no_of_rates];
    }
    get_user_profile_api(token, "").then(profile => {
      dispatch({
        type: USER_PROFILE_SET,
        profile,
        overall_rating: calculateRating(profile)
      });

    });
    get_user_test_results_api(token, "english", "grammar", "").then(
      testresult => {
        dispatch({
          type: SET_TEST_RESULT,
          language: "english",
          exercise_type: "grammar",
          test_result: testresult
        });
      }
    );
    get_user_test_results_api(token, "english", "vocabulary", "").then(
      testresult => {
        dispatch({
          type: SET_TEST_RESULT,
          language: "english",
          exercise_type: "vocabulary",
          test_result: testresult
        });
      }
    );
    get_user_test_results_api(token, "english", "listening", "").then(
      testresult => {
        dispatch({
          type: SET_TEST_RESULT,
          language: "english",
          exercise_type: "listening",
          test_result: testresult
        });
      }
    );
    get_user_test_results_api(token, "english", "reading", "").then(
      testresult => {
        dispatch({
          type: SET_TEST_RESULT,
          language: "english",
          exercise_type: "reading",
          test_result: testresult
        });
      }
    );
    get_user_test_results_api(token, "turkish", "grammar", "").then(
      testresult => {
        dispatch({
          type: SET_TEST_RESULT,
          language: "turkish",
          exercise_type: "grammar",
          test_result: testresult
        });
      }
    );
    get_user_test_results_api(token, "turkish", "vocabulary", "").then(
      testresult => {
        dispatch({
          type: SET_TEST_RESULT,
          language: "turkish",
          exercise_type: "vocabulary",
          test_result: testresult
        });
      }
    );
    get_user_test_results_api(token, "turkish", "listening", "").then(
      testresult => {
        dispatch({
          type: SET_TEST_RESULT,
          language: "turkish",
          exercise_type: "listening",
          test_result: testresult
        });
      }
    );
    get_user_test_results_api(token, "turkish", "reading", "").then(
      testresult => {
        dispatch({
          type: SET_TEST_RESULT,
          language: "turkish",
          exercise_type: "reading",
          test_result: testresult
        });
      }
    );
    get_user_test_results_api(token, "german", "grammar", "").then(
      testresult => {
        dispatch({
          type: SET_TEST_RESULT,
          language: "german",
          exercise_type: "grammar",
          test_result: testresult
        });
      }
    );
    get_user_test_results_api(token, "german", "vocabulary", "").then(
      testresult => {
        dispatch({
          type: SET_TEST_RESULT,
          language: "german",
          exercise_type: "vocabulary",
          test_result: testresult
        });
      }
    );
    get_user_test_results_api(token, "german", "listening", "").then(
      testresult => {
        dispatch({
          type: SET_TEST_RESULT,
          language: "german",
          exercise_type: "listening",
          test_result: testresult
        });
      }
    );
    get_user_test_results_api(token, "german", "reading", "").then(
      testresult => {
        dispatch({
          type: SET_TEST_RESULT,
          language: "german",
          exercise_type: "reading",
          test_result: testresult
        });
      }
    );
    get_user_test_results_api(token, "english", "", "").then(
      testresult => {
        dispatch({
          type: SET_TEST_RESULT,
          language: "english",
          exercise_type:"general",
          test_result: testresult
        });
      }
    );
    get_user_test_results_api(token, "turkish", "", "").then(
      testresult => {
        dispatch({
          type: SET_TEST_RESULT,
          language: "turkish",
          exercise_type:"general",
          test_result: testresult
        });
      }
    );
    get_user_test_results_api(token, "german", "", "").then(
      testresult => {
        dispatch({
          type: SET_TEST_RESULT,
          language: "german",
          exercise_type:"general",
          test_result: testresult
        });
      }
    );

    get_user_progress_api(token, "english", "grammar").then(
      testprogress => {
      dispatch({
        type: SET_USER_PROGRESS,
        prog_language: "english",
        exercise_type: "grammar",
        progress: testprogress
      });
    });
    get_user_progress_api(token, "english", "vocabulary").then(
      testprogress => {
      dispatch({
        type: SET_USER_PROGRESS,
        prog_language: "english",
        exercise_type: "vocabulary",
        progress: testprogress
      });
    });
    get_user_progress_api(token, "english", "listening").then(
      testprogress => {
      dispatch({
        type: SET_USER_PROGRESS,
        prog_language: "english",
        exercise_type: "listening",
        progress: testprogress
      });
    });
    get_user_progress_api(token, "english", "reading").then(
      testprogress => {
      dispatch({
        type: SET_USER_PROGRESS,
        prog_language: "english",
        exercise_type: "reading",
        progress: testprogress
      });
    });
    get_user_progress_api(token, "english", null).then(
      testprogress => {
      dispatch({
        type: SET_USER_PROGRESS,
        prog_language: "english",
        exercise_type: "general",
        progress: testprogress
      });
    });
    get_user_progress_api(token, "turkish", "grammar").then(
      testprogress => {
      dispatch({
        type: SET_USER_PROGRESS,
        prog_language: "turkish",
        exercise_type: "grammar",
        progress: testprogress
      });
    });
    get_user_progress_api(token, "turkish", "listening").then(
      testprogress => {
      dispatch({
        type: SET_USER_PROGRESS,
        prog_language: "turkish",
        exercise_type: "listening",
        progress: testprogress
      });
    });
    get_user_progress_api(token, "turkish", "vocabulary").then(
      testprogress => {
      dispatch({
        type: SET_USER_PROGRESS,
        prog_language: "turkish",
        exercise_type: "vocabulary",
        progress: testprogress
      });
    });
    get_user_progress_api(token, "turkish", "reading").then(
      testprogress => {
      dispatch({
        type: SET_USER_PROGRESS,
        prog_language: "turkish",
        exercise_type: "reading",
        progress: testprogress
      });
    });
    get_user_progress_api(token, "turkish", null).then(
      testprogress => {
      dispatch({
        type: SET_USER_PROGRESS,
        prog_language: "turkish",
        exercise_type: "general",
        progress: testprogress
      });
    });
    get_user_progress_api(token, "german", "grammar").then(
      testprogress => {
      dispatch({
        type: SET_USER_PROGRESS,
        prog_language: "german",
        exercise_type: "grammar",
        progress: testprogress
      });
    });
    get_user_progress_api(token, "german", "vocabulary").then(
      testprogress => {
      dispatch({
        type: SET_USER_PROGRESS,
        prog_language: "german",
        exercise_type: "vocabulary",
        progress: testprogress
      });
    });    
    get_user_progress_api(token, "german", "listening").then(
      testprogress => {
      dispatch({
        type: SET_USER_PROGRESS,
        prog_language: "german",
        exercise_type: "listening",
        progress: testprogress
      });
    });
    get_user_progress_api(token, "german", "reading", ).then(
      testprogress => {
      dispatch({
        type: SET_USER_PROGRESS,
        prog_language: "german",
        exercise_type: "reading",
        progress: testprogress
      });
    });
    get_user_progress_api(token, "german", null).then(
      testprogress => {
      dispatch({
        type: SET_USER_PROGRESS,
        prog_language: "german",
        exercise_type: "general",
        progress: testprogress
      });
    });
  };
};

export const set_other_user_profile = (token, username) => {
  return dispatch => {
    dispatch({ type: OTHER_USER_PROFILE_REQUESTED });
    function calculateRating(profile) {
      let total_rate = 0;
      let no_of_rates = profile.user_comments.length;
      for (let rating of profile.user_comments) {
        total_rate = total_rate + rating.rate;
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

