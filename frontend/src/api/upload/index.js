import parameters from '../parameters'
import axios from 'axios';


export const upload_file = async (token, file) => {

    var bodyFormData = new FormData()
    bodyFormData.set('file', file);

    const data = await axios({
        method: 'post',
        url: parameters.apiUrl+'/upload/',
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
            message: 'File cannot Uploaded!',
        };
    });
    
    console.log(data);
  
    return data;
};