import { PhotoCamera } from "@material-ui/icons";
import { GENDER, NAME_REGEX, TEAM } from "app/constants/staffConstant";
import { addStaffAction, setStaffImage, updateStaffAction } from "app/redux/actions/StaffActions";
import { fileSelector, imageSelector } from "app/redux/selectors/StaffSelector";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const { Grid, IconButton, MenuItem, FormControl } = require("@material-ui/core");
const { ValidatorForm, TextValidator, SelectValidator } = require("react-material-ui-form-validator");
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
const StaffInformation = (props) => {
  const { t, formRef, handleCloseDialog } = props;
  const [staff, setStaff] = useState(props?.item);
  const staffImageUrl = useSelector(imageSelector);
  const file = useSelector(fileSelector);
  const dispatch = useDispatch();
  const isValidFileSize = (file) => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        return false;
      }
    }
    return true;
  };
  const isImage = (file) => {
    if (file) {
      const imageTypes = ["image/jpeg", "image/png", "image/gif"];
      console.log(imageTypes.indexOf(file.type));
      if (imageTypes.indexOf(file.type) === -1) {
        return false;
      }
    }
    return true;
  };
  const onChange = (event, field) => {
    switch (field) {
      case "image": {
        const file = event.target.files[0];
        if (!isImage(file)) {
          toast.error(t("staff.notify.isNotImage"));
        } else if (!isValidFileSize(file)) {
          toast.error(t("staff.notify.inValidFileSize"));
        } else {
          const reader = new FileReader();
          reader.onloadend = () => {
            dispatch(setStaffImage(reader.result, file));
          };
          if (file) {
            reader.readAsDataURL(file);
          }
        }
        break;
      }
      default: {
        setStaff({ ...staff, [field]: event.target.value });
        break;
      }
    }
  };
  const handleSubmit = () => {
    const lodash = require("lodash");
    if (lodash.isEqual(staff, props?.item) && props?.item?.image === staffImageUrl) {
      handleCloseDialog();
    } else {
      if (staff?.id) dispatch(updateStaffAction(staff, file));
      else dispatch(addStaffAction(staff, file));
    }
  };
  useEffect(() => {
    ValidatorForm.addValidationRule("isValidCitizenIdentificationNumber", (value) => {
      return value.length === 9 || value.length === 12;
    });
    ValidatorForm.addValidationRule("isValidBirthday", (value) => {
      const birthDate = new Date(value);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthDate.getFullYear();

      return age >= 18;
    });
    ValidatorForm.addValidationRule("isPreviousToday", (value) => {
      const date = new Date(value);
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1);
      return date < currentDate;
    });
    return () => {
      ValidatorForm.removeValidationRule("isValidCitizenIdentificationNumber");
      ValidatorForm.removeValidationRule("isValidBirthday");
      ValidatorForm.removeValidationRule("isPreviousToday");
    };
  }, []);
  return (
    <ValidatorForm onSubmit={handleSubmit} ref={formRef} className="p-12">
      <Grid container spacing={1}>
        <Grid
          container
          alignItems="center"
          direction="column"
          className="flex-center p-12"
          xs={12}
          sm={12}
          md={4}
          lg={4}
        >
          <Grid item className="staff-avatar">
            <img alt="avatar" src={staffImageUrl || "/assets/images/avatar.jpg"} />
          </Grid>
          <Grid item>
            <input
              className={"hidden"}
              type="file"
              accept="image/*"
              id="icon-button-file"
              name="image"
              onChange={(e) => onChange(e, "image")}
            />
            <label htmlFor="icon-button-file">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </Grid>
        </Grid>
        <Grid container spacing={1} xs={12} sm={12} md={8} lg={8} className="p-12">
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
              onChange={(e) => onChange(e, "name")}
              validators={["required", `matchRegexp:${NAME_REGEX}`]}
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
                  {t("staff.code")}
                </span>
              }
              type="text"
              name="code"
              onChange={(e) => onChange(e, "code")}
              value={staff?.code || ""}
              validators={["required", `matchRegexp:^NV${new Date().getFullYear().toString().slice(-2)}\\d{3}$`]}
              errorMessages={[t("staff.notify.errorMessages_required"), t("staff.notify.invalidCodeFormat")]}
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
                value={staff?.gender ?? ""}
                onChange={(e) => onChange(e, "gender")}
                validators={["required"]}
                errorMessages={[t("staff.notify.errorMessages_required")]}
                inputProps={{
                  name: "gender",
                  id: "gender",
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
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
              className="w-100 mb-16"
              label={
                <span className="inputLabel">
                  <span style={{ color: "red" }}> * </span>
                  {t("staff.dateOfBirth")}
                </span>
              }
              onChange={(e) => onChange(e, "dateOfBirth")}
              type="date"
              name="dateOfBirth"
              value={staff?.dateOfBirth ? moment(staff?.dateOfBirth).format("YYYY-MM-DD") : ""}
              validators={["required", "isValidBirthday"]}
              errorMessages={[t("staff.notify.errorMessages_required"), t("staff.notify.inValidBirthday")]}
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
              name="address"
              onChange={(e) => onChange(e, "address")}
              value={staff?.address || ""}
              validators={["required"]}
              errorMessages={[t("staff.notify.errorMessages_required")]}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormControl fullWidth={true} variant="outlined" className="" size="small">
              <SelectValidator
                variant="outlined"
                size="small"
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.team")}
                  </span>
                }
                value={staff?.team || ""}
                onChange={(e) => onChange(e, "team")}
                validators={["required"]}
                errorMessages={[t("staff.notify.errorMessages_required")]}
                inputProps={{
                  name: "team",
                  id: "team",
                }}
                className="w-100 mb-16"
              >
                {TEAM?.map((item) => {
                  return (
                    <MenuItem key={item?.id} value={item?.id}>
                      {`${item?.name}`}
                    </MenuItem>
                  );
                })}
              </SelectValidator>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextValidator
              className={"w-100 mb-16"}
              label={
                <span className="inputLabel">
                  <span style={{ color: "red" }}> * </span>
                  {t("staff.citizenIdentificationNumber")}
                </span>
              }
              type="text"
              name="citizenIdentificationNumber"
              value={staff?.citizenIdentificationNumber || ""}
              onChange={(e) => onChange(e, "citizenIdentificationNumber")}
              validators={["required", "isValidCitizenIdentificationNumber"]}
              errorMessages={[
                t("staff.notify.errorMessages_required"),
                t("staff.notify.inValidCitizenIdentificationNumber"),
              ]}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
              className="w-100 mb-16"
              label={
                <span className="inputLabel">
                  <span style={{ color: "red" }}> * </span>
                  {t("staff.dateOfIssuanceCard")}
                </span>
              }
              onChange={(e) => onChange(e, "dateOfIssuanceCard")}
              type="date"
              name="dateOfIssuanceCard"
              value={staff?.dateOfIssuanceCard ? moment(staff?.dateOfIssuanceCard).format("YYYY-MM-DD") : ""}
              validators={["required", "isPreviousToday"]}
              errorMessages={[t("staff.notify.errorMessages_required"), t("staff.notify.inValidDateOfIssuanceCard")]}
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
                  {t("staff.placeOfIssueCard")}
                </span>
              }
              type="text"
              name="placeOfIssueCard"
              value={staff?.placeOfIssueCard || ""}
              onChange={(e) => onChange(e, "placeOfIssueCard")}
              validators={["required"]}
              errorMessages={[t("staff.notify.errorMessages_required")]}
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
                  {t("staff.ethnic")}
                </span>
              }
              type="text"
              name="ethnic"
              value={staff?.ethnic || ""}
              onChange={(e) => onChange(e, "ethnic")}
              validators={["required",`matchRegexp:${NAME_REGEX}`]}
              errorMessages={[t("staff.notify.errorMessages_required"),t("staff.notify.invalidEthnic")]}
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
                  {t("staff.religion")}
                </span>
              }
              type="text"
              name="religion"
              value={staff?.religion || ""}
              onChange={(e) => onChange(e, "religion")}
              validators={["required",`matchRegexp:${NAME_REGEX}`]}
              errorMessages={[t("staff.notify.errorMessages_required"),
              t("staff.notify.invalidReligion"),]}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
              className="w-100 mb-16"
              label={
                <span className="inputLabel">
                  <span style={{ color: "red" }}> * </span>
                  {t("staff.phone")}
                </span>
              }
              onChange={(e) => onChange(e, "phone")}
              type="text"
              name="phone"
              value={staff?.phone || ""}
              validators={["required", "isNumber", "matchRegexp:^(03|05|07|08|09)\\d{8}$|^\\+84\\d{9}$"]}
              errorMessages={[
                t("staff.notify.errorMessages_required"),
                t("staff.notify.errorMessages_number_required"),
                t("staff.notify.invalidPhoneFormat"),
              ]}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
              className="w-100 mb-16"
              label={
                <span className="inputLabel">
                  <span style={{ color: "red" }}> * </span>
                  {t("Email")}
                </span>
              }
              onChange={(e) => onChange(e, "email")}
              type="email"
              name="email"
              value={staff?.email || ""}
              validators={["required", "isEmail"]}
              errorMessages={[t("staff.notify.errorMessages_required"), t("staff.notify.errorMessages_email_valid")]}
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
      </Grid>
    </ValidatorForm>
  );
};
export default StaffInformation;