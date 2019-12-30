import { GET_RECOMMENDATIONS, GET_RECOMMENDATIONS_REQUESTED, SET_RECOMMENDATION_LANGUAGE } from "../actions";

import { get_user_recommendations as get_recommendations_api } from "../../api/recommendation";

export const get_user_recommendations = (token, language) => {
  return dispatch => {
    dispatch({
      type: GET_RECOMMENDATIONS_REQUESTED
    });
    get_recommendations_api(token, language).then(response => {
      dispatch({
        type: GET_RECOMMENDATIONS,
        recommended_users: response
      });
    });
  };
};

export const set_recommendation_language = (language) => {
    return dispatch => {
        dispatch({
          type: SET_RECOMMENDATION_LANGUAGE,
          language: language
        });
        
      };
}