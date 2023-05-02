import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { user } from "../../types/user";
import { RootState } from "../../redux/store";
import merge from "lodash/merge";
import { search, filter, manageUser } from "../../types/manageUser";

const initialState: manageUser = {
  userList: [],
  search: {
    keyword: "",
    currentPage: 1,
  },
  filter: {
    addressKey: "",
    isAdmin: "",
  },
};

const manageSlice = createSlice({
  name: "manage",
  initialState,
  reducers: {
    initUserList: (state, action: PayloadAction<user[]>) => {
      state.userList = [...action.payload];
    },
    retriveMoreUser: (state, action: PayloadAction<manageUser>) => {
      state.userList = [...state.userList, ...action.payload.userList];
      merge(state.search, action.payload.search);
    },
    resetUserListBySearch: (state, action: PayloadAction<search>) => {
      merge(state.search, action.payload);
      // merge(state.filter, initialState.filter);
    },
    resetUserListByFilter: (state, action: PayloadAction<filter>) => {
      state.search.currentPage = 1
      merge(state.filter, action.payload);
    },
  },
});

export const {
  initUserList,
  retriveMoreUser,
  resetUserListBySearch,
  resetUserListByFilter,
} = manageSlice.actions;
export const manageStatus = (state: RootState) => state.manage;
export default manageSlice.reducer;
