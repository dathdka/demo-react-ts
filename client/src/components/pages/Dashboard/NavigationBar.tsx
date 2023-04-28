import * as React from "react";
import { useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import LogoutIcon from "@mui/icons-material/Logout";
import { removeLoginInfo } from "../../shared/storeLoginInfo";
import {
  initUserList,
  resetUserListBySearch,
} from "../../Dashboard/Manage.slice";
import { setAlert } from "../../alert/alert.slice";
import { getUserByName } from "../../../services/api";
import { userLogout } from "../../auth/auth.slice";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "18ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

const addUserRedirect = () => (window.location.pathname = "/add-user");
const updateInfoRedirect = () => {
  window.localStorage.removeItem("updateUser");
  window.location.pathname = "/update-user";
};
const dashboardRedirect = () => (window.location.pathname = "/");

export const NavigationBar: React.FC = () => {
  const ditpatch = useAppDispatch();
  const dashboardState = useAppSelector((state) => state.manage);
  const authState = useAppSelector((state) => state.auth)
  const logoutHandle = () => {
    removeLoginInfo();
    ditpatch(userLogout());
    window.location.pathname = "/";
  };

  //fetch data every search input change
  useEffect(() => {
    getUserByName(dashboardState.search.keyword, 0).then((response) => {
      const errorMessage = response.response?.data || "";
      if (errorMessage !== "")
        setAlert({ isError: true, open: true, message: errorMessage });
      else {
        ditpatch(initUserList(response.results));
      }
    });
  }, [dashboardState.search.keyword]);

  const searchHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    ditpatch(
      resetUserListBySearch({
        keyword: event.target.value,
        currentPage: 1,
      })
    );
  };

  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {authState.admin&&<Button
            variant="outlined"
            style={{color : window.location.pathname === '/add-user' ? 'black': 'white'}}
            onClick={addUserRedirect}
          >
            <AddIcon />
          </Button>}
          <Button
            variant="outlined"
            style={{color : window.location.pathname === '/update-user' ? 'black': 'white'}}
            onClick={updateInfoRedirect}
          >
            <PersonPinIcon />
          </Button>
          <Button
            variant="outlined"
            style={{ color: "white" }}
            onClick={dashboardRedirect}
          >
            <HomeIcon style={{color : window.location.pathname === '/dashboard' ? 'black': 'white'}} />
          </Button>
          <Button
            variant="outlined"
            onClick={logoutHandle}
            style={{ color: "white" }}
          >
            <LogoutIcon />
          </Button>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={searchHandle}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
