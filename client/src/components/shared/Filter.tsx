import { Container, Row, Form } from "react-bootstrap";
import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserByName } from "../../services/api";
import { resetUserListByFilter, initUserList } from "../Dashboard/Manage.slice";
import { setAlert } from "../alert/alert.slice";
import { user } from "../../types/user";
import { debounce } from "lodash";
export const Filter: React.FC = () => {
  const [addressKey, setAddressKey] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUSer] = useState(false);
  const dispatch = useAppDispatch();
  const dashboardState = useAppSelector((state) => state.manage);
  const authState = useAppSelector((state) => state.auth)


  const filterHandle = async (addressKey : string, isAdmin: boolean, isUser : boolean, searchKeyword: string) => {
    
    let adminCheck;
    if (isAdmin === isUser) adminCheck = "";
    else adminCheck = isAdmin ? true : false;

    const response = await getUserByName(searchKeyword,0,adminCheck.toString(),addressKey);

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
  const debounceInput = useCallback(debounce(filterHandle, 1000), [])
  useEffect(()=>{debounceInput(addressKey, isAdmin, isUser, dashboardState.search.keyword)},[isAdmin, isUser,addressKey])

  return (
    // <Container >
      <Row style={{ marginTop: "-36px",position: "fixed", width: '100vw', alignItems : 'end'}}>
        <Form>
          <Form.Group
            className="mb-3"
            style={{
              display: "flex",
              backgroundColor: "white",
              justifyContent: 'space-around'
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
              {authState.admin&&<Form.Check
                style={{ margin: "10px" }}
                type="checkbox"
                label="Admin"
                onChange={(e) => setIsAdmin(e.target.checked)}
              />}
              {authState.admin&&<Form.Check
                style={{ margin: "10px" }}
                type="checkbox"
                label="User"
                onChange={(e) => setIsUSer(e.target.checked)}
              />}
            </div>
          </Form.Group>
        </Form>
      </Row>
    // </Container>
  );
};
