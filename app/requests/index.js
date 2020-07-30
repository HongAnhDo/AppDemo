//<ROOT>/shared/APIKit.js
import axios from 'axios';

const APIHandle = axios.create({
  baseURL: 'http://192.168.43.106:8888/api/',
  timeout: 10000,
});



// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
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

export const handleRegister = async (username, email, password) => {
  return await APIHandle.post('/register', {
    email: email,
    password: password,
    username: username,
    userRole: "ROLE_USER",
    type: "UserBody"
  })
    .then((response) => {
      checkSuccess(response);

    })
    .catch(err => {
      throw new Error(err);
    });
}


export const handleMe = async (token) => {
  setClientToken(token);
  return await APIHandle.post('/me')
    .then((response) => {
      return response.data.data;
    })
    .catch(err => {
      throw new Error(err);
    })
}

export const handleLoadListArticles = async () => {
  console.log("call post /article/all");
  return await APIHandle.post("/article/all")
    .then((response) => {
      checkSuccess(response);

      return response.data.data;
    })
    .catch(err => {
      throw new Error(err);
    });
}

export const createNewArticle = async (title, content) => {
  let data = {
    title: title,
    content: content,
    type: "ArticleRequestBody"

  }
  return await APIHandle.post("/article/create", data)
    .then((response) => {
      checkSuccess(response);
    })
    .catch(err => {
      throw new Error(err);
    });
}



function checkSuccess(response) {
  if (response == null || response.data == null) {
    throw new Error("Request failed!");
  }
  let code = response.data.code;
  if (code == 1)
    throw new Error(response.data.message);
}

export default APIHandle;