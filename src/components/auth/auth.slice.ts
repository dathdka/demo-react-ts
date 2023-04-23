import { createSlice, PayloadAction } from "@reduxjs/toolkit";  
import { RootState } from "../../redux/store";
import { user as userState } from "../../types/user"

const initialState : userState = {
    id: '',
    name: '',
    phone : '',
    address : '',
    admin: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLogin : (state, action : PayloadAction<userState>) =>{
            state = action.payload
        },
        userLogout : (state, action: PayloadAction<userState>) =>{
            state = initialState
        }
    }
})

export const {userLogin, userLogout} = authSlice.actions
export const userInfo = (state: RootState) => state.auth
export default authSlice.reducer
