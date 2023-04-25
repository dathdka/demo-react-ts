import Input from "../../shared/Input";
import { Row, Col } from "react-bootstrap";
import Button from "@mui/material/Button";
import { useState } from "react";
import { user } from "../../../types/user";
import { login } from "../../../services/api";
import { useAppDispatch } from "../../../hooks";
import { useAppSelector } from "../../../hooks";
import { userLogin } from "../../auth/auth.slice";
import { loginInfo } from "../../../types/loginInfo";
import { setAlert } from "../../alert/alert.slice";
import { storeLoginInfo } from "../../shared/storeLoginInfo";

const Login: React.FC = (userInfo: user) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value as string);
  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value as string);

  const loginHandle = async () => {
    let account: user = {
      email: email,
      password: password,
    };

    const userLoginInfo = await login(account);
    const errorMessage = userLoginInfo.response?.data || ''
    
    //update state in store after make a request
    if(errorMessage !== '')
    dispatch(setAlert({ isError: true, open: true, message: errorMessage }));
    else {
      storeLoginInfo(userLoginInfo);
      dispatch(setAlert({ isError: false, open: true, message: "login successfully" }));
      dispatch(userLogin(userLoginInfo));
    }


  };
  return (
    <>
      <Row>
        <h1 style={{ marginLeft: "40%", marginTop: "200px" }}>Login</h1>
      </Row>
      <Row style={{ margin: "5% 200px" }}>
        <Col>
          <Input text="Email" handler={emailHandler} />
        </Col>
        <Col>
          <Input text="Password" handler={passwordHandler} type="password" />
        </Col>
        <Col xs={1}>
          <Button
            variant="contained"
            style={{ marginTop: "7px" }}
            onClick={loginHandle}
          >
            Login
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Login;
