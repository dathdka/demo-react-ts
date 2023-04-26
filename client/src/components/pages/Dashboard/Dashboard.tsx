import React from "react";
import { manageUser as AppState, manageUser } from "../../../types/manageUser";
import { connect } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  initUserList,
  retriveMoreUser,
  resetUserListBySearch,
} from "../../Dashboard/Manage.slice";
import { setAlert } from "../../alert/alert.slice";
import { getUserByName } from "../../../services/api";
import ListGroup from "react-bootstrap/ListGroup";
import { user } from "../../../types/user";
import { FormControl, Button, Col, Row, Container } from "react-bootstrap";

class DashBoard extends React.Component {
  static currentPosition: number = 0;
  constructor(props: any) {
    super(props);
  }
  lazyLoadUserList = async () => {
    const { dashboardState } = this.props as any;
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos - DashBoard.currentPosition > 200) {
      DashBoard.currentPosition = currentScrollPos;
      const response = await getUserByName("", dashboardState.search.currentPage);
      const errorMessage = response.response?.data || "";
      if (errorMessage !== "")
        setAlert({ isError: true, open: true, message: errorMessage });
      else {
        const { retriveMoreUser } = this.props as any;
        retriveMoreUser(response.results as user[]);
      }
    }

  }
  async componentDidMount() {
    const { alert, dashboardState } = this.props as any;
    window.addEventListener("scroll", this.lazyLoadUserList);

    const response = await getUserByName("", 0);
    const errorMessage = response.response?.data || "";
    if (errorMessage !== "")
      alert({ isError: true, open: true, message: errorMessage });
    else {
      const { initUserList } = this.props as any;
      const actionPayload: user[] = response.results;
      initUserList(actionPayload);
    }
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    const { initUserList, retriveMoreUser, resetUserListBySearch, alert } = this.props as any;
    
  }

  updateHandle(userInfo: user) {
    console.log(this.props);
  }

  deleteHandle(userId: string) {
    console.log(userId);
  }

  componentWillUnmount(): void {
    window.removeEventListener("scroll", this.lazyLoadUserList);
  }
  render(): React.ReactNode {
    const { dashboardState } = this.props as any;
    const userList = dashboardState.userList as user[];
    const cloneUserListForChangeAble = JSON.parse(
      JSON.stringify(userList)
    ) as user[];
    return (
      <Container>
        <Row>
          <Col>
            <ListGroup style={{ padding: "40px" }}>
              {cloneUserListForChangeAble.map((el) => (
                <ListGroup.Item
                  style={{ border: "1px outlined grey" }}
                  key={el.id}
                >
                  <strong>{el.email}</strong>
                  <FormControl
                    type="text"
                    placeholder={el.name}
                    onChange={(e) => {
                      el.name = e.target.value;
                    }}
                  />
                  <FormControl
                    type="number"
                    placeholder={el.phone}
                    onChange={(e) => {
                      el.phone = e.target.value;
                    }}
                  />
                  <FormControl
                    type="text"
                    placeholder={el.address}
                    onChange={(e) => {
                      el.address = e.target.value;
                    }}
                  />
                  <FormControl
                    type="date"
                    defaultValue={el.dob}
                    onChange={(e) => {
                      el.dob = e.target.value;
                    }}
                  />
                  <Button
                    className="primary"
                    onClick={(e) => this.updateHandle(el)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={(e) => this.deleteHandle(el.id as string)}
                  >
                    Delete
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    dashboardState: state.manage,
  };
};

const mapDispatchToProps = {
  initUserList,
  retriveMoreUser,
  resetUserListBySearch,
  alert: setAlert,
};
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
