import { GENDER } from "app/constants/staffConstant";
import React from "react";
import { SelectValidator, TextValidator, ValidatorForm } from "react-material-ui-form-validator";
const { Dialog, Paper, IconButton, Icon, DialogTitle, DialogContent, Grid, DialogActions, Button, FormControl, MenuItem } = require("@material-ui/core");
const { default: Draggable } = require("react-draggable");

const AddStaffDialog = (props) => {
  const { staff, handleClose, t } = props;
  return (
    <Dialog
      open={true}
      PaperComponent={(props) => (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
          <Paper {...props} />
        </Draggable>
      )}
      maxWidth={"md"}
      fullWidth={true}
    >
      <DialogTitle className={"draggableDialogTitle"} id="draggable-dialog-title">
        <span className="headerStyle">{staff ? t("staff.action.updateStaff") : t("staff.action.addStaff")}</span>
        <IconButton className="buttonClose" onClick={() => handleClose()}>
          <Icon color="error" title={t("close")}>
            close
          </Icon>
        </IconButton>
      </DialogTitle>
      <ValidatorForm className={"validatorForm"}>
        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextValidator
                className={"w-100 mb-16"}
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.name")}
                  </span>
                }
                type="text"
                name="name"
                value={staff?.name || ""}
                validators={["required"]}
                errorMessages={[t("general.errorMessages_required")]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextValidator
                className={"w-100 mb-16"}
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.code")}
                  </span>
                }
                type="text"
                name="code"
                value={staff?.code || ""}
                validators={["required", "matchRegexp:^nv\\d{5}$", "minStringLength:6", "maxStringLength:10"]}
                errorMessages={[
                  t("general.errorMessages_required"),
                  t("general.invalidCodeFormat"),
                  t("general.minLength_required"),
                  t("general.maxLength_required"),
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControl fullWidth={true} variant="outlined" className="" size="small">
                <SelectValidator
                  variant="outlined"
                  size="small"
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.gender_display")}
                    </span>
                  }
                  value={staff?.provinceId || ""}
                  onChange={(provinceId) =>{}}
                  validators={["required"]}
                  errorMessages={[t("general.errorMessages_required")]}
                  inputProps={{
                    name: "provinces",
                    id: "provinces",
                  }}
                  className="w-100 mb-16"
                >
                  {GENDER?.map((item) => {
                    return (
                      <MenuItem key={item?.id} value={item?.id}>
                        {t(`staff.gender.${item?.name}`)}
                      </MenuItem>
                    );
                  })}
                </SelectValidator>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions spacing={4} className="flex flex-center flex-middle">
          <Button variant="contained" color="secondary" onClick={() => props.handleClose()}>
            {t("general.cancel")}
          </Button>
          <Button variant="contained" color="primary" type="submit">
            {t("general.save")}
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
};
export default AddStaffDialog;
