import axios, { AxiosError, AxiosResponse } from "axios";
import setting from "../config/setting";
import { user } from "../types/user";
import { CustomAlert } from "../components/shared/CustomAlert";
import { loginInfo } from "../types/loginInfo";
const api = axios.create({
  baseURL : setting.baseApiUrl,
})

api.interceptors.request.use(
  (config) =>{
    const token = localStorage.getItem('token')
    if(token)
      config.headers.Authorization = `Bearer ${token}`
    return config
  }
)

export const login = async (userInfo: user) => {
  try {
    const response = await api.post("auth/login", {
      email: userInfo.email,
      password: userInfo.password,
    });
    return response.data 
  } catch (error: any) {
    return error
  }
};

export const register = async (userInfo : user) =>{
    try {
        const response = await api.post('auth/register', userInfo)
        return response.data
    } catch (error: any) {
      return error
    }
};

export const getUserByName = async (username : string = '', currentPage: number = 0) =>{
  try{
    const response = await api.get(`manage/user?username=${username}&currentPage=${currentPage}`)
    return response.data
  }catch(error: any){
    return error
  }
}

export const updateUser = async (userInfo : user) => {
  try {
    const response = await api.put('manage/update-user', userInfo)
    return response.data
  } catch (error) {
    return error
    
  }
}

export const deleteUser = async (userId : string) =>{
  try {
    const response = await api.delete('manage/delete-user', {data: {userId}})
    return response.data
  } catch (error) {
    return error
  }
}
