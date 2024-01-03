import React from "react";
import {
  MuiThemeProvider,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  getNotification,
  deleteAllNotification,
  deleteNotification
} from "../../redux/actions/NotificationActions";

function NotificationBar(props) {
  const {
    settings,
  } = props;


  return (
    <MuiThemeProvider theme={settings.themes[settings.activeTheme]}>

    </MuiThemeProvider>
  );
}

NotificationBar.propTypes = {
  settings: PropTypes.object.isRequired,
  notification: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  getNotification: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
  deleteAllNotification: PropTypes.func.isRequired,
  notification: state.notification,
  settings: state.layout.settings
});

export default withStyles({}, { withTheme: true })(
  connect(
    mapStateToProps,
    { getNotification, deleteNotification, deleteAllNotification }
  )(NotificationBar)
);
