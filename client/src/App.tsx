import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/pages/Auth/Login";
import AddUser from "./components/pages/Dashboard/AddUser";
import "./style/style.css";
import { useState, useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { CustomAlert } from "./components/shared/CustomAlert";
import  Dashboard  from "./components/pages/Dashboard/Dashboard";
import { loginInfo } from "./types/loginInfo";
function App() {
  const dispatch = useAppDispatch()
  const userInfo = {...window.localStorage}
  // if(token)
    

  // const userInfo = useAppSelector(state => state.auth)
  useEffect(()=>{

  },
  [userInfo.token])
  return (
    <>
      <CustomAlert />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
