import { Input, Button, Row, Col, Radio } from "antd";
import React from "react";
import { connect } from "react-redux";
import { login, signup } from "../../store/actions/auth.js";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

class LoginForm extends React.Component {
  state = {
    type: "login",

    username: "",
    password: "",

    //Customer
    phone: "",
    full_name: "",
    address: "",

    //Branch
    location: "",
    working_hours: "",
    address: "",
    description: "",
  };
  handleSubmit = () => {
    const {
      username,
      password,
      phone,
      full_name,
      address,
      location,
      working_hours,
      description,
    } = this.state;
    const { userType } = this.props;
    if (this.state.type == "login" || this.props.userType == "admin") {
      this.props.login({ username, password, type: this.props.userType });
    } else {
      let signupData = {
        username,
        password,
        type: this.props.userType,
      };

      if (userType == "branch") {
        let errors = {};
        if (!username) {
          errors["Email"] = "This field may not be empty";
        }
        if (!location) {
          errors["Location"] = "This field may not be empty";
        }
        if (!working_hours) {
          errors["Working hours"] = "This field may not be empty";
        }
        if (!address) {
          errors["Address"] = "This field may not be empty";
        }
        if (!password) {
          errors["Password"] = "This field may not be empty";
        }

        if (Object.keys(errors).length) {
          this.props.setError(errors);
          return;
        }
        signupData = {
          username,
          password,
          location,
          working_hours,
          address,
          description,
          type: this.props.userType,
        };
      }

      if (userType == "customer") {
        let errors = {};
        if (!username) {
          errors["Civil ID"] = "This field may not be empty";
        } else {
          if (username.length != 12) {
            errors["Civil ID"] = "Invalid civil ID";
          }
        }
        if (!password) {
          errors["Password"] = "This field may not be empty";
        }
        if (!phone) {
          errors["Phone"] = "This field may not be empty";
        }
        if (!full_name) {
          errors["Full name"] = "This field may not be empty";
        }
        if (!address) {
          errors["Address"] = "This field may not be empty";
        }
        console.log(errors);
        if (Object.keys(errors).length) {
          this.props.setError(errors);
          return;
        }
        signupData = {
          username,
          password,
          phone,
          full_name,
          address,
          type: this.props.userType,
        };
      }
      this.props.signup(signupData);
    }
  };

  onChangeField = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let { type } = this.state;
    const { userType } = this.props;
    if (userType == "admin") {
      type = "login";
    }
    return (
      <div>
        <Row gutter={[24, 24]} style={{ alignItems: "center" }}>
          {type == "login" && userType == "worker" && (
            <>
              <Col span={8} className="text-left">
                Username *
              </Col>
              <Col span={16}>
                <Input
                  size="large"
                  placeholder="Username"
                  onChange={this.onChangeField}
                  name="username"
                />
              </Col>
            </>
          )}

          {type == "signup" && userType == "customer" && (
            <>
              <Col span={8} className="text-left">
                Civil ID *
              </Col>
              <Col span={16}>
                <Input
                  size="large"
                  placeholder="Civil ID"
                  onChange={this.onChangeField}
                  name="username"
                />
              </Col>

              <Col span={8} className="text-left">
                Phone *
              </Col>
              <Col span={16}>
                <Input
                  size="large"
                  placeholder="Phone number"
                  onChange={this.onChangeField}
                  name="phone"
                />
              </Col>

              <Col span={8} className="text-left">
                Full name *
              </Col>
              <Col span={16}>
                <Input
                  size="large"
                  placeholder="Full name"
                  onChange={this.onChangeField}
                  name="full_name"
                />
              </Col>

              <Col span={8} className="text-left">
                Address *
              </Col>
              <Col span={16}>
                <Input
                  size="large"
                  placeholder="Address"
                  onChange={this.onChangeField}
                  name="address"
                />
              </Col>
            </>
          )}
          {type == "login" && userType == "customer" && (
            <>
              <Col span={8} className="text-left">
                Civil ID *
              </Col>
              <Col span={16}>
                <Input
                  size="large"
                  placeholder="Civil ID"
                  onChange={this.onChangeField}
                  name="username"
                />
              </Col>
            </>
          )}
          {type == "signup" && userType == "branch" && (
            <>
              <Col span={8} className="text-left">
                Email *
              </Col>
              <Col span={16}>
                <Input
                  size="large"
                  placeholder="Email"
                  onChange={this.onChangeField}
                  name="username"
                />
              </Col>

              <Col span={8} className="text-left">
                Location *
              </Col>
              <Col span={16}>
                <Input
                  size="large"
                  placeholder="Location"
                  onChange={this.onChangeField}
                  name="location"
                />
              </Col>

              <Col span={8} className="text-left">
                Working hours *
              </Col>
              <Col span={16}>
                <Input
                  size="large"
                  placeholder="Working hours (seperate intervals with a comma)"
                  onChange={this.onChangeField}
                  name="working_hours"
                />
              </Col>

              <Col span={8} className="text-left">
                Address *
              </Col>
              <Col span={16}>
                <Input
                  size="large"
                  placeholder="Address"
                  onChange={this.onChangeField}
                  name="address"
                />
              </Col>

              <Col span={8} className="text-left">
                Description
              </Col>
              <Col span={16}>
                <Input
                  size="large"
                  placeholder="Description"
                  onChange={this.onChangeField}
                  name="description"
                />
              </Col>
            </>
          )}
          {userType == "branch" && type == "login" && (
            <>
              <Col span={8} className="text-left">
                Email *
              </Col>
              <Col span={16}>
                <Input
                  size="large"
                  placeholder="Email"
                  onChange={this.onChangeField}
                  name="username"
                />
              </Col>
            </>
          )}
          {userType == "admin" && (
            <>
              <Col span={8} className="text-left">
                Username *
              </Col>
              <Col span={16}>
                <Input
                  size="large"
                  placeholder="Username"
                  onChange={this.onChangeField}
                  name="username"
                />
              </Col>
            </>
          )}
          <Col span={8} className="text-left">
            Password *
          </Col>
          <Col span={16}>
            <Input.Password
              size="large"
              placeholder="Password"
              prefix={<LockOutlined />}
              onChange={this.onChangeField}
              name="password"
            />
          </Col>

          {userType == "branch" && <></>}
        </Row>
        {userType != "admin" && userType != "worker" && (
          <div className="text-left">
            {type == "signup" ? "Already have an account?" : "New here?"}
            <Button
              type="link"
              onClick={() =>
                this.setState({ type: type == "login" ? "signup" : "login" })
              }
            >
              {type == "signup" ? "Login" : "Sign up"}
            </Button>
          </div>
        )}
        <div className="mt-3">
          <Button
            type="primary"
            size="large"
            className="w-100"
            onClick={this.handleSubmit}
          >
            {type == "signup" ? "Sign up" : "Login"}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //Syntax
    login: (values) => dispatch(login(values)),
    signup: (values) => dispatch(signup(values)),
    setError: (payload) => dispatch({ type: "SET_ERROR", payload: payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
