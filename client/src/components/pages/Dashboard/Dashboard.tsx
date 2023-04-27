import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  initUserList,
  retriveMoreUser,
  resetUserListBySearch,
} from "../../Dashboard/Manage.slice";
import { setAlert } from "../../alert/alert.slice";
import { getUserByName } from "../../../services/api";
import { user } from "../../../types/user";
import { Button, Col, Row, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import LazyLoad from "react-lazy-load";
import { manageUser } from "../../../types/manageUser";
import { deleteUser } from "../../../services/api";

class DashBoard extends React.Component {
  static currentPosition: number = 0;
  constructor(props: any) {
    super(props);
  }

  lazyFetchUserList = async () => {
    const { dashboardState, alert } = this.props as any;
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos - dashboardState.search.currentPos > 150) {
      const response = await getUserByName(
        dashboardState.search.keyword,
        dashboardState.search.currentPage
      );
      const errorMessage = response.response?.data || "";
      if (errorMessage !== "")
        alert({ isError: true, open: true, message: errorMessage });
      else {
        const { retriveMoreUser } = this.props as any;
        const dataUpdateState: manageUser = {
          userList: response.results as user[],
          search: {
            keyword: dashboardState.search.keyword,
            currentPage: dashboardState.search.currentPage + 1,
            currentPos: currentScrollPos,
          },
        };
        retriveMoreUser(dataUpdateState);
      }
    }
  };

  async componentDidMount() {
    const { alert } = this.props as any;
    window.addEventListener("scroll", this.lazyFetchUserList);

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

  updateHandle(userInfo : user) {
    window.localStorage.setItem('updateUser', JSON.stringify(userInfo))
    window.location.pathname = '/update-user'
  }

  deleteHandle = async (userId: string) => {
    const { alert } = this.props as any;
    const response = await deleteUser(userId);
    const errorMessage = response.response?.data || "";

    if (errorMessage !== "")
      alert({ isError: true, open: true, message: errorMessage });
    else {
      alert({ isError: true, open: true, message: "Delete successfully" });
      await this.componentDidMount();
    }
  };

  componentWillUnmount(): void {
    window.removeEventListener("scroll", this.lazyFetchUserList);
  }
  render(): React.ReactNode {
    const { dashboardState, authState } = this.props as any;
    const userList = dashboardState.userList as user[];
    return (
      <Container>
        <LazyLoad height={300}>
          <Row style={{ margin: "48px" }}>
            {userList.map((el) => (
              <Col className="col-lg-5" style={{ margin: "48px" }}>
                <Card style={{ borderColor : el.admin ? 'red': 'black'}} >
                  <Card.Body>
                    <Card.Title>{el.email}</Card.Title>
                    <Card.Text>Name: {el.name}</Card.Text>
                    <Card.Text>Phone number: {el.phone}</Card.Text>
                    <Card.Text>Date of Birth: {el.dob}</Card.Text>
                    <Card.Text>Address: {el.address}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={()=>this.updateHandle(el)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => this.deleteHandle(el.id as string)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </LazyLoad>
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    dashboardState: state.manage,
    authState: state.auth,
  };
};

const mapDispatchToProps = {
  initUserList,
  retriveMoreUser,
  resetUserListBySearch,
  alert: setAlert,
};
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
