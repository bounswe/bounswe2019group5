import parameters from '../parameters'
import axios from 'axios';

export const send_comment = async (token, username, comment, rate) => {

    let newComment = await axios
        .post(parameters.apiUrl+'/recommendation/',
            {
                username,
                comment,
                rate
            },
            {
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': 'Token '+token,
                },
                timeout: 10000,
            }
        )
        .then(response => response.data)
        .catch(err => {
            return {
                message: "An error occured",
            };
        });
    
    return newComment;
}