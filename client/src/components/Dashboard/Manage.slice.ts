import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { user as userState } from "../../types/user";
import { manageUser } from "../../types/manageUser";
import { RootState } from "../../redux/store";
import _ from 'lodash'



const initialState: manageUser = {
  userList: [],
  search : {
    keyword : '',
    currentPage : 0
  }
};

const manageSlice = createSlice({
  name: "manage",
  initialState,
  reducers: {
    loadUser: (state, action: PayloadAction<manageUser>) => {
      state.userList = [...action.payload.userList];
      _.merge(state.search, action.payload.search)
    },
    //TODO: update the object has been update on server
    updateUser: (state, action: PayloadAction<userState>) => {
      state.userList.push(action.payload);
    },
    //TODO: remove object out of array after delete on server
    deleteUser: (state, action: PayloadAction<userState>) => {
      state.userList.push(action.payload);
    },
    updateLazyloadPosition : (state, action: PayloadAction<manageUser> ) =>{
      _.merge(state.search, action.payload.search)
    }
  },
});

export const {loadUser, updateUser, deleteUser, updateLazyloadPosition} = manageSlice.actions
export const nanageStatus = (state : RootState) => state.manage
export default manageSlice.reducer
