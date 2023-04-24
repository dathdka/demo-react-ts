import {  configureStore } from "@reduxjs/toolkit";
import authSlice from "../components/auth/auth.slice";
import manageSlice from '../components/Dashboard/Manage.slice'
import alertSlice from "../components/alert/alert.slice";

export const store = configureStore({
  reducer: {
    auth : authSlice,
    manage : manageSlice,
    alert : alertSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



