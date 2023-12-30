import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton, Paper } from "@material-ui/core";
import { updateStaffAction } from "app/redux/actions/StaffActions";
import React, { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";

const AdditionalDialog = ({ t, handleCloseDialog, item, iShowAdditional }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const handleSubmit = () => {
    dispatch(
      updateStaffAction({
        ...item,
        additionalRequest: content,
        submitProfileStatus: "4",
      })
    );
  };
  const onChange = (event) => {
    setContent(event.target.value.trim());
  };
  return (
    <>
      <Dialog open={true} maxWidth={"sm"} fullWidth={true}>
        <DialogTitle className={"draggableDialogTitle"} id="draggable-dialog-title">
          <span className="headerStyle">{iShowAdditional ? t("leaderShipApproval.AdditionalContent") : t("leaderShipApproval.Additional")}</span>
          <IconButton className="buttonClose" onClick={handleCloseDialog}>
            <Icon color="error" title={t("close")}>
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit} className="p-8">
          <DialogContent dividers spacing={1} className="overflow-none">
            {!iShowAdditional && (
              <TextValidator
                className={"w-100 mb-16"}
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("leaderShipApproval.AdditionalContent")}
                  </span>
                }
                type="text"
                name="additionalRequest"
                onChange={(e) => onChange(e, "additionalRequest")}
                value={content}
                validators={["required"]}
                errorMessages={[t("staff.notify.errorMessages_required")]}
                variant="outlined"
                size="small"
              />
            )}
            {iShowAdditional && item?.additionalRequest && <p>{item?.additionalRequest}</p>}
          </DialogContent>
          <DialogActions spacing={4} className="flex flex-center flex-middle">
            {!iShowAdditional && (
              <Button variant="contained" color="primary" type="submit">
                {t("general.save")}
              </Button>
            )}
            <Button variant="contained" className="color-error" onClick={handleCloseDialog}>
              {t("general.cancel")}
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </>
  );
};
export default AdditionalDialog;
