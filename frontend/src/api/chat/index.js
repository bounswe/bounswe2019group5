import parameters from '../parameters'
import axios from 'axios';
import _ from 'lodash';

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

var messages = [];
var lock_for_get_all_messages = false;

export const send_message = async (token, to, message, messageTextBoxReference) => {

    let newMessage = await axios
        .post(parameters.apiUrl+'/message/',
            {
                username: to,
                text: message,
            },
            {
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': 'Token '+token,
                },
                timeout: 10000,
            }
        )
        .then(response => {
            messageTextBoxReference.clear();
            return {
                position: response.data.to_username === to ? 'right' : 'left',
                type: 'text',
                text: response.data.text,
                date: new Date(response.data.date),
            };
        })
        .catch(err => {
            messageTextBoxReference.clear();
            return {
                position: 'right',
                type: 'text',
                text: "Connection Error!",
                date: new Date(),
            };
        });
    
    if (newMessage && !lock_for_get_all_messages)
        messages.push(newMessage);

    return messages;
}

export const get_all_messages = async (token, _with) => {

    lock_for_get_all_messages = true;

    messages = await axios
        .get(parameters.apiUrl+'/message/',
        {
            params: {
                username: _with,
            },
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Token '+token,
            },
            timeout: 10000,
        }
        )
        .then(response => {
            return response.data
                .sort((a,b) => (new Date(a.date))-(new Date(b.date)))
                .map(message => {
                    return {
                        position: message.to_username === _with ? 'right' : 'left',
                        type: 'text',
                        text: message.text,
                        date: new Date(message.date),
                        to_username: message.to_username,
                        from_username: message.from_username,
                    };
            });
        })
        .catch(err => 
            {
                return {
                    message: err.response? err.response.data.message : 'Connection Error!',
                };
            }
        );

    lock_for_get_all_messages = false;

    return messages;
}

export const get_chat_history = async (token, username) => {
    var messages = await get_all_messages(token, "");
    if(messages.message)
        return messages;
    let dict = {};
    messages = messages
                .reverse()
                .filter(message => {
                    let chatWith = message.to_username === username ? message.from_username : message.to_username;
                    if (dict[chatWith]) return false;
                    dict[chatWith] = true;
                    return true;
                });
    messages = messages
                .map(message => {
                    let chatWith = message.to_username === username ? message.from_username : message.to_username;
                    var message2 = _.cloneDeep(message);
                    message2["chatWith"] = chatWith;
                    return message2;
                })
    console.log("MESSAGE HISTORY");
    console.log(messages);
    return messages;
}