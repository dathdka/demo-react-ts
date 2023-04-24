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
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/register" replace />} />
        </Routes>
      </Router>
      <CustomAlert />
    </>
  );
}

export default App;
