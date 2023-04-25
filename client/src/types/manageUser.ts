
import { user } from "./user";

interface search {
  currentPage: number;
  keyword : string
}

export interface manageUser {
    userList: user[];
    search : search
  }