import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Icon,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import { LEADER, LEADER_POSITION } from "app/constants/staffConstant";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SelectValidator, ValidatorForm } from "react-material-ui-form-validator";
import { getSalariesItem } from "app/redux/selectors/SalarySelector";
import { getProcessItem } from "app/redux/selectors/ProcessSelector";
import { staffSelector } from "app/redux/selectors/StaffSelector";
const ManageSendLeader = ({ handleCloseDialog, t, handleSubmit, isSalary, isProcess }) => {
  const salaryItem = useSelector(getSalariesItem);
  const processData = useSelector(getProcessItem);
  const staff = useSelector(staffSelector);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isSalary)
      setFormData({
        ...formData,
        ...salaryItem,
      });
    if (isProcess)
      setFormData({
        ...formData,
        ...processData,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salaryItem, processData]);
  const onChange = (event, field) => {
    const { value } = event.target;
    switch (field) {
      case "leaderId": {
        setFormData({
          ...formData,
          leaderId: value,
          leaderName: LEADER?.find((item) => item.id === value)?.leaderName,
          leaderPosition: LEADER?.find((item) => item.id === value)?.leaderPosition,
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
        <ValidatorForm
          onSubmit={() => {
            handleSubmit(formData, staff);
          }}
          className="p-8"
        >
          <DialogContent dividers spacing={2} className="overflow-none mh-70">
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth={true} className="" size="small">
                  <SelectValidator
                    size="small"
                    label={
                      <span className="inputLabel">
                        <span style={{ color: "red" }}> * </span>
                        {t("sendLeader.leaderName")}
                      </span>
                    }
                    value={formData?.leaderId ?? ""}
                    inputProps={{
                      readOnly: formData?.leaderId && formData?.submitProfileStatus === "4",
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
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth={true} className="" size="small">
                  <SelectValidator
                    size="small"
                    inputProps={{
                      readOnly: true,
                    }}
                    label={
                      <span className="inputLabel">
                        <span style={{ color: "red" }}> * </span>
                        {t("sendLeader.leaderPosition")}
                      </span>
                    }
                    value={LEADER.find(data=>data?.id===formData?.leaderId)?.leaderPosition ?? ""}
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
            </Grid>
          </DialogContent>
          <DialogActions spacing={4} className="flex flex-center flex-middle">
            <Button variant="contained" color="primary" type="submit">
              {t("sendLeader.sendLeader_display")}
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
export default ManageSendLeader;
