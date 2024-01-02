import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton} from "@material-ui/core";
import { updateStaffAction } from "app/redux/actions/StaffActions";
import React, { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";

const AdditionalDialog = ({ t, handleCloseDialog, item,handleSubmitForm }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const handleSubmit = () => {
    if(handleSubmitForm){
      handleSubmitForm(content);
    }else
    {
      dispatch(
        updateStaffAction({
          ...item,
          additionalRequest: content,
          submitProfileStatus: "4",
        })
      );
    }

    
  };
  const onChange = (event) => {
    setContent(event.target.value.trim());
  };
  return (
    <>
      <Dialog open={true} maxWidth={"sm"} fullWidth={true}>
        <DialogTitle className={"draggableDialogTitle"} id="draggable-dialog-title">
          <span className="headerStyle">{t("leaderShipApproval.Additional")}</span>
          <IconButton className="buttonClose" onClick={handleCloseDialog}>
            <Icon color="error" title={t("close")}>
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit} className="p-8">
          <DialogContent dividers spacing={2} className="overflow-none">
              <TextValidator
                className={"w-100 mb-16"}
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("leaderShipApproval.AdditionalContent")}
                  </span>
                }
                type="text"
                name={"additionalRequest"}
                onChange={(e) => onChange(e)}
                value={content}
                validators={["required","maxStringLength:1000"]}
                errorMessages={[t("staff.notify.errorMessages_required"),`${t("staff.notify.invalidStringContent")}(1000 kí tự)`]}
                size="small"
              />
          </DialogContent>
          <DialogActions spacing={4} className="flex flex-center flex-middle">
              <Button variant="contained" color="primary" type="submit">
                {t("general.save")}
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
export default AdditionalDialog;
