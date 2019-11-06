import parameters from '../parameters'
import axios from 'axios';

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

var messages = [
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

export const send_message = async (token, to, message) => {
    // api call will be written
    
    const data = await axios
        .post(parameters.apiUrl+'/login/',
            {
                to_username: to,
                from_username: "enesoncu",
                text: message,
                date: new Date(),
            },
            {
                headers: {'Content-Type':'application/json'},
                timeout: 10000,
            }
        )
        .then(response => response.data)
        .catch(err => 
            {
                return {
                    token: null,
                    message: err.response? err.response.data.message : 'Connection Error!',
                };
            }
        );

    /*messages.push(
        {
            position: 'right',
            type: 'text',
            text: message,
            date: new Date(),
        },
    );*/

}

export const get_all_messages = async (token, to) => {
    
    // api call will be written

    let messages = await axios
        .get(parameters.apiUrl+'/message',
        {
            headers: {
            'Content-Type':'application/json',
            "Authorization": "Token "+token,
            },
            params: {
                username: to,
            },
            timeout: 10000,
        }
        )
        .then(response => response.data)
        .catch(err => 
            {
                return {
                message: err.response? err.response.data.message : 'Connection Error!',
                };
            }
        );
    if (to=="reactBot" && Math.random() < 0.9)
    {
        messages.push({
            position: 'left',
            type: 'text',
            text: Math.random().toString() + "Message" + "",
            date: new Date(),
        });
    }

    return messages;
}