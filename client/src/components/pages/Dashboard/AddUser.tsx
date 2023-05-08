import { Container } from "react-bootstrap";
import { useState } from "react";
import { user } from "../../../types/user";
import { addUser as insertUser } from "../../../services/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { textHandle } from "../../shared/textHandle";
import { insertSchema } from "../../shared/validateInput";
import { useAppDispatch } from "../../../hooks";
import { setAlert } from "../../alert/alert.slice";

const AddUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDoB] = useState("1999-01-01");
  const [admin, setAdmin] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");


  const insertHandle = async () => {
    let userInfo: user = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      dob: dob,
      admin: admin,
      password: password,
    };
    try {
      await insertSchema.validate(userInfo)
      if (password !== confirmPassword)
        dispatch(setAlert({message : "password doesn't match", isError : true, open : true}))
      const userLoginInfo = await insertUser(userInfo)
      //if the response is error then set alert
      if (typeof userLoginInfo === 'string' )
        dispatch(setAlert({message : userLoginInfo, isError : true, open : true}))
      else {
        window.location.pathname = "/dashboard";
        dispatch(setAlert({message : "insert user successfully", isError : true, open : true}))
      }
    } catch (error : any) {
      dispatch(setAlert({message : error.message, isError : true, open : true}))
    }
  }

  return (
    <Container>
      <h1 className="updatepage__container--text">Add new user</h1>
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
        <Form.Group className="mb-3">
          <Form.Label>Admin</Form.Label>
          <Form.Check
            type="checkbox"
            onChange={(e) => setAdmin(e.target.checked)}
          />
        </Form.Group>

        <Button
            variant="primary"
            onClick={(e) => {e.preventDefault(); insertHandle()} }
            type="submit"
          >
            Submit
          </Button>
      </Form>
    </Container>
  );
};

export default AddUser;
