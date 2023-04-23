import {  configureStore } from "@reduxjs/toolkit";
import authSlice from "../components/auth/auth.slice";
import manageSlice from '../components/Dashboard/Manage.slice'

export const store = configureStore({
  reducer: {
    auth : authSlice,
    manage : manageSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



