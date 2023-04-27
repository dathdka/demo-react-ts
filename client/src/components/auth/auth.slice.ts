import { createSlice, PayloadAction } from "@reduxjs/toolkit";  
import { RootState } from "../../redux/store";
import { user } from "../../types/user"
import merge from 'lodash/merge'
const initialState : user = {
    id: '',
    name: '',
    phone : '',
    address : '',
    dob: '',
    email: '',
    admin : false,
    token: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLogin : (state, action : PayloadAction<user>) =>{
            return merge(state,action.payload)
        },
        userLogout : (state) =>{
            return merge(state,initialState)
        }
    }
})

export const {userLogin, userLogout} = authSlice.actions
export const userInfo = (state: RootState) => state.auth
export default authSlice.reducer
