import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton, Paper } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const ApprovalDialog = ({ t, handleCloseDialog,item }) => {
    const [appointmentDate,setAppointmentDate] = useState(moment().format("YYYY-MM-DD")); 
  useEffect(() => {
    ValidatorForm.addValidationRule("isAfterDay", (value) => {
      const date = new Date(value);
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1);
      return date > currentDate;
    });
    return () => {
      ValidatorForm.removeValidationRule("isAfterDay");
    };
  }, []);
  const handleSubmit = () => {

  };
  const onChange = (event) => {
    setAppointmentDate(event.target.value);
  };
  return (
    <>
      <Dialog
        open={true}
        PaperComponent={(props) => (
          <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
          </Draggable>
        )}
        maxWidth={"sm"}
        fullWidth={true}
      >
        <DialogTitle className={"draggableDialogTitle"} id="draggable-dialog-title">
          <span className="headerStyle">{t("leaderShipApproval.ApprovalConfirm")}</span>
          <IconButton className="buttonClose" onClick={handleCloseDialog}>
            <Icon color="error" title={t("close")}>
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent dividers spacing={1}>
          <ValidatorForm onSubmit={handleSubmit} className="p-8">
            <TextValidator
              className="w-100 mb-16"
              label={
                <span className="inputLabel">
                  <span style={{ color: "red" }}> * </span>
                  {t("leaderShipApproval.appointmentDate")}
                </span>
              }
              onChange={(e) => onChange(e)}
              type="date"
              name="appointmentDate"
              value={appointmentDate}
              validators={["required", "isAfterDay"]}
              errorMessages={[t("staff.notify.errorMessages_required"), t("staff.notify.invalidAppointmentDate")]}
              variant="outlined"
              size="small"
            />
          </ValidatorForm>
        </DialogContent>
        <DialogActions spacing={4} className="flex flex-center flex-middle">
          <Button variant="contained" color="primary" onClick={() => {handleSubmit()}}>
            {t("general.approve")}
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCloseDialog}>
            {t("general.cancel")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ApprovalDialog;
