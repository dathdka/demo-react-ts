
import { user } from "./user";

export interface search {
  currentPage: number;
  keyword : string;
}

export interface manageUser {
    userList: user[];
    search : search
  }