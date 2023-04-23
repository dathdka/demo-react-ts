import {  configureStore } from "@reduxjs/toolkit";
import auth from "../components/auth/auth.slice";


export const store = configureStore({
  reducer: {
    auth : auth
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



