import {
    SET_INPUT,
    SET_SEARCHED_USERS,
    SET_SEARCHED_EXERCISES,
} from "../actions";

import { search_users as search_users_api } from "../../api/search";
import { search_exercises as search_exercises_api } from "../../api/search";

export const set_input = input => {
    return dispatch => {
      dispatch({
        type: SET_INPUT,
        input
      });
    };
  };

export const set_searched_users = (token, language, username) => {
    return dispatch => {
        search_users_api(token, language, username).then(data => {
            dispatch({
                type: SET_SEARCHED_USERS,
                searched_users : data
            });
        });
    };
};

export const set_searched_exercises = (token, input, language, type) => {
    return dispatch => {
        search_exercises_api(token, input,null,language, type).then(data => {
            dispatch({
                type: SET_SEARCHED_EXERCISES,
                with: "searchedExercisesWT",
                searched_exercises : data
            });
        });
        search_exercises_api(token,null,input,language, type).then(data => {
            dispatch({
                type: SET_SEARCHED_EXERCISES,
                with: "searchedExercisesWK",
                searched_exercises : data
            });
        });
    };
};