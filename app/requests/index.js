//<ROOT>/shared/APIKit.js
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
// Create axios client, pre-configured with baseURL
const APIHandle = axios.create({
  baseURL: 'http://172.16.8.112:8888/api/',
  timeout: 10000,
});



// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
  console.log("setClientToken", token)
  APIHandle.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export const handleLogin = async (username, password) => {
  return await APIHandle.post('/login', {
    email: username,
    password: password
  })
    .then((response) => {
      checkSuccess(response);
      let data = response.data.data;
      setClientToken(data.accessToken);

      return data;

    })
    .catch(err => {
      throw new Error(err);
    });
}

export const handleMe = async (token) => {
  setClientToken(token);
  return await APIHandle.get('/me')
    .then((response) => {
      return response.data.data;
    })
    .catch(err => {
      throw new Error(err);
    })
}

export const handleLoadListArticles = async () => {

  return await APIHandle.post("/article/all")
    .then((response) => {
      console.log(response.data.data);
      checkSuccess(response);

      return response.data.data;
    })
    .catch(err => {
      throw new Error(err);
    });
}


function checkSuccess(response) {
  if (response == null || response.data.data == null) {
    throw new Error("Request failed!");
  }
  let code = response.data.code;
  if (code == 1)

    throw new Error(response.data.message);
}

export default APIHandle;