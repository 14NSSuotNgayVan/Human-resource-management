import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton } from "@material-ui/core";
import { updateStaffAction } from "app/redux/actions/StaffActions";
import moment from "moment";
import React, { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";

const RejectionDialog = (props) => {
  const dispatch = useDispatch();
  const { t, handleCloseDialog, item,isManage,tittle,handleSubmitForm } = props;
  const [formData, setFormData] = useState({...item});
  const handleSubmit = () => {
    if(handleSubmitForm){
      handleSubmitForm(formData?.rejectionDate,formData[tittle]);
    }else
    if(isManage){
      dispatch(
        updateStaffAction({
          ...formData,
          submitProfileStatus: "9",
        })
      );
    }else{
      dispatch(
        updateStaffAction({
          ...formData,
          submitProfileStatus: "5",
        })
      );
    }

  };
  const handleChange = (event) => {
    event.persist();
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <Dialog open={true} maxWidth={"sm"} fullWidth={true}>
      <DialogTitle className={"draggableDialogTitle"} id="draggable-dialog-title">
        <span className="headerStyle">{t("leaderShipApproval.rejection")}</span>
        <IconButton className="buttonClose" onClick={handleCloseDialog}>
          <Icon color="error" title={t("close")}>
            close
          </Icon>
        </IconButton>
      </DialogTitle>
      <ValidatorForm onSubmit={handleSubmit} className="p-8">
        <DialogContent dividers spacing={2}>
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
                name={ isManage ? "refuseEndProfileDay":"rejectionDate"}
                value={ (isManage ? formData?.refuseEndProfileDay : formData?.rejectionDate) ?? moment().format("YYYY-MM-DD")}
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
              <TextValidator
                className={"w-100 mb-16"}
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("leaderShipApproval.reasonForRejection")}
                  </span>
                }
                type="text"
                name= { tittle || (isManage ? "reasonForRefuseEndProfile" : "reasonForRejection")}
                value={ formData[tittle] ||  (isManage ? formData?.reasonForRefuseEndProfile : formData?.reasonForRejection) || ""}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={[t("staff.notify.errorMessages_required")]}
                
                size="small"
              />
        </DialogContent>
        <DialogActions spacing={4} className="flex flex-center flex-middle">
            <Button variant="contained" color="primary" type="submit">
              {t("general.reject")}
            </Button>
          <Button variant="contained" className="color-error" onClick={handleCloseDialog}>
            {t("general.cancel")}
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
};
export default RejectionDialog;
