import React from "react";
import { Dialog, Button, DialogActions, DialogTitle, IconButton, DialogContent, Icon} from "@material-ui/core";

const ConfirmationDialog = ({
  t,
  onConfirmDialogClose,
  text,
  title = "confirm",
  onYesClick,
  Yes,
  No
}) => {
  return (

      <Dialog open={true} maxWidth={"sm"} fullWidth={true}>
      <DialogTitle className={"draggableDialogTitle"} id="draggable-dialog-title">
        <span className="headerStyle">{title}</span>
        <IconButton className="buttonClose" onClick={onConfirmDialogClose}>
          <Icon color="error" title={t("close")}>
            close
          </Icon>
        </IconButton>
      </DialogTitle>
        <DialogContent dividers spacing={2} className="mh-70">
        <p>{text}</p>
        </DialogContent>
        <DialogActions spacing={4} className="flex flex-center flex-middle">
            <Button variant="contained" color="primary" onClick={onYesClick}>
              {Yes}
            </Button>
          <Button variant="contained" className="color-error" onClick={onConfirmDialogClose}>
          {No}
          </Button>
        </DialogActions>
    </Dialog>
    
  );
};

export default ConfirmationDialog;
