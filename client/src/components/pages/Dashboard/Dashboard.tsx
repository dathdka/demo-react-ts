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
import { Container, Table, Button } from "react-bootstrap";
import LazyLoad from "react-lazy-load";
import { manageUser } from "../../../types/manageUser";
import { deleteUser } from "../../../services/api";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Filter } from "../../shared/Filter";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
class DashBoard extends React.Component {
  static relativeError: number = 10;

  constructor(props: any) {
    super(props);
    this.state = { isSortAsc: true };
  }

  lazyFetchUserList = async () => {
    const { dashboardState, alert } = this.props as any;
    const localState = this.state as any
    const currentScrollPos = window.pageYOffset;
    const curPos =
      DashBoard.relativeError * dashboardState.search.currentPage * 40;

    if (currentScrollPos - curPos > curPos) {
      window.removeEventListener("scroll", this.lazyFetchUserList);
      const response = await getUserByName(
        dashboardState.search.keyword,
        dashboardState.search.currentPage,
        dashboardState.filter.isAdmin,
        dashboardState.filter.addressKey,
        localState.isSortAsc
      );
      //notification error if any

      if (typeof response === 'string')
        alert({ isError: true, open: true, message: response });
      else {
        //update store after fetch api
        const { retriveMoreUser } = this.props as any;
        const dataUpdateState: manageUser = {
          userList: response.results as user[],
          search: {
            keyword: dashboardState.search.keyword,
            currentPage: dashboardState.search.currentPage + 1,
          },
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

    if (typeof response === 'string' )
      alert({ isError: true, open: true, message: response });
    else {
      const { initUserList } = this.props as any;
      const actionPayload: user[] = response.results;
      initUserList(actionPayload);
    }
  }


  async componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{ isSortAsc: boolean }>,
    snapshot?: any
  ): Promise<void> {
    const curState = this.state as any;
    if (curState.isSortAsc !== prevState.isSortAsc) {
      
      const { alert } = this.props as any;
      const {resetUserListBySearch} = this.props as any
      const { dashboardState } = this.props as any;
      const response = await getUserByName("",0,dashboardState.filter.isAdmin,dashboardState.filter.addressKey,curState.isSortAsc);
      if (typeof response === "string")
        alert({ isError: true, open: true, message: response });
      else {
        const { initUserList } = this.props as any;
        const actionPayload: user[] = response.results;
        resetUserListBySearch({keyword: dashboardState.search.keyword, currentPage : 1})
        initUserList(actionPayload);
      }
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

  redirectToInfoPage = (userId : string) =>{
    const shareUrl = `http://localhost:3000/info?id=${userId}`
    window.location.href = shareUrl
  }

  componentWillUnmount(): void {
    window.removeEventListener("scroll", this.lazyFetchUserList);
  }
  render(): React.ReactNode {
    const { dashboardState, authState } = this.props as any;
    const isAdmin = authState.admin;
    const userList = dashboardState.userList as user[];
    const getName = userList.map(el =>el.name)
    
    const localState = this.state as any;
    return (
      <div>
        <Filter />
        <Container >
          <LazyLoad height={"80vh"}>
            <Table className="dashboard-table" responsive>
              <thead>
                <tr>
                  <th>Avatar</th>
                  {isAdmin && <th>Email</th>}
                  <th>
                    Full name
                    {localState.isSortAsc ? (
                      <a onClick={() => this.setState({ isSortAsc: false })}>
                        <ArrowDropDownIcon />
                      </a>
                    ) : (
                      <a onClick={() => this.setState({ isSortAsc: true })}>
                        <ArrowDropUpIcon />
                      </a>
                    )}
                  </th>
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
                        <Button
                          variant="success"
                          onClick={() => this.updateHandle(el)}
                        >
                          <ModeEditIcon />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => window.confirm('you want to delete this user') && this.deleteHandle(el.id as string)}
                        >
                          <DeleteIcon />
                        </Button>
                        <Button
                          variant="primary"
                          onClick={()=>this.redirectToInfoPage(el.id as string)}
                         >
                          <VisibilityIcon/>
                        </Button>
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
