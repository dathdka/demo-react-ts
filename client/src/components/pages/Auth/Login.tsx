import Input from "../../shared/Input";
import { Row, Col, Form, Container, Button } from "react-bootstrap";
// import Button from "@mui/material/Button";
import { useState } from "react";
import { user } from "../../../types/user";
import { login } from "../../../services/api";
import { useAppDispatch } from "../../../hooks";
import { userLogin } from "../../auth/auth.slice";
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

    //update state in store after make a request
    if (typeof userLoginInfo === "string")
      dispatch(setAlert({ isError: true, open: true, message: userLoginInfo }));
    else {
      storeLoginInfo(userLoginInfo);
      dispatch(
        setAlert({ isError: false, open: true, message: "login successfully" })
      );
      dispatch(userLogin(userLoginInfo));
      window.location.pathname = '/dashboard'
    }
  };
  return (
    <Row>
      <Col></Col>
      <Col>
        <h1 className="loginpage_container--text">Login</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={emailHandler}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={passwordHandler}
            />

            <Form.Text className="text-muted">
              <a href="/forget-password">Forget password ?</a>
            </Form.Text>
          </Form.Group>
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              loginHandle();
            }}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default Login;
