import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { getUserById, deleteUser } from "../../../services/api";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setAlert } from "../../alert/alert.slice";
import { useEffect, useState } from "react";
import { user } from "../../../types/user";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
export const InfoPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [userInfo, setUserInfo] = useState<user>({});
  const authState = useAppSelector((state) => state.auth);
  const urlQuery = window.location.search;
  const urlParams = new URLSearchParams(urlQuery);
  const userIdToDisplay = urlParams.get("id") || "";

  const sharedLink = () => {
    navigator.clipboard.writeText(window.location.href);
    dispatch(
      setAlert({ message: "Link has been copied", isError: false, open: true })
    );
  };

  const redirectUrl = (path: string = "") => 
    window.location.href = `http://localhost:3000/${path}`

  const updateHandle = (userInfo: user) => {
    window.localStorage.setItem("updateUser", JSON.stringify(userInfo));
    redirectUrl("update-user");
  };

  const deleteHandle = async (userId: string) => {
    const response = await deleteUser(userId);
    const errorMessage = response.response?.data || "";

    if (errorMessage !== "")
      dispatch(setAlert({ isError: true, open: true, message: errorMessage }));
    else {
      redirectUrl("");
    }
  };

  useEffect(() => {
    getUserById(userIdToDisplay).then((response) => {
      if (typeof response === "string")
        dispatch(setAlert({ message: response, isError: true, open: true }));
      else {
        setUserInfo(response.result as user);
      }
    });
  }, []);
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <img src={userInfo.image} alt="img" width="88%" />
          <h2
            style={{
              display: "block",
              textAlign: "center",
              fontFamily: "monospace",
              marginRight: "12%",
            }}
          >
            {userInfo.name}
          </h2>
        </Col>
        <Col>
          <Alert>
            <ul style={{ listStyle: "none" }}>
              <li>Email : {userInfo.email}</li>
              <li>Address : {userInfo.address}</li>
              <li>Date of birth : {userInfo.dob?.slice(0, 10)}</li>
              <li>Phone number : {userInfo.phone}</li>
            </ul>
          </Alert>
          <div style={{ margin: "0 25%" }}>
            {authState.admin && (
              <Button variant="success" onClick={() => updateHandle(userInfo)}>
                <ModeEditIcon />
              </Button>
            )}
            {authState.admin && (
              <Button
                variant="danger"
                onClick={() => {
                  window.confirm("you want to delete this user") &&
                    deleteHandle(userInfo.id as string);
                }}
              >
                <DeleteIcon />
              </Button>
            )}
            <Button variant="primary" onClick={sharedLink}>
              <ReplyIcon />
            </Button>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
