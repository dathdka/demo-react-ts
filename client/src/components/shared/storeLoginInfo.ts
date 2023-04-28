import { user } from '../../types/user'
import forOwn from 'lodash/forOwn'

export const storeLoginInfo = (userInfo : user) =>{
    forOwn(userInfo, (value, key) =>{
        window.localStorage.setItem(key,value as string)
    })
}

export const removeLoginInfo = () =>{
    window.localStorage.clear();
}

export const getLoginInfo = () : user =>{
    const userLoginInfo : user ={
        id : window.localStorage.getItem('id') || '',
        name : window.localStorage.getItem('name') || '',
        email : window.localStorage.getItem('email') || '',
        phone : window.localStorage.getItem('phone') || '',
        dob: window.localStorage.getItem('dob') || '',
        token : window.localStorage.getItem('token') || '',
        admin : window.localStorage.getItem('admin') === 'true' && true,
        address : window.localStorage.getItem('address') || ''
    }
    return userLoginInfo
}