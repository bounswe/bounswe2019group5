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
    
    await timeout(200);

    messages.push(
        {
            position: 'right',
            type: 'text',
            text: message,
            date: new Date(),
        },
    );

    return messages;

}

export const get_all_messages = async (token, to) => {
    await timeout(1000);
    // api call will be written
    console.log("API CALL");
    if (to=="reactBot" && Math.random() < 0.1)
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