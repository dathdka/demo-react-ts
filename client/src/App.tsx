import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/pages/Auth/Login";
import AddUser from "./components/pages/Dashboard/AddUser";
import UpdateUser from "./components/pages/Dashboard/UpdateUser";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { CustomAlert } from "./components/shared/CustomAlert";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import { userLogin } from "./components/auth/auth.slice";
import { getLoginInfo } from "./components/shared/storeLoginInfo";
import { NavigationBar } from "./components/pages/Dashboard/NavigationBar";
import { InfoPage } from "./components/pages/Dashboard/InfoPage";
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useAppDispatch();

  const userLoginInfo = getLoginInfo();
  dispatch(userLogin(userLoginInfo));

  const userInfo = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo.token !== "") setIsLogin(true);
  }, [userInfo.token]);

  return (
    <div style={{ paddingTop: "100px" }}>
      {isLogin && <NavigationBar />}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/add-user" element={isLogin ? <AddUser /> : <Login />} />
          <Route
            path="/dashboard"
            element={isLogin ? <Dashboard /> : <Login />}
          />
          <Route
            path="/update-user"
            element={isLogin ? <UpdateUser /> : <Login />}
          />
          <Route
            path="/info"
            element={<InfoPage/>}
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <CustomAlert />
      </Router>
    </div>
  );
}

export default App;
