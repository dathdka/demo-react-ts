import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { forgetPassword } from "../../../types/forgetPassword";
import { sendOTP, setNewPassword } from "../../../services/api";
import { connect } from "react-redux";
import { setAlert } from "../../alert/alert.slice";

class ForgetPassword extends React.Component {
  constructor(props: any) {
    super(props);
    const initState: forgetPassword = {
      email: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    };
    this.state = initState;
  }

  async sendOTP() {
    const curState: forgetPassword = this.state as any;
    const { alert } = this.props as any;
    const response = await sendOTP(curState.email);
    if (typeof response === "string")
      alert({ message: response, isError: true, open: true });
    else
      alert({ message: "please check your email!", isError: false, open: true });
  }

  async resetHandle() {
    const curState: forgetPassword = this.state as any;
    const { alert } = this.props as any;
    
    if(curState.confirmPassword !== curState.newPassword)
        alert({message : "password and confirm password doesn't match",isError: true, open: true})
    else{
        const response = await setNewPassword(curState)
        if(typeof response === 'string')
            alert({message : response,isError: true, open: true})
        else
            alert({message : "new password has been set",isError: true, open: true})
    }
  }

  render(): React.ReactNode {
    return (
      <>
        <Row>
          <Col></Col>
          <Col>
            <h1>Forget Password</h1>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <div className="forgetpage__form--box">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                  <Button
                    variant="success"
                    onClick={(e) => {
                      this.sendOTP();
                    }}
                  >
                    Send OTP
                  </Button>
                </div>
                <Form.Text className="text-muted">
                  We'll send OTP to your email!
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="OTP"
                  onChange={(e) => this.setState({ otp: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="New Password"
                  onChange={(e) =>
                    this.setState({ newPassword: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  onChange={(e) =>
                    this.setState({ confirmPassword: e.target.value })
                  }
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={(e) => {
                  this.resetHandle();
                }}
              >
                Submit
              </Button>

              <Button
                variant="warning"
                onClick={(e) => {
                  window.location.pathname = '/login'
                }}
              >
                Back To Login
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </>
    );
  }
}

const mapDispatchToProps = {
  alert: setAlert,
};

export default connect(null, mapDispatchToProps)(ForgetPassword);
