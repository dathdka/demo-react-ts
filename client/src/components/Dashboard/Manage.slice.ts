import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { user, user as userState } from "../../types/user";
import { manageUser } from "../../types/manageUser";
import { RootState } from "../../redux/store";
import merge from 'lodash/merge'
import { search } from "../../types/manageUser";

const initialState: manageUser = {
  userList: [],
  search : {
    keyword : '',
    currentPage : 1,
  }
};

const manageSlice = createSlice({
  name: "manage",
  initialState,
  reducers: {
    initUserList: (state, action: PayloadAction<user[]>) => {
      state.userList = [...action.payload]
    },
    retriveMoreUser: (state, action : PayloadAction<userState[]>) =>{
      state.userList = [...state.userList, ...action.payload]
      state.search.currentPage +=1
    },
    resetUserListBySearch : (state, action: PayloadAction<manageUser> ) =>{
      state.userList = [...action.payload.userList]
      merge(state.search, action.payload)
    },
  },
});

export const {initUserList, retriveMoreUser,resetUserListBySearch} = manageSlice.actions
export const manageStatus = (state : RootState) => state.manage
export default manageSlice.reducer
