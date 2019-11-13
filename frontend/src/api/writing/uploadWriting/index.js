import parameters from '../../parameters'
import axios from 'axios';

export const upload_writing = async (token, language, file, reviewer) => {

    var bodyFormData = new FormData();
    bodyFormData.set('language', language);
    if (reviewer)
        bodyFormData.set('reviewer', reviewer);
    bodyFormData.set('writing', file);

    console.log(token);

    const data = await axios({
        method: 'post',
        url: parameters.apiUrl+'/essay/',
        data: bodyFormData,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+token,
        },
    })
    .then(response => response.data)
    .catch(err => 
    {
        return {
        token: null,
        message: err.response? err.response.data.message : 'Connection Error!',
        };
    });
    
    console.log(data);
  
    return data;
  };