import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
} from "@material-ui/core";
import { ADDRESS_REGEX, NAME_REGEX } from "app/constants/staffConstant";
import { createExperiences, updateExperience } from "app/redux/actions/ExperienceAction";
import { getExperiencesItem } from "app/redux/selectors/ExperienceSelector";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";
import { getNumberOfLines } from "utils";

const ExperienceDialog = ({ t, handleCloseDialog, staffId,}) => {
  const dispatch = useDispatch();
  const currentItem = useSelector(getExperiencesItem);
  const [experience,setExperience] = useState({});
  const [reasonRow, setReasonRow] = useState(4);
  const [descRow, setDescRow] = useState(4);

  const exForm = useRef(null);
  useEffect(() => {
    setReasonRow(getNumberOfLines(experience?.leavingReason));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experience?.leavingReason]);
  useEffect(() => {
    setDescRow(getNumberOfLines(experience?.jobDescription));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experience?.jobDescription]);
  useEffect(()=>{
    setExperience(currentItem);
  },[currentItem]);
  
  const handleSubmit = () => {
    if(currentItem?.id){
      dispatch(updateExperience({...experience}));
    }else{
      dispatch(createExperiences(staffId,experience));
    }
    handleCloseDialog();
  };
  const onChange = (event) => {
    const { name, value } = event.target;
    setExperience({
      ...experience,
      [name]: value,
    });
  };
  return (
    <>
      <Dialog open={true} maxWidth={"md"} fullWidth={true}>
        <DialogTitle className={"draggableDialogTitle"} id="draggable-dialog-title">
          <span className="headerStyle">{t("staff.Experience")}</span>
          <IconButton className="buttonClose" onClick={handleCloseDialog}>
            <Icon color="error" title={t("close")}>
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <ValidatorForm onSubmit ={handleSubmit} className="p-8" ref={exForm}>
          <DialogContent dividers spacing={1} className="overflow-none">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextValidator
                  className={"w-100 mb-16"}
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.experience.companyName")}
                    </span>
                  }
                  type="text"
                  name="companyName"
                  onChange={(e) => onChange(e, "companyName")}
                  value={experience?.companyName || ""}
                  validators={["required",`matchRegexp:${NAME_REGEX}`]}
                  errorMessages={[t("staff.notify.errorMessages_required"), t("staff.notify.invalidName")]}
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
                      {t("staff.address")}
                    </span>
                  }
                  type="text"
                  name="companyAddress"
                  onChange={(e) => onChange(e, "companyAddress")}
                  value={experience?.companyAddress || ""}
                  validators={["required",`matchRegexp:${ADDRESS_REGEX}`]}
                  errorMessages={[t("staff.notify.errorMessages_required"),t("staff.notify.inValidAddress")]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.experience.startDate")}
                    </span>
                  }
                  onChange={(e) => onChange(e, "startDate")}
                  type="date"
                  name="startDate"
                  inputProps={{
                    max:moment().format("YYYY-MM-DD")
                  }}
                  value={experience?.startDate ? moment(experience?.startDate).format("YYYY-MM-DD") : ""}
                  validators={["required"]}
                  errorMessages={[t("staff.notify.errorMessages_required")]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.experience.endDate")}
                    </span>
                  }
                  inputProps={{
                    max:moment().format("YYYY-MM-DD"),
                    min:experience?.startDate
                  }}
                  onChange={(e) => onChange(e, "endDate")}
                  type="date"
                  name="endDate"
                  value={experience?.endDate ? moment(experience?.endDate).format("YYYY-MM-DD") : ""}
                  validators={["required"]}
                  errorMessages={[t("staff.notify.errorMessages_required")]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextValidator
                multiline
                rows={descRow}
                  className={"w-100 mb-16"}
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.experience.jobDescription")}
                    </span>
                  }
                  type="text"
                  name="jobDescription"
                  onChange={(e) => onChange(e, "jobDescription")}
                  value={experience?.jobDescription || ""}
                  validators={["required","maxStringLength:250"]}
                  errorMessages={[t("staff.notify.errorMessages_required"),t("staff.notify.invalidStringContent")]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextValidator
                  multiline
                  rows={reasonRow}
                  fullWidth
                  variant="outlined"
                  className={"w-100 mb-16"}
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.experience.leavingReason")}
                    </span>
                  }
                  type="text"
                  name="leavingReason"
                  onChange={(e) => onChange(e, "leavingReason")}
                  value={experience?.leavingReason || ""}
                  validators={["required","maxStringLength:250"]}
                  errorMessages={[t("staff.notify.errorMessages_required"),t("staff.notify.invalidStringContent")]}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions spacing={4} className="flex flex-center flex-middle">
            <Button variant="contained" color="primary" type={"submit"}>
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
export default ExperienceDialog;
