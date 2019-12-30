import {
    SEND_MESSAGE, GET_ALL_MESSAGES_REQUESTED, GET_ALL_MESSAGES, ACTIVATE_CHAT, DEACTIVATE_CHAT, CHAT_HISTORY_CLEAR, CHAT_HISTORY_REQUESTED, CHAT_HISTORY,
} from "../actions";
  
  import { send_message as send_message_api  } from "../../api/chat";
  import { get_all_messages as get_all_messages_api } from "../../api/chat";
  import { get_chat_history as get_chat_history_api } from "../../api/chat";
  
export const send_message = (token, to, message, messageTextBoxReference) => {
    return dispatch => {
        send_message_api(token, to, message, messageTextBoxReference)
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

export const clear_chat_history = () => {
    return dispatch => {
        dispatch({
            type: CHAT_HISTORY_CLEAR,
        });
    };
}

export const get_chat_history = (token, username) => {
    return dispatch => {
        dispatch({
            type: CHAT_HISTORY_REQUESTED,
        });
        get_chat_history_api(token, username)
            .then(messages => {
                dispatch({
                    type: CHAT_HISTORY,
                    chatHistory: messages,
                });
            });
    };
}