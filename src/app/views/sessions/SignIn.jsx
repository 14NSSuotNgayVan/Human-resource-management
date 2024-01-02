import React, { Component } from "react";
import {
  Card,
  Grid,
  Button,
  withStyles,
  CircularProgress
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { loginWithEmailAndPassword } from "../../redux/actions/LoginActions";
import { Helmet } from "react-helmet";

const styles = theme => ({
  wrapper: {
    position: "relative"
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    agreement: ""
  };
  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleFormSubmit = event => {
    // console.log(this.state);
    this.props.loginWithEmailAndPassword({ ...this.state });
  };
  render() {
    const { t } = this.props;
    let { email, password } = this.state;
    let { classes } = this.props;
    return (
      <div className="signup flex flex-center w-100 h-100vh">
        <div className="p-8">
          <Helmet>
            <title>
              {t("Dashboard.login")} | {t("web_site")}
            </title>
          </Helmet>
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-32 flex flex-center flex-middle h-100">
                  <img src="/assets/images/WebinarDefault.jpg" alt="" />                  
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-36 h-100 bg-light-gray position-relative">
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label={t("login.username")}
                      onChange={this.handleChange}
                      type="text"
                      name="email"
                      value={email.trim()}
                      validators={["required"]}
                      errorMessages={[t("staff.notify.errorMessages_required")]}
                    />
                    <TextValidator
                      className="mb-16 w-100"
                      label={t("login.password")}
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={password.trim()}
                      validators={["required"]}
                      errorMessages={[t("staff.notify.errorMessages_required")]}
                    />
                    <div className="flex flex-center mb-8">
                      <div className={classes.wrapper} style={{width: "100%"}}>
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={this.props.login.loading}
                          type="submit"
                          style={{width: "100%"}}
                        >
                          {t("login.title")}
                        </Button>
                        {this.props.login.loading && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-center">
                        <Button
                          className="text-primary"
                          onClick={() =>
                            this.props.history.push("/session/forgot-password")
                          }
                        >
                        {t("login.forgot_password")}
                        </Button>
                      </div>
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginWithEmailAndPassword: PropTypes.func.isRequired,
  login: state.login
});
export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps, { loginWithEmailAndPassword })(SignIn))
);
