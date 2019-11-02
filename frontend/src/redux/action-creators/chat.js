import {
    SEND_MESSAGE, GET_ALL_MESSAGES_REQUESTED, GET_ALL_MESSAGES, ACTIVATE_CHAT, DEACTIVATE_CHAT,
} from "../actions";
  
  import { send_message as send_message_api  } from "../../api/chat";
  import { get_all_messages as get_all_messages_api  } from "../../api/chat";
  
export const send_message = (token, to, message) => {
    return dispatch => {
        console.log("sdfsadfasdfsadfas");
        send_message_api(token, to, message)
        .then(messages => {
            dispatch({
                type: SEND_MESSAGE,
                messages,
            });
        });
    };
}

export const get_all_messages = (token, to) => {
    return dispatch => {
        dispatch({
            type: GET_ALL_MESSAGES_REQUESTED,
            to,
        });
        get_all_messages_api(token, to)
        .then(messages => {
            dispatch({
                type: GET_ALL_MESSAGES,
                messages,
            });
        });
    };
}

export const activate_chat = (token, to) => {
    return dispatch => {
        dispatch({
            type: ACTIVATE_CHAT,
            to,
        });

        dispatch({
            type: GET_ALL_MESSAGES_REQUESTED,
            to,
        });
        get_all_messages_api(token, to)
        .then(messages => {
            dispatch({
                type: GET_ALL_MESSAGES,
                messages,
            });
        });
    };
}

export const deactivate_chat = () => {
    return dispatch => {
        dispatch({
            type: DEACTIVATE_CHAT,
        });
    };
}