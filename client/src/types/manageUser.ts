
import { user } from "./user";

export interface search {
  currentPage: number;
  keyword : string;
  currentPos : number;
}

export interface manageUser {
    userList: user[];
    search : search
  }