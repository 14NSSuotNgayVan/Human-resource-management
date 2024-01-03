import React, { Component } from "react";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  }
});

class EgretSearchBox extends Component {
  state = {
    open: false
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <React.Fragment>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EgretSearchBox);
