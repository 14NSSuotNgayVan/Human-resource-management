import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, IconButton } from "@material-ui/core";
import { updateStaffAction } from "app/redux/actions/StaffActions";
import { staffSelector } from "app/redux/selectors/StaffSelector";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";

const SaveProfileDialog = (props) => {
  const dispatch = useDispatch();
  const staff = useSelector(staffSelector);
  const { t, handleCloseDialog } = props;
  const [formData, setFormData] = useState({});
  const fixedNumberSave = `NL${moment().format('MM')}${moment().format('YYYY')}/`;
  useEffect(() => {
    setFormData({
      ...staff,
      numberSaved: fixedNumberSave
    });
  }, [staff,fixedNumberSave]);
  const handleSubmit = () => {
    dispatch(
      updateStaffAction({
        ...formData,
        submitProfileStatus: "0",
      })
    );
    handleCloseDialog();
  };
  const handleChange = (event) => {
    event.persist();
    const { name, value } = event.target;
    let newValue = value;
    if (!newValue.startsWith(fixedNumberSave)) {
        setFormData({
        ...formData,
        numberSaved: fixedNumberSave,
        });
    } else {
        setFormData({
        ...formData,
        [name]: value,
        });
    }
  };
  return (
    <Dialog open={true} maxWidth={"sm"} fullWidth={true}>
      <DialogTitle className={"draggableDialogTitle"} id="draggable-dialog-title">
        <span className="headerStyle">{t("endStaff.saveProfile")}</span>
        <IconButton className="buttonClose" onClick={handleCloseDialog}>
          <Icon color="error" title={t("close")}>
            close
          </Icon>
        </IconButton>
      </DialogTitle>
      <ValidatorForm onSubmit={handleSubmit} className="p-8">
        <DialogContent dividers spacing={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextValidator
              disabled
                className="w-100 mb-16"
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("endStaff.decisionDay")}
                  </span>
                }
                onChange={handleChange}
                type="date"
                name={"decisionDay"}
                value={formData?.decisionDay ?? moment().format("YYYY-MM-DD")}
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
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextValidator
                className={"w-100 mb-16"}
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("endStaff.numberSaved")}
                  </span>
                }
                type="text"
                name={"numberSaved"}
                value={formData?.numberSaved}
                onChange={handleChange}
                validators={["required", `matchRegexp:^${fixedNumberSave}\\d{3}$`]}
                errorMessages={[t("staff.notify.errorMessages_required"),t(`Mã nộp lưu phải có định dạng ${fixedNumberSave}+ 3 số bất kỳ`)]}
                size="small"
              />
            </Grid>
          </Grid>
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
  );
};
export default SaveProfileDialog;
