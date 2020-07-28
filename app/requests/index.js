import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'

const BASE_URL ="http://172.16.8.112:8888/api/"
const login = async (email, password) => {
  let data ={
    email: email,
    password : password
  }
  try {
    const response = await axios.post(
      BASE_URL + "login", data
    );
    console.log(JSON.stringify(response.data));
  } catch (error) {
    // handle error
    alert(error.message);
  }
}
export default {login}