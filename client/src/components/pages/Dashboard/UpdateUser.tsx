import { Container } from "react-bootstrap";
import { user } from "../../../types/user";
import { updateUser } from "../../../services/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { updateSchema } from "../../shared/validateInput";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setAlert } from "../../alert/alert.slice";
import { userLogin } from "../../auth/auth.slice";
import { storeLoginInfo } from "../../shared/storeLoginInfo";
import omit from "lodash/omit";
import moment from "moment";
const UpdateUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const userLoginInfo = useAppSelector((state) => state.auth);
  let userUpdateInfo = JSON.parse(
    window.localStorage.getItem("updateUser") as string
  ) as user;
  if (!userUpdateInfo?.id)
    userUpdateInfo = JSON.parse(JSON.stringify(userLoginInfo));

  const updateHandle = async () => {
    let userInfo: user = {};
    userInfo = omit(userUpdateInfo, ["password", "token"]);
    updateSchema
      .validate(userInfo)
      .then(async (value) => {
        const updateResponse = await updateUser(userInfo);
        const errorMessage = updateResponse.response?.data || "";
        if (errorMessage !== "")
          dispatch(
            setAlert({ isError: true, open: true, message: errorMessage })
          );
        else {
          const userAfterEdit = updateResponse.result as user;
          
          if (userAfterEdit.id === userLoginInfo.id){
            storeLoginInfo(userAfterEdit)
            dispatch(userLogin(userAfterEdit));
          }
          dispatch(
            setAlert({
              isError: false,
              open: true,
              message: "update successfully",
            })
          );
          window.localStorage.removeItem("updateUser");
          window.location.pathname = "/dashboard";
        }
      })
      .catch((reason) => {
        dispatch(
          setAlert({ isError: true, open: true, message: reason.message })
        );
      });
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      <h1 style={{ textAlign: "center" }}>Update Info</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            defaultValue={userUpdateInfo.email}
            onChange={(e) => (userUpdateInfo.email = e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={userUpdateInfo.name}
            onChange={(e) => (userUpdateInfo.name = e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            defaultValue={userUpdateInfo.address}
            onChange={(e) => (userUpdateInfo.address = e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="number"
            defaultValue={userUpdateInfo.phone}
            onChange={(e) => (userUpdateInfo.phone = e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date of birth</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => {
              userUpdateInfo.dob = e.target.value;
            }}
            defaultValue={moment(userUpdateInfo.dob).format("YYYY-MM-DD")}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Admin</Form.Label>
          <Form.Check
            type="checkbox"
            defaultChecked={userUpdateInfo.admin}
            onChange={(e) => (userUpdateInfo.admin = e.target.checked)}
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
