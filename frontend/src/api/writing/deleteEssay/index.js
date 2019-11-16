import parameters from '../../parameters'
import axios from 'axios';

export const delete_essay = async (token, id) => {

    await axios
        .delete( parameters.apiUrl + "/essay/" + id,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Token "+token,
                },
                timeout: 10000
            }
        )
        .catch(err => {
            return {
                message: "Connection Error!"
            };
        });
        
};