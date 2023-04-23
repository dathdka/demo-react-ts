import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import { user } from "../../../types/user";
import { login } from "../../../services/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("")
  const [password, setPassword] = useState("");

  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value as string);
  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value as string);
  const registerHandle = async () => {
    let userInfo: user = {
      email: email,
      password: password,
    };
    await login(userInfo);
  };
  return (
    <Container>
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>Register</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="email" onChange={emailHandler} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="email" placeholder="name" onChange={emailHandler} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Address" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone number</Form.Label>
          <Form.Control type="text" placeholder="Phone number" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="password" onChange={passwordHandler} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type="password" placeholder="Confirm password"  />
        </Form.Group>
        
        <Button variant="primary" type="submit" onClick={registerHandle}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
