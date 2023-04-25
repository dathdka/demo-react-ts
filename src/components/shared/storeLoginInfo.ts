import { loginInfo } from "../../types/loginInfo"
import _ from 'lodash'

export const storeLoginInfo = (userInfo : loginInfo) =>{
    _.forOwn(userInfo, (value, key) =>{
        window.localStorage.setItem(key,value as string)
    })
}

export const removeLoginInfo = () =>{
    window.localStorage.clear();
}