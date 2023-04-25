import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import "./style/style.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { alert } from "./types/alert";
import { useState, useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { useAppSelector } from "./hooks";
import { CustomAlert } from "./components/shared/CustomAlert";
// import { Dashboard } from "./components/pages/Dashboard/Dashboard";
function App() {
  const token = window.localStorage.getItem('token')
  // if(token)
    

  const userInfo = useAppSelector(state => state.auth)
  useEffect(()=>{

  },
  [userInfo.token])
  return (
    <>
      <CustomAlert />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
