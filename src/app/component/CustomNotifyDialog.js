import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton } from "@material-ui/core";
import React from "react";
const NotifyDialog = ({ t, handleCloseDialog, item }) => {
  return (
    <>
      <Dialog
        open={true}
        maxWidth={"sm"}
        fullWidth={true}
      >
        <DialogTitle className={"draggableDialogTitle"} id="draggable-dialog-title">
          <span className="headerStyle">{item?.tittle}</span>
          <IconButton className="buttonClose" onClick={handleCloseDialog}>
            <Icon color="error" title={t("close")}>
              close
            </Icon>
          </IconButton>
        </DialogTitle>
          <DialogContent dividers spacing={2} className="mh-70">
            <p>{item?.message}</p>
          </DialogContent>
          <DialogActions spacing={4} className="flex flex-center flex-middle">
            <Button variant="contained" className="color-error" onClick={handleCloseDialog}>
              {t("general.cancel")}
            </Button>
          </DialogActions>
      </Dialog>
    </>
  );
};
export default NotifyDialog;
