import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, Icon, IconButton, MenuItem } from "@material-ui/core";
import { LEADER, LEADER_POSITION } from "app/constants/staffConstant";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SelectValidator, TextValidator, ValidatorForm } from "react-material-ui-form-validator";
const SendLeaderDialog = ({handleCloseDialog,t,item}) => {
    const [formData,setFormData] = useState({});
    useEffect(() =>{
        setFormData({
            ...item
        })
    },[item]);
    const onChange = (event,field) => {
        const { value } = event.target;
        switch(field){
            case "leaderId":{
                setFormData({
                    ...formData,
                    leaderId: value,
                    leaderPosition: LEADER.find(item=>item.id===value)?.leaderPosition
                  });
                  break;
            }
            default: {
                setFormData({
                  ...formData,
                  [field]: value,
                });
            }
        }
      };
    const handleSubmit =()=>{
        
    }

  return (
    <>
      <Dialog open={true} maxWidth={"md"} fullWidth={true}>
        <DialogTitle className={"draggableDialogTitle"} id="draggable-dialog-title">
          <span className="headerStyle">{t("sendLeader.sendLeader_display")}</span>
          <IconButton className="buttonClose" onClick={handleCloseDialog}>
            <Icon color="error" title={t("close")}>
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <ValidatorForm onSubmit={handleSubmit} className="p-8">
          <DialogContent dividers spacing={1} className="overflow-none">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("sendLeader.submitDay")}
                    </span>
                  }
                  inputProps={{
                    min: moment().format("YYYY-MM-DD"),
                  }}
                  onChange={(e) => onChange(e, "submitDay")}
                  type="date"
                  name="submitDay"
                  value={formData?.submitDay ? moment(formData?.submitDay).format("YYYY-MM-DD") : ""}
                  validators={["required"]}
                  errorMessages={[t("staff.notify.errorMessages_required")]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <FormControl fullWidth={true} variant="outlined" className="" size="small">
                  <SelectValidator
                    variant="outlined"
                    size="small"
                    label={
                      <span className="inputLabel">
                        <span style={{ color: "red" }}> * </span>
                        {t("sendLeader.leaderName")}
                      </span>
                    }
                    value={formData?.leaderId?? ""}
                    inputProps={{
                        readOnly: formData?.leaderId && formData?.submitProfileStatus ==="4"
                      }}
                    onChange={(e) => onChange(e, "leaderId")}
                    validators={["required"]}
                    errorMessages={[t("staff.notify.errorMessages_required")]}
                    className="w-100 mb-16"
                  >
                    {LEADER?.map((item) => {
                      return (
                        <MenuItem key={item?.id} value={item?.id}>
                          {item?.leaderName}
                        </MenuItem>
                      );
                    })}
                  </SelectValidator>
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <FormControl fullWidth={true} variant="outlined" className="" size="small">
                  <SelectValidator
                    variant="outlined"
                    size="small"
                    inputProps={{
                        readOnly: true
                      }}      
                    label={
                      <span className="inputLabel">
                        <span style={{ color: "red" }}> * </span>
                        {t("sendLeader.leaderPosition")}
                      </span>
                    }
                    value={formData?.leaderPosition ?? ""}
                    onChange={(e) => onChange(e, "leaderPosition")}
                    validators={["required"]}
                    errorMessages={[t("staff.notify.errorMessages_required")]}
                    className="w-100 mb-16"
                  >
                    {LEADER_POSITION?.map((item) => {
                      return (
                        <MenuItem key={item?.id} value={item?.id}>
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                  </SelectValidator>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextValidator
                  fullWidth
                  variant="outlined"
                  className={"w-100 mb-16"}
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("sendLeader.submitContent")}
                    </span>
                  }
                  type="text"
                  name="submitContent"
                  onChange={(e) => onChange(e, "submitContent")}
                  value={formData?.submitContent || ""}
                  validators={["required", "maxStringLength:500"]}
                  errorMessages={[t("staff.notify.errorMessages_required"), t("staff.notify.invalidStringContent")]}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions spacing={4} className="flex flex-center flex-middle">
            <Button
              variant="contained"
              color="primary"
              type ="submit"
            >
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
export default SendLeaderDialog;
