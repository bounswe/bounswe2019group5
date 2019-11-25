import parameters from '../../parameters'
import axios from 'axios';

// https://chrome.google.com/webstore/detail/access-control-allow-cred/hmcjjmkppmkpobeokkhgkecjlaobjldi should be added to chrome

export const respond_to_essay = async (token, status, id) => {

    let essay = await axios
        .patch(parameters.apiUrl+'/essay/' + id + '/',
            {
                status,
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
                message: 'Error',
            };
        });
    
    return essay;
}