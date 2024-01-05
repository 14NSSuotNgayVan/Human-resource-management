import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton} from "@material-ui/core";
import { updateStaffAction } from "app/redux/actions/StaffActions";
import moment from "moment";
import React, { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";

const ApprovalDialog = ({ t, handleCloseDialog, item }) => {
  const dispatch = useDispatch();
  const [appointmentDate, setAppointmentDate] = useState(moment().format("YYYY-MM-DD"));
  const handleSubmit = () => {
    dispatch(updateStaffAction({
      ...item,
      appointmentDate:appointmentDate,
      submitProfileStatus:"3"
    }));
    handleCloseDialog();
  };
  const onChange = (event) => {
    setAppointmentDate(event.target.value);
  };
  return (
    <>
      <Dialog
        open={true}
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
        <ValidatorForm onSubmit={handleSubmit} className="p-8">
          <DialogContent dividers spacing={2} className="mh-70">
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
              validators={["required"]}
              errorMessages={[t("staff.notify.errorMessages_required")]}
              InputLabelProps={{
                shrink: true,
              }}  
              size="small"
              inputProps={{
                min: moment().format("YYYY-MM-DD"),
              }}
            />
          </DialogContent>
          <DialogActions spacing={4} className="flex flex-center flex-middle">
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              {t("general.approve")}
            </Button>
            <Button variant="contained" className="color-error" onClick={handleCloseDialog}>
              {t("general.cancel")}
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </>
  );
};
export default ApprovalDialog;
