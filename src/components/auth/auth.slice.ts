import { createSlice, PayloadAction } from "@reduxjs/toolkit";  
import { RootState } from "../../redux/store";
import { user as userState } from "../../types/user"
import { loginInfo } from "../../types/loginInfo";
import _ from 'lodash'
const initialState : loginInfo = {
    id: '',
    name: '',
    phone : '',
    address : '',
    dob: '',
    email: '',
    token: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLogin : (state, action : PayloadAction<loginInfo>) =>{
            return _.merge(state,action.payload)
        },
        userLogout : (state) =>{
            return _.merge(state,initialState)
        }
    }
})

export const {userLogin, userLogout} = authSlice.actions
export const userInfo = (state: RootState) => state.auth
export default authSlice.reducer
