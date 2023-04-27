import { Container } from "react-bootstrap";
import { user } from "../../../types/user";
import { updateUser } from "../../../services/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { updateSchema } from "../../shared/validateInput";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setAlert } from "../../alert/alert.slice";
import omit from 'lodash/omit'
const UpdateUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const userLoginInfo = useAppSelector((state) => state.auth)
  let userUpdateInfo = JSON.parse(window.localStorage.getItem("updateUser") as string) as user;
  
  if(!userUpdateInfo?.id)
    userUpdateInfo = userLoginInfo

  
  const updateHandle = async () => {
    let userInfo: user = {}
    userInfo = omit(userUpdateInfo, ['password'])
    console.log(userInfo);
    updateSchema
      .validate(userInfo)
      .then(async (value) => {
        const userLoginInfo = await updateUser(userInfo);
        const errorMessage = userLoginInfo.response?.data || "";
        if (errorMessage !== "")
          dispatch(
            setAlert({ isError: true, open: true, message: errorMessage })
          );
        else {
          dispatch(
            setAlert({
              isError: false,
              open: true,
              message: "update successfully",
            })
          );
          window.localStorage.removeItem('updateUser')
        }
      })
      .catch((reason) => {
        dispatch(
          setAlert({ isError: true, open: true, message: reason.message })
        );
      });

  };

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Update Info</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder={userUpdateInfo.email}
            onChange={(e) => userUpdateInfo.email = e.target.value}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={userUpdateInfo.name}
            onChange={(e) => userUpdateInfo.name = e.target.value}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder={ userUpdateInfo.address}
            onChange={(e) => userUpdateInfo.address = e.target.value}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="number"
            placeholder={ userUpdateInfo.phone}
            onChange={(e) => userUpdateInfo.phone = e.target.value}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date of birth</Form.Label>
          <Form.Control
            type="date"            
            onChange={(e) => userUpdateInfo.dob = e.target.value}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Admin</Form.Label>
          <Form.Check
            type="checkbox"           
            checked={userUpdateInfo.admin} 
            onChange={(e) => userUpdateInfo.admin = e.target.checked }
          />
        </Form.Group>

        <Button variant="primary" onClick={updateHandle}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateUser;
