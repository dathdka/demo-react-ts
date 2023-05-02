import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  initUserList,
  retriveMoreUser,
  resetUserListBySearch,
} from "../../Dashboard/Manage.slice";
import DoneIcon from "@mui/icons-material/Done";
import { setAlert } from "../../alert/alert.slice";
import { getUserByName } from "../../../services/api";
import { user } from "../../../types/user";
import { Container} from "react-bootstrap";
import LazyLoad from "react-lazy-load";
import { manageUser } from "../../../types/manageUser";
import { deleteUser } from "../../../services/api";
import Table from "react-bootstrap/Table";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Filter } from "../../shared/Filter";
class DashBoard extends React.Component {
  static relativeError: number = 10;

  lazyFetchUserList = async () => {
    const { dashboardState, alert } = this.props as any;
    const currentScrollPos = window.pageYOffset;
    const curPos =
      DashBoard.relativeError * dashboardState.search.currentPage * 40;

    if (currentScrollPos - curPos > curPos) {
      window.removeEventListener("scroll", this.lazyFetchUserList);
      const response = await getUserByName(
        dashboardState.search.keyword,
        dashboardState.search.currentPage,
        dashboardState.filter.isAdmin,
        dashboardState.filter.addressKey
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
          }
        };
        retriveMoreUser(dataUpdateState);
        window.addEventListener("scroll", this.lazyFetchUserList);
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

  filterHandle = async () => {};

  updateHandle(userInfo: user) {
    window.localStorage.setItem("updateUser", JSON.stringify(userInfo));
    window.location.pathname = "/update-user";
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
    const isAdmin = authState.admin;
    const userList = dashboardState.userList as user[];
    return (
      <div>
        <Filter />
        <Container style={{ paddingTop: "50px" }}>
          <LazyLoad height={"80vh"}>
            <Table responsive>
              <thead>
                <tr>
                  <th>Avatar</th>
                  {isAdmin && <th>Email</th>}
                  <th>Full name</th>
                  {isAdmin && <th>Phone number</th>}
                  <th>Address</th>
                  {isAdmin && <th>DoB</th>}
                  {isAdmin && <th>Admin</th>}
                  {isAdmin && <th>Update</th>}
                </tr>
              </thead>

              <tbody>
                {userList.map((el) => (
                  <tr key={el.id}>
                    <td>
                      <img src={el.image} width={80} alt="User Avatar" />
                    </td>
                    {isAdmin && <td>{el.email}</td>}
                    <td>{el.name}</td>
                    {isAdmin && <td>{el.phone}</td>}
                    <td>{el.address}</td>
                    {isAdmin && <td>{el.dob?.slice(0, 10)}</td>}
                    {isAdmin && <td>{el.admin && <DoneIcon />}</td>}
                    {isAdmin && (
                      <td>
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "green",
                            borderRadius: "4px",
                          }}
                          onClick={() => this.updateHandle(el)}
                        >
                          <ModeEditIcon />
                        </button>
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "red",
                            borderRadius: "4px",
                          }}
                          onClick={() => this.deleteHandle(el.id as string)}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </LazyLoad>
        </Container>
      </div>
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
