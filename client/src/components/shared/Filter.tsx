import { Container, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
export const Filter: React.FC = () => {
  const [addressKey, setAddressKey] = useState("");
  const [adminCheck, setAdminCheck] = useState(false);
  const [userCheck, setUserCheck] = useState(false);
  const dispatch = useAppDispatch();
  const dashboardState = useAppSelector((state) => state.manage);
  const filterHandle = () => {};
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
                onChange={(e) => setAdminCheck(e.target.checked)}
              />
              <Form.Check
                style={{ margin: "10px" }}
                type="checkbox"
                label="User"
                onChange={(e) => setUserCheck(e.target.checked)}
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
