import {
    GET_RECOMMENDATIONS_REQUESTED,
    GET_RECOMMENDATIONS,
    SET_RECOMMENDATION_LANGUAGE
  } from "../actions";

const initialState = {
    loading: false,
    language: "english",
    recommended_users: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_RECOMMENDATIONS_REQUESTED:
            return {
                ...state,
                loading: true,
                recommended_users: []
            };

        case GET_RECOMMENDATIONS:
            return {
                ...state,
                loading: false,
                recommended_users: action.recommended_users
            };

        case SET_RECOMMENDATION_LANGUAGE:
            return {
                ...state,
                language: action.language
            };


  
      default:
        return state;
    }
};