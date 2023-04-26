import { Container } from "react-bootstrap";
import { useState } from "react";
import { user } from "../../../types/user";
import { register } from "../../../services/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { textHandle } from "../../shared/textHandle";
import { infoSchema } from "../../shared/validateInput";
import { useAppDispatch } from "../../../hooks";
import { setAlert } from "../../alert/alert.slice";
import { storeLoginInfo } from "../../shared/storeLoginInfo";
import { userLogin } from "../../auth/auth.slice";

const AddUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDoB] = useState("1999-01-01");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerHandle = async () => {
    let userInfo: user = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      dob: dob,
      password: password
    };

    infoSchema
      .validate(userInfo)
      .then(async (value) => {
        if(password !== confirmPassword)
          dispatch(setAlert({open: true, isError: true, message: 'password and confirm password does not match'}))
        else{
          const userLoginInfo = await register(userInfo);
          const errorMessage = userLoginInfo.response?.data || "";
  
          //update state in store after make a request
          if (errorMessage !== "")
            dispatch(
              setAlert({ isError: true, open: true, message: errorMessage })
            );
          else {
            storeLoginInfo(userLoginInfo);
            dispatch(
              setAlert({
                isError: false,
                open: true,
                message: "register successfully",
              })
            );
            dispatch(userLogin(userLoginInfo));
          }
        }
      })
      .catch((reason) => {
        dispatch(setAlert({ isError: true, open: true, message: reason.message }));
      });
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
            onChange={(e) => textHandle(e.target.value, setEmail)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            onChange={(e) => textHandle(e.target.value, setName)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address"
            onChange={(e) => textHandle(e.target.value, setAddress)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Phone number"
            onChange={(e) => textHandle(e.target.value, setPhone)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date of birth</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => textHandle(e.target.value, setDoB)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            onChange={(e) => textHandle(e.target.value, setPassword)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            onChange={(e) => textHandle(e.target.value, setConfirmPassword)}
          />
        </Form.Group>

        <Button variant="primary" onClick={registerHandle}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddUser;
