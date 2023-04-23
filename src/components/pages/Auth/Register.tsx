import {Container } from "react-bootstrap";
import { useState } from "react";
import { user } from "../../../types/user";
import { register } from "../../../services/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { textHandle } from "../../shared/textHandle";
import { registerSchema } from "../../shared/validateInput";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerHandle = async () => {
    
    let userInfo: user = {
      name: name,
      email: email,
      phone: phone,
      address : address,
      password: password,
    };
    registerSchema.validate(userInfo)
    .then((value) =>{
      console.log(value);
    })
    .catch((reason) =>{
      console.log(reason);
    })
    // console.log(userInfo);
    // await register(userInfo)
  };
  return (
    <Container>
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>Register</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            onChange={(e)=>textHandle(e.target.value,setEmail)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            onChange={(e)=>textHandle(e.target.value,setName)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address"
            onChange={(e)=>textHandle(e.target.value,setAddress)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Phone number"
            onChange={(e)=>textHandle(e.target.value,setPhone)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            onChange={(e)=>textHandle(e.target.value,setPassword)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            onChange={(e)=>textHandle(e.target.value,setConfirmPassword)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={registerHandle}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
