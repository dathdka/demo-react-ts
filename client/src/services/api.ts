import axios from "axios";
import setting from "../config/setting";
import { user } from "../types/user";
import { forgetPassword } from "../types/forgetPassword";
import { omit } from "lodash";
const api = axios.create({
  baseURL: setting.baseApiUrl,
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

//middleware response
api.interceptors.response.use((response) =>{
  return response
},(error) => {
  return Promise.reject(error.response.data)
})

export const login = async (userInfo: user) => {
  try {
    const response = await api.post("auth/login", {
      email: userInfo.email,
      password: userInfo.password,
    });
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const addUser = async (userInfo: user) => {
  try {
    const response = await api.post("manage/add-user", userInfo);
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const getUserByName = async (
  username: string = "",
  currentPage: number = 0,
  isAdmin: string = "",
  addressKey: string = "",
  isSortAsc: boolean = true
) => {
  try {
    const response = await api.get(
      `manage/user?username=${username}&currentPage=${currentPage}&isAdmin=${isAdmin}&addressKey=${addressKey}&isSortAsc=${isSortAsc}`
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const updateUser = async (userInfo: user) => {
  try {
    const response = await api.put("manage/update-user", userInfo);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await api.delete("manage/delete-user", {
      data: { id: userId },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};


export const getUserById = async (id : string) =>{
  try {
    const response = await api.get(`manage/info?id=${id}`)
    return response.data;
  } catch (error) {
    return error;
  }
}

export const sendOTP = async (email: string) =>{
  try {
    const response = await api.post('auth/forget-password',{email})
    return response.data
  } catch (error) {
    return error;
  }
}

export const setNewPassword = async (passwordInfo : forgetPassword) =>{
  try {
    const response = await api.post('auth/set-new-password',omit(passwordInfo))
    return response.data    
  } catch (error) {
    return error;
  }
}