import parameters from '../parameters'
import axios from 'axios';

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// convert 2019-11-07T08:12:22.447584Z TO 

var messages = [];
var lock_for_get_all_messages = false;

export const send_message = async (token, to, message, messageTextBoxReference) => {

    let newMessage = await axios
        .post(parameters.apiUrl+'/message',
            {
                username: to,
                text: message,
            },
            {
                headers: {
                    'Content-Type':'application/json',
                    Authorization: 'Token '+token,
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
        .get(parameters.apiUrl+'/message',
        {
            params: {
                username: 'enesoncu2',
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

/*
[
    {
        position: 'right',
        type: 'text',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        date: new Date(),
    },
    {
        position: 'right',
        type: 'text',
        text: 'Merhaba',
        date: new Date(),
    },
    {
        position: 'left',
        type: 'text',
        text: 'consectetur adipisicing elit',
        date: new Date(),
    },
    {
        position: 'right',
        type: 'text',
        text: 'adadasdsafd',
        date: new Date(),
    },
];
*/