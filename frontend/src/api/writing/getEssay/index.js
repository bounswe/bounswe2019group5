import parameters from '../../parameters'
import axios from 'axios';

export const get_essay = async (token, id) => {

    let profile = await axios
        .get( parameters.apiUrl + "/essay/" + id,
            {
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