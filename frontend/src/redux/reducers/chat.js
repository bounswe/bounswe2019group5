import {
    ACTIVATE_CHAT, DEACTIVATE_CHAT, SEND_MESSAGE, GET_ALL_MESSAGES_REQUESTED, GET_ALL_MESSAGES, CHAT_HISTORY_CLEAR, CHAT_HISTORY_REQUESTED, CHAT_HISTORY,
  } from "../actions";
  
  const initialState = {
    isActive: false,
    messagesLoading: false,
    messages: null,
    to: null,
    chatHistory: null,
    chatHistoryLoading: false,
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
        
        case CHAT_HISTORY_CLEAR:
            return {
                ...state,
                chatHistoryLoading: false,
                chatHistory: null,
            };
        
        case CHAT_HISTORY_REQUESTED:
            return {
                ...state,
                chatHistoryLoading: true,
            };

        case CHAT_HISTORY:
            return {
                ...state,
                chatHistoryLoading: false,
                chatHistory: action.chatHistory,
            };
  
      default:
        return state;
    }
  };
  