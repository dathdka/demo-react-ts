import axios from "axios";
import setting from "../config/setting";
import { user } from "../types/user";

axios.defaults.baseURL = setting.baseApiUrl;

export const login = async (userInfo: user) => {
  try {
    const response = await axios.post("auth/login", {
      email: userInfo.email,
      password: userInfo.password,
    });
    console.log(response);
  } catch (error: any) {
    console.log(error);
    
  }
};

export const register = async (userInfo : user) =>{
    try {
        const response = await axios.post('auth/register', {userInfo})
        console.log(response);
    } catch (error: any) {
        alert('error')
    }
};
