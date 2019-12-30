import {
    SET_SEARCHED_USERS,
    SET_SEARCHED_EXERCISES,
    SET_INPUT,
} from "../actions";

const initialState = {
    input: null,
    searchedUsers : null,
    searchedExercises : {searchedExercisesWT : null, //with tag=input
                         searchedExercisesWK : null} //with keyword=input
}
export default (state = initialState, action) => {

  switch (action.type) {

    case SET_INPUT:
        return{
            ...state,
            input : action.input
        }

    case SET_SEARCHED_EXERCISES:
        return {
            ...state,
            searchedExercises : {...state.searchedExercises, [action.with]: action.searched_exercises}
        };

    case SET_SEARCHED_USERS:
        return {
            ...state,
            searchedUsers : action.searched_users
        };

    default:
        return state;
    }
          
};
          