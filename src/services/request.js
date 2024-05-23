import axios from 'axios'
import https from 'https'

import { HOST } from './../constants/url'

import {
  getQueryString,
} from '../helper/common'

function send({
  method = method, path, data = null, query = null, headers = {}, newUrl
}) {
  return new Promise((resolve) => {
    const agent = new https.Agent({  
      rejectUnauthorized: false
    });
    let url = HOST + `${path}${getQueryString(query)}`
    if (newUrl) {
      url = `${newUrl}${getQueryString(query)}`
    }
    const dataString = window.localStorage.getItem('data')
    
    if(dataString){
      const newData =  JSON.parse(dataString)
      //let token = "thisismysecret"
      headers.authorization =`Bearer ${newData}`
      console.log("jwt", newData);
    }
    
    //headers["Access-Control-Allow-Origin"] = "*";
    console.log("send ",url, method, data)
    axios({
      method, url, data, headers, httpsAgent: agent,  strictSSL: false
    })
      .then((result) => {
        
        const data = result.data
        return resolve(data)
      })
      .catch((error) => {
        const {response ={}} = error
        
        const result = response.data ? response.data :null
        
        if (!result) {
          
        }
        else {
          const { statusCode, message: data } = result
          
          if (statusCode === 401 && data === 'Expired token received for JSON Web Token validation') {
            window.localStorage.clear()
            window.location.href = '/'
           
          }
          else if (
            (statusCode === 401 && data === 'Unauthorized') || (statusCode === 403 && data === 'InvalidToken')) {
              window.localStorage.clear()
              window.location.href = '/'
            
          }
          else {
            return resolve(result)
          }
        }
      })
  })
}

export default {
  send,
}
