import React from "react";
import { manageUser as AppState, manageUser } from "../../../types/manageUser";
import { connect } from "react-redux";
import { RootState } from "../../../redux/store";
import { Action, Dispatch } from "redux";
import { loadUser, updateLazyloadPosition } from "../../Dashboard/Manage.slice";
import { getUserByName } from "../../../services/api";

interface dashboardStatus {
    state : manageUser,
    action : {
        loadUser: any,
        updateLazyloadPosition: any
    }
}

class DashBoard extends React.Component{
    render(): React.ReactNode {
        console.log(this.props);
        const {dashboardState, loadUser, updateLazyloadPosition} = this.props
    return <>DashBoard</>;
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    dashboardState: state.manage,
  };
};

const mapDispatchToProps = () => {
  return {
    loadUser,
    updateLazyloadPosition
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(DashBoard);
