import parameters from '../../parameters'
import axios from 'axios';

export const respond_to_essay = async (token, status, id) => {

    await axios
        .patch(parameters.apiUrl+'/essay/' + id,
            {
                status: status
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
    
    return newAnnotation;
}