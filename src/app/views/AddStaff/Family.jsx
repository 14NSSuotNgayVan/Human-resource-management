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
import CustomTable from "app/component/CustomTable";
import { GENDER, RELATIONSHIP } from "app/constants/staffConstant";
import moment from "moment";
import React, { useState } from "react";
import { SelectValidator, TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import ConfirmationDialog from "../material-kit/dialog/ConfirmationDialog";

const Action = (props) => {
  const {item, handleUpdate, handleDelete} = props.item;
  return (
    <div className="none_wrap">
      <IconButton size="small" onClick={handleUpdate(item)}>
        <Icon fontSize="small" color="primary">
          edit
        </Icon>
      </IconButton>
      <IconButton size="small" onClick={handleDelete(item.id)}>
        <Icon fontSize="small" color="error">
          delete
        </Icon>
      </IconButton>
    </div>
  );
};

const Family = (props) => {
  const { t, staff } = props;
  const [family, setFamily] = useState({});
  const [familyList, setFamilyList] = useState([]);
  const [pagePagination, setPagePagination] = useState({ page: 0, rowsPerPage: 10 });
  const [totalElements, setTotalElements] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const handleSubmit = () => {
    handleClose();
  };
  const handleClose = () => {
    setShowConfirmationDialog(false);
    setIsEditing(false);
  };
  const handleChange = (event, field) => {
    setFamily({ ...family, [field]: event.target.value });
  };
  const handleDelete=()=>{

  }
  const handleUpdate=(item)=>{
    setIsEditing(true);
    setFamily({...item});
  }
  let columns = [
    {
      title: t("general.action"),
      field: "custom",
      align: "center",
      minWidth: "80px",
      render: (rowData) => <Action item={rowData} handleUpdate={handleUpdate(rowData)} handleDelete ={handleDelete(rowData)}/>,
    },
    { title: t("staff.family.name"), field: "name", align: "center", minWidth: "170px" },
    {
      title: t("staff.family.dateOfBirth"),
      field: "dateOfBirth",
      align: "center",
      minWidth: "120px",
      render: (props) => <span>{moment(new Date(props?.dateOfBirth)).format("DD/MM/YYYY")}</span>,
    },
    {
      title: t("staff.family.relationShip"),
      field: "relationShip",
      align: "center",
      minWidth: "150px",
    },
    {
      title: t("staff.family.gender"),
      field: "gender",
      align: "center",
      minWidth: "80px",
      render: (props) => <span>{t(`staff.family.gender.${GENDER[props.gender]?.name}`)}</span>,
    },

    {
      title: t("staff.family.address"),
      field: "address",
      align: "left",
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      title: t("staff.family.phoneNumber"),
      field: "phoneNumber",
      align: "center",
      minWidth: "150px",
    },
  ];
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container spacing={1} className="p-12">
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextValidator
                className={"w-100 mb-16"}
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.family.name")}
                  </span>
                }
                type="text"
                name="name"
                value={family?.name || ""}
                onChange={(e) => {
                  handleChange(e, "name");
                }}
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
                      {t("staff.family.gender")}
                    </span>
                  }
                  value={family?.gender ?? ""}
                  onChange={(e) => {
                    handleChange(e, "gender");
                  }}
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
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                className="w-100 mb-16"
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.family.dateOfBirth")}
                  </span>
                }
                onChange={(e) => {
                  handleChange(e, "dateOfBirth");
                }}
                type="date"
                name="dateOfBirth"
                value={family ? moment(family?.dateOfBirth).format("YYYY-MM-DD") : ""}
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
                      {t("staff.family.relationShip")}
                    </span>
                  }
                  value={family?.relationShip ?? ""}
                  onChange={(e) => {
                    handleChange(e, "relationShip");
                  }}
                  validators={["required"]}
                  errorMessages={[t("staff.notify.errorMessages_required")]}
                  inputProps={{
                    name: "relationShip",
                    id: "relationShip",
                  }}
                  className="w-100 mb-16"
                >
                  {RELATIONSHIP?.map((item) => {
                    return (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </SelectValidator>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextValidator
                className={"w-100 mb-16"}
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.family.address")}
                  </span>
                }
                type="text"
                name="address"
                value={family?.address || ""}
                onChange={(e) => {
                  handleChange(e, "address");
                }}
                validators={["required"]}
                errorMessages={[t("staff.notify.errorMessages_required")]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextValidator
                className={"w-100 mb-16"}
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.family.citizenIdentificationNumber")}
                  </span>
                }
                type="text"
                name="citizenIdentificationNumber"
                value={family?.citizenIdentificationNumber || ""}
                onChange={(e) => {
                  handleChange(e, "citizenIdentificationNumber");
                }}
                validators={["required", "minStringLength:9", "maxStringLength:13"]}
                errorMessages={[
                  t("staff.notify.errorMessages_required"),
                  t("general.minLength_required"),
                  t("general.maxLength_required"),
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                className="w-100 mb-16"
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.family.phoneNumber")}
                  </span>
                }
                onChange={(e) => {
                  handleChange(e, "phoneNumber");
                }}
                type="text"
                name="phoneNumber"
                value={family?.phoneNumber || ""}
                validators={["required", "isNumber", "matchRegexp:(84|03|05|07|08|09)+([0-9]{8})\\b"]}
                errorMessages={[
                  t("staff.notify.errorMessages_required"),
                  t("general.errorMessages_number_required"),
                  t("general.invalidPhoneFormat"),
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                className="w-100 mb-16"
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("Email")}
                  </span>
                }
                onChange={(e) => {
                  handleChange(e, "email");
                }}
                type="email"
                name="email"
                value={family?.email || ""}
                validators={["required", "isEmail"]}
                errorMessages={[t("staff.notify.errorMessages_required"), t("general.errorMessages_email_valid")]}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          <Grid container justify="flex-end" className="mb-16">
            {!isEditing && (
              <Button
                className="align-bottom mr-8 mb-4"
                variant="contained"
                color="primary"
                onClick={() => {
                  setFamily({});
                  setIsEditing(true);
                }}
              >
                {t("general.add")}
              </Button>
            )}
            {isEditing && (
              <Button className="align-bottom mr-8 mb-4" variant="contained" color="primary" type="submit">
                {t("general.save")}
              </Button>
            )}
            {isEditing && (
              <Button
                className="align-bottom mr-8 mb-4"
                variant="contained"
                color="secondary"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                {t("general.cancel")}
              </Button>
            )}
          </Grid>
        </ValidatorForm>
      </Grid>
      {showConfirmationDialog && (
        <ConfirmationDialog
          title={t("general.confirm")}
          open={showConfirmationDialog}
          onConfirmDialogClose={handleClose}
          // onYesClick={}
          text={t("general.deleteConfirm")}
          Yes={t("general.Yes")}
          No={t("general.No")}
        />
      )}
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <CustomTable
          data={familyList}
          columns={columns}
          totalElements={totalElements}
          pagePagination={pagePagination}
          setPagination={setPagePagination}
        />
      </Grid>
    </Grid>
  );
};
export default Family;
