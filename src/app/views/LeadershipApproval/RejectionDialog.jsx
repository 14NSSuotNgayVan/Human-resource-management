import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
  Paper,
} from "@material-ui/core";
import moment from "moment";
import React, {useState } from "react";
import Draggable from "react-draggable";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const RejectionDialog = (props) => {
  const { t, handleCloseDialog, item } = props;
  const [formData,setFormData] = useState({
    rejectionDate:moment().format("YYYY-MM-DD"),
    reasonForRejection:""
  });
  const handleSubmit = () => {};
  const handleChange = (event) => {
    event.persist();
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  };
  return (
      <Dialog
        open={true}
        maxWidth={"sm"}
        fullWidth={true}
      >
        <DialogTitle className={"draggableDialogTitle"} id="draggable-dialog-title">
          <span className="headerStyle">{t("leaderShipApproval.rejection")}</span>
          <IconButton className="buttonClose" onClick={handleCloseDialog}>
            <Icon color="error" title={t("close")}>
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit} className="p-8">
          <DialogContent dividers spacing={1}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("leaderShipApproval.rejectionDate")}
                    </span>
                  }
                  onChange={handleChange}
                  type="date"
                  name="rejectionDate"
                  value={formData?.rejectionDate}
                  validators={["required"]}
                  errorMessages={[t("staff.notify.errorMessages_required")]}
                  variant="outlined"
                  size="small"
                  inputProps={{
                    min: moment().format("YYYY-MM-DD"),
                  }}      
                />
                <TextValidator
                  className={"w-100 mb-16"}
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("leaderShipApproval.reasonForRejection")}
                    </span>
                  }
                  type="text"
                  name="reasonForRejection"
                  value={formData?.reasonForRejection}
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={[t("staff.notify.errorMessages_required")]}
                  variant="outlined"
                  size="small"
                />
          </DialogContent>
          <DialogActions spacing={4} className="flex flex-center flex-middle">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={() => {
                handleSubmit();
              }}
            >
              {t("general.reject")}
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCloseDialog}>
              {t("general.cancel")}
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
  );
};
export default RejectionDialog;
