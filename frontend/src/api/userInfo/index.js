import parameters from '../parameters'
import axios from 'axios';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const get_user_profile = async (token, username) => {

    let profile = await axios
        .get( parameters.apiUrl + "/profile",
            {
                params: {
                    username,
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Token "+token,
                },
                timeout: 10000
            }
        )
        .then(response => response.data)
        .catch(err => {
            return {
                message: err.response ? err.response.data.message : "Connection Error!"
            };
        });

    return profile;
        
};