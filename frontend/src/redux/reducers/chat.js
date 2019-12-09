import {
    ACTIVATE_CHAT, DEACTIVATE_CHAT, SEND_MESSAGE, GET_ALL_MESSAGES_REQUESTED, GET_ALL_MESSAGES,
  } from "../actions";
  
  const initialState = {
    isActive: false,
    messagesLoading: false,
    messages: null,
    to: null,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIVATE_CHAT:
            return {
                ...state,
                messagesLoading: false,
                isActive: true,
                messages: null,
                to: action.to,
            };

        case DEACTIVATE_CHAT:
            return {
                ...state,
                messagesLoading: false,
                isActive: false,
                messages: null,
                to: null,
            };

        case SEND_MESSAGE:
            return {
                ...state,
                messages: action.messages,
            };

        case GET_ALL_MESSAGES_REQUESTED:
            return {
                ...state,
                messagesLoading: true,
                to: action.to,
            };
    
        case GET_ALL_MESSAGES:
            return {
                ...state,
                messagesLoading: false,
                messages: action.messages,
            };
  
      default:
        return state;
    }
  };
  