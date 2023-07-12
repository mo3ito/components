
import axios from 'axios';
import Cookies from 'js-cookie';
import { SIRAF } from 'utilities/constants/cookieKeys';


export default async function senderFile(path ,data , setProgress) {
    const token =await Cookies.get(SIRAF)
    
    try {
      const response = await axios.post(path, data, {
        headers: {
          'Content-Type':  'multipart/form-data',
          Accept: '*/*',
         Authorization: ` Bearer ${token}`
        },
        onUploadProgress: (progressEvent) => {
          const percentage = (progressEvent.loaded * 100) / progressEvent.total;
          setProgress(+percentage.toFixed(2));
        },
      });
      if (response.status === 200){
          console.log(response);
          return response.data;
      } 
      else throw Error();
    } catch (err) {
      console.log(err);
    }
}
