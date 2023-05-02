import { Container, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { getUserByName } from "../../services/api";
import { resetUserListByFilter, initUserList } from "../Dashboard/Manage.slice";
import { setAlert } from "../alert/alert.slice";
import { user } from "../../types/user";
export const Filter: React.FC = () => {
  const [addressKey, setAddressKey] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUSer] = useState(false);
  const dispatch = useAppDispatch();
  const dashboardState = useAppSelector((state) => state.manage);

  const filterHandle = async () => {
    let adminCheck;
    if (isAdmin === isUser) adminCheck = "";
    else adminCheck = isAdmin ? true : false;

    const response = await getUserByName(
      dashboardState.search.keyword,
      0,
      adminCheck.toString(),
      addressKey
    );

    //error response handle
    const errorMessage = response.response?.data || "";
    if (errorMessage !== "")
      dispatch(setAlert({ isError: true, open: true, message: errorMessage }));
    else {
      const userList = response.results as user[];
      dispatch(initUserList(userList));
      dispatch(resetUserListByFilter({ isAdmin: `${adminCheck}`, addressKey }));
    }
  };
  return (
    <Container>
      <Row style={{ marginTop: "70px" }}>
        <Form>
          <Form.Group
            className="mb-3"
            style={{
              position: "fixed",
              display: "flex",
              backgroundColor: "white",
            }}
            controlId="formBasicEmail"
          >
            <Form.Control
              type="text"
              style={{ display: "inline", width: "350px" }}
              placeholder="Filter by address"
              onChange={(e) => setAddressKey(e.target.value)}
            />
            <div style={{ display: "flex" }}>
              <Form.Check
                style={{ margin: "10px" }}
                type="checkbox"
                label="Admin"
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <Form.Check
                style={{ margin: "10px" }}
                type="checkbox"
                label="User"
                onChange={(e) => setIsUSer(e.target.checked)}
              />
              <Button variant="success" onClick={filterHandle}>
                <FilterAltIcon />
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
};
