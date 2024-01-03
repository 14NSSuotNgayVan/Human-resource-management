import { Button, FormControl, Grid, Icon, IconButton, MenuItem } from "@material-ui/core";
import CustomTable from "app/component/CustomTable";
import { ADDRESS_REGEX, GENDER, NAME_REGEX, RELATIONSHIP } from "app/constants/staffConstant";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { SelectValidator, TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";
import { getAllFamilyMember } from "app/redux/selectors/FamilySelector";
import { createFamilyMember, deleteFamilyMember, updateFamilyMember } from "app/redux/actions/FamilyAction";
import { ConfirmationDialog } from "egret";
const Action = (props) => {
  const { item, handleUpdate, handleShowDeleteConfirm } = props;
  return (
    <div className="none_wrap">
      <IconButton size="small" onClick={() => handleUpdate(item)}>
        <Icon fontSize="small" color="primary">
          edit
        </Icon>
      </IconButton>
      <IconButton size="small" onClick={() => handleShowDeleteConfirm(item.id)}>
        <Icon fontSize="small" color="error">
          delete
        </Icon>
      </IconButton>
    </div>
  );
};

const Family = (props) => {
  const { t, staffId } = props;
  const [familyMember, setFamilyMember] = useState({});
  const familyList = useSelector(getAllFamilyMember);
  const [familyMemberByPage, setFamilyMemberByPage] = useState([]);
  const [pagePagination, setPagePagination] = useState({ page: 0, rowsPerPage: 10 });
  const [totalElements, setTotalElements] = useState(0);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const dispatch = useDispatch();
  const form = useRef(null);

  const updatePageData = () => {
    const familyMembersList = [...familyList];
    const startOfPage = pagePagination.page * pagePagination.rowsPerPage;
    const endOfPage = (pagePagination.page + 1) * pagePagination.rowsPerPage;
    const pageData = familyMembersList.slice(startOfPage, endOfPage);
    setFamilyMemberByPage(pageData);
    setTotalElements(familyMembersList.length);
  };
  useEffect(() => {
    updatePageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePagination]);
  useEffect(() => {
    ValidatorForm.addValidationRule("isValidCitizenIdentificationNumber", (value) => {
      return value.length === 9 || value.length === 12;
    });
    return () => {
      ValidatorForm.removeValidationRule("isValidCitizenIdentificationNumber");
    };
  }, []);
  const handleSubmit = () => {
    if (familyMember?.id) {
      dispatch(updateFamilyMember(familyMember));
    } else dispatch(createFamilyMember(staffId, familyMember));
    handleClose();
  };
  const handleClose = () => {
    setFamilyMember(null);
    setShowConfirmationDialog(false);
    form.current.resetValidations();
  };

  const handleChange = (event, field) => {
    setFamilyMember({ ...familyMember, [field]: event.target.value });
  };
  const handleShowDeleteConfirm = (id) => {
    setShowConfirmationDialog(true);
    setFamilyMember({ id: id });
  };
  const handleConfirmDelete = () => {
    dispatch(deleteFamilyMember(familyMember.id));
    setShowConfirmationDialog(false);
  };
  const handleUpdate = (item) => {
    setFamilyMember({ ...item });
  };
  let columns = [
    {
      title: t("general.action"),
      field: "custom",
      align: "center",
      minWidth: "80px",
      render: (rowData) => (
        <Action item={rowData} handleUpdate={handleUpdate} handleShowDeleteConfirm={handleShowDeleteConfirm} />
      ),
    },
    {
      title: t("STT"),
      align: "center",
      minWidth: "60px",
      render: (rowData) => rowData.tableData.id + 1 + pagePagination.page * pagePagination.rowsPerPage,
    },
    {
      title: t("staff.family.name"),
      field: "name",
      align: "left",
      minWidth: "170px",
      render: (props) => <p className="custom-table-cell">{props?.address}</p>,
    },
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
      align: "left",
      minWidth: "150px",
      render: (props) => <span>{RELATIONSHIP.find((item) => item.id === props.relationShip)?.name}</span>,
    },
    {
      title: t("staff.gender_display"),
      field: "gender",
      align: "center",
      minWidth: "80px",
      render: (props) => <span>{t(`staff.gender.${GENDER[props.gender]?.name}`)}</span>,
    },

    {
      title: t("staff.family.address"),
      field: "address",
      align: "left",
      minWidth: "150px",
      maxWidth: "150px",
      render: (props) => <p className="custom-table-cell">{props?.address}</p>,
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
        <ValidatorForm onSubmit={handleSubmit} ref={form}>
          <Grid container spacing={2} className="p-12">
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
                value={familyMember?.name || ""}
                onChange={(e) => {
                  handleChange(e, "name");
                }}
                validators={["required", `matchRegexp:${NAME_REGEX}`, "maxStringLength:50"]}
                errorMessages={[
                  t("staff.notify.errorMessages_required"),
                  t("staff.notify.invalidName"),
                  `${t("staff.notify.invalidStringContent")}(50 kí tự)`,
                ]}
                size="small"
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <FormControl fullWidth={true} className="" size="small">
                <SelectValidator
                  size="small"
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.family.gender")}
                    </span>
                  }
                  value={familyMember?.gender ?? ""}
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
                inputProps={{
                  max: moment().format("YYYY-MM-DD"),
                }}
                value={familyMember?.dateOfBirth ? moment(familyMember?.dateOfBirth).format("YYYY-MM-DD") : ""}
                validators={["required"]}
                errorMessages={[t("staff.notify.errorMessages_required")]}
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <FormControl fullWidth={true} className="" size="small">
                <SelectValidator
                  size="small"
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.family.relationShip")}
                    </span>
                  }
                  value={familyMember?.relationShip ?? ""}
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
                    {t("staff.family.citizenIdentificationNumber")}
                  </span>
                }
                type="text"
                name="citizenIdentificationNumber"
                value={familyMember?.citizenIdentificationNumber || ""}
                onChange={(e) => {
                  handleChange(e, "citizenIdentificationNumber");
                }}
                validators={["required", "isValidCitizenIdentificationNumber"]}
                errorMessages={[
                  t("staff.notify.errorMessages_required"),
                  t("staff.notify.inValidCitizenIdentificationNumber"),
                ]}
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
                value={familyMember?.phoneNumber || ""}
                validators={["required", "isNumber", "matchRegexp:^(03|05|07|08|09)\\d{8}$|^\\+84\\d{9}$"]}
                errorMessages={[
                  t("staff.notify.errorMessages_required"),
                  t("general.errorMessages_number_required"),
                  t("general.invalidPhoneFormat"),
                ]}
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
                value={familyMember?.email || ""}
                validators={["required", "isEmail", "maxStringLength:255"]}
                errorMessages={[
                  t("staff.notify.errorMessages_required"),
                  t("general.errorMessages_email_valid"),
                  `${t("staff.notify.invalidStringContent")}(255 kí tự)`,
                ]}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
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
                value={familyMember?.address || ""}
                onChange={(e) => {
                  handleChange(e, "address");
                }}
                validators={["required", `matchRegexp:${ADDRESS_REGEX}`, "maxStringLength:255"]}
                errorMessages={[
                  t("staff.notify.errorMessages_required"),
                  t("staff.notify.inValidAddress"),
                  `${t("staff.notify.invalidStringContent")}(175 kí tự)`,
                ]}
                size="small"
              />
            </Grid>
            <Grid item lg={2} md={2} sm={12} xs={12}>
              <Grid container justify="flex-end" className="mb-16">
                <Button className="align-bottom mr-8 mb-4" variant="contained" color="primary" type="submit">
                  {t("general.save")}
                </Button>
                <Button className="align-bottom mr-8 mb-4 color-error" variant="contained" onClick={handleClose}>
                  {t("general.cancel")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Grid>
      {showConfirmationDialog && (
        <ConfirmationDialog
          title={t("general.confirm")}
          open={showConfirmationDialog}
          onConfirmDialogClose={handleClose}
          onYesClick={handleConfirmDelete}
          text={t("general.deleteConfirm")}
          Yes={t("general.Yes")}
          No={t("general.No")}
        />
      )}
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <CustomTable
          data={familyMemberByPage}
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
