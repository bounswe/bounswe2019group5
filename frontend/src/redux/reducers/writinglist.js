import {
    GET_WRITINGS_REQUESTED,
    GET_WRITINGS
} from "../actions";


const initialState = {
    loading: false,
    writings: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_WRITINGS_REQUESTED:
            return {
                ...state,
                loading: true,
                writings: []
            };

        case GET_WRITINGS:
            return {
                ...state,
                loading: false,
                writings: action.writings
            };

      default:
        return state;
    }
};