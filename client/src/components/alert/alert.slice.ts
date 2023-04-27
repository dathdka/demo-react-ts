import { alert } from "../../types/alert"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../redux/store"
import _ from 'lodash'
const initialState : alert = {
    open : false,
    isError : false,
    message: ''
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers : {
        setAlert : (state, action: PayloadAction<alert>) =>{
            return _.merge(state, action.payload)
        },
        unsetAlert : (state) =>{
            return _.merge(state, initialState)
        }
    }
})

export const {setAlert, unsetAlert} = alertSlice.actions
export const alertStatus = (state: RootState) => state.alert
export default alertSlice.reducer

