import React, { memo, useEffect, useRef, useState } from "react";
import { Button, Grid, Icon, IconButton } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import moment from "moment";
import CustomTable from "app/component/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmationDialog } from "egret";
import {  STATUS_FOR_ADDITIONAL, STATUS_FOR_EDIT_PROCESS, STATUS_FOR_REJECT, STATUS_FOR_REMOVE, STATUS_FOR_VIEW_MANAGE } from "app/constants/staffConstant";
import { getOldestSalary, getProfileStatusNameById } from "utils";
import { getSalaries, getShouldUpdateSalary } from "app/redux/selectors/SalarySelector";
import { createSalaries, deleteSalary, setSalaryItem, updateSalary } from "app/redux/actions/SalaryAction";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NotifyDialog from "app/component/CustomNotifyDialog";
import SalaryIncreaseDialog from "app/component/Form/SalaryIncreaseDialog";
import { staffSelector } from "app/redux/selectors/StaffSelector";

const Action = (props) => {
  const {
    item,
    handleUpdate,
    handleShowDeleteConfirm,
    handleShowDocumentDialog,
    handleShowNotify,
    isPendingEndProfile,
  } = props;
  return (
    <div className="none_wrap">
      {STATUS_FOR_VIEW_MANAGE.join(',').includes(item.salaryIncreaseStatus) && (
        <IconButton
          size="small"
          onClick={() => {
            handleShowDocumentDialog(item);
          }}
        >
          <VisibilityIcon fontSize="small"></VisibilityIcon>
        </IconButton>
      )}
      {!isPendingEndProfile && STATUS_FOR_EDIT_PROCESS.join(',').includes(item.salaryIncreaseStatus) && (
        <IconButton size="small" onClick={() => handleUpdate(item)}>
          <Icon fontSize="small" color="primary">
            edit
          </Icon>
        </IconButton>
      )}
      {!isPendingEndProfile && STATUS_FOR_REMOVE.join(',').includes(item.salaryIncreaseStatus) && (
        <IconButton size="small" onClick={() => handleShowDeleteConfirm(item.id)}>
          <Icon fontSize="small" color="error">
            delete
          </Icon>
        </IconButton>
      )}
      {STATUS_FOR_ADDITIONAL.join(',').includes(item.salaryIncreaseStatus) && (
        <IconButton
          size="small"
          onClick={() => handleShowNotify({ message: item?.additionalRequest, tittle: "Yêu cầu bổ sung" })}
        >
          <Icon fontSize="small" color="secondary">
            notifications
          </Icon>
        </IconButton>
      )}
      {STATUS_FOR_REJECT.join(',').includes(item.salaryIncreaseStatus) && (
        <IconButton
          size="small"
          onClick={() => handleShowNotify({ message: item?.reasonForRefusal, tittle: "Lí do từ chối" })}
        >
          <Icon fontSize="small" color="secondary">
            notifications
          </Icon>
        </IconButton>
      )}
    </div>
  );
};
const SalaryIncrement = (props) => {
  const { t, isPendingEndProfile, setShouldOpenSalaryForm} = props;
  const item =useSelector(staffSelector);
  const dispatch = useDispatch();
  const salaryList = useSelector(getSalaries);
  const ShouldUpdateSalary = useSelector(getShouldUpdateSalary);
  const [salariesByPage, setSalariesByPage] = useState([]);
  const [totalElement, setTotalElement] = useState(0);
  const [pagePagination, setPagePagination] = useState({ page: 0, rowsPerPage: 10 });
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState("");
  const [showNotify, setShowNotify] = useState({
    shouldShowNotifyDialog: false,
    message: "",
    tittle: "",
  });
  const form = useRef(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [shouldOpenDocumentDialog, setShouldOpenDocumentDialog] = useState(false);
  const [salary, setSalary] = useState({});

  useEffect(() => {
    setSalary({
      ...salary,
      startDate: new Date(),
      reason: "",
      note: "",
      oldSalary: getOldestSalary(salaryList),
      newSalary: 0,
      leaderId: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ShouldUpdateSalary]);
  useEffect(() => {
    setIsPending(salaryList.some((item) => item.salaryIncreaseStatus === 2));
    !isEditing &&
      setSalary({
        ...salary,
        oldSalary: getOldestSalary(salaryList),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salaryList]);
  const updatePageData = () => {
    const salaries = [...salaryList];
    const startOfPage = pagePagination.page * pagePagination.rowsPerPage;
    const endOfPage = (pagePagination.page + 1) * pagePagination.rowsPerPage;
    const pageData = isPendingEndProfile
      ? salaries
          .filter(
            (item) =>
              item?.salaryIncreaseStatus === 3 || item?.salaryIncreaseStatus === 4 || item?.salaryIncreaseStatus === 5
          )
          .slice(startOfPage, endOfPage)
      : salaries.slice(startOfPage, endOfPage);
    setSalariesByPage(pageData);
    setTotalElement(salaries.length);
  };
  useEffect(() => {
    updatePageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePagination, salaryList]);
  const handleSubmit = () => {
    if (isEditing) {
      dispatch(updateSalary(salary));
    } else {
      dispatch(createSalaries(item?.id, { ...salary, salaryIncreaseStatus: 1 }));
    }
    setShouldOpenSalaryForm(true);
  };
  useEffect(()=>{console.log(salary); return() =>{console.log("unmount"); }},[salary])
  const handleClose = () => {
    setSalary({
      ...salary,
      startDate: new Date(),
      reason: "",
      note: "",
      oldSalary: getOldestSalary(salaryList),
      newSalary: 0,
      leaderId: "",
    });
    setIsEditing(false);
    setShouldOpenDocumentDialog(false);
    !isPendingEndProfile && form.current.resetValidations();
  };
  const handleCloseNotify =()=>{
    setShowNotify({
      shouldShowNotifyDialog: false,
      message: "",
      tittle: "",
    });
  }
  const onChange = (event, field) => {
    setSalary({ ...salary, [field]: event.target.value });
  };
  const handleShowDeleteConfirm = (id) => {
    setShowConfirmationDialog(true);
    setId(id);
  };
  const handleConfirmDelete = () => {
    dispatch(deleteSalary(id));
    setShowConfirmationDialog(false);
  };
  const handleUpdate = (item) => {
    setIsEditing(true);
    setSalary(item);
  };
  const handleShowNotify = (item) => {
    setShowNotify({
      shouldShowNotifyDialog: true,
      message: item?.message,
      tittle: item?.tittle,
    });
  };
  const handleShowDocumentDialog = (salaryData) => {
    dispatch(setSalaryItem({...salaryData}))
    setShouldOpenSalaryForm(true);
  };
  let columns = [
    {
      title: t("general.action"),
      field: "custom",
      align: "center",
      maxWidth: "100px",
      minWidth: "100px",
      render: (rowData) => (
        <Action
          item={rowData}
          handleShowDeleteConfirm={handleShowDeleteConfirm}
          handleUpdate={handleUpdate}
          handleShowNotify={handleShowNotify}
          handleShowDocumentDialog={handleShowDocumentDialog}
          isPendingEndProfile={isPendingEndProfile}
        />
      ),
    },
    {
      title: t("STT"),
      align: "center",
      maxWidth: "60px",
      minWidth: "60px",
      render: (rowData) => rowData.tableData.id + 1 + pagePagination.page * pagePagination.rowsPerPage,
    },
    {
      title: t("staff.salary_increment.startDate"),
      field: "startDate",
      align: "center",
      maxWidth: "100px",
      minWidth: "100px",
      render: (props) => <span>{moment(new Date(props?.startDate)).format("DD/MM/YYYY")}</span>,
    },
    {
      title: t("staff.salary_increment.oldSalary"),
      field: "oldSalary",
      align: "right",
      maxWidth: "100px",
      minWidth: "100px",
      render: (props) => `${props?.oldSalary.toLocaleString("en-US")} VND`,
    },
    {
      title: t("staff.salary_increment.newSalary"),
      field: "newSalary",
      align: "right",
      maxWidth: "100px",
      minWidth: "100px",
      render: (props) => `${props?.newSalary.toLocaleString("en-US")} VND`,
    },
    {
      title: t("staff.salary_increment.reason"),
      field: "reason",
      align: "left",
      maxWidth: "250px",
      minWidth: "250px",
      render: (props) => <p className="custom-table-cell">{props?.reason}</p>,
    },
    {
      title: t("staff.submit_profile_status_display"),
      field: "salaryIncreaseStatus",
      align: "left",
      maxWidth: "150px",
      minWidth: "150px",
      render: (props) => (
        <span>{t(`staff.submit_profile_status.${getProfileStatusNameById(props?.salaryIncreaseStatus)}`)}</span>
      ),
    },
  ];
  return (
    <Grid container>
      {!isPendingEndProfile && (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ValidatorForm onSubmit={handleSubmit} ref={form}>
            <Grid container spacing={2} className="p-12">
              <Grid item lg={2} md={2} sm={6} xs={6}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.salary_increment.startDate")}
                    </span>
                  }
                  onChange={(e) => onChange(e, "startDate")}
                  type="date"
                  name="startDate"
                  value={salary?.startDate ? moment(salary?.startDate).format("YYYY-MM-DD") : ""}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  validators={["required"]}
                  errorMessages={[t("staff.notify.errorMessages_required")]}
                  size="small"
                />
              </Grid>
              <Grid item xs={6} sm={6} md={2} lg={2}>
                <TextValidator
                  disabled={getOldestSalary(salaryList)}
                  className={"w-100 mb-16"}
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.salary_increment.oldSalary")}
                    </span>
                  }
                  type="text"
                  name="oldSalary"
                  value={salary?.oldSalary || ""}
                  inputProps={{
                    readOnly: salary?.oldSalary && salary?.salaryIncreaseStatus === "4",
                    maxlength: 9,
                  }}
                  onChange={(e) => onChange(e, "oldSalary")}
                  validators={["required", "isPositive"]}
                  errorMessages={[t("staff.notify.errorMessages_required"), t("staff.notify.invalidPositive")]}
                  size="small"
                />
              </Grid>
              <Grid item xs={6} sm={6} md={2} lg={2}>
                <TextValidator
                  className={"w-100 mb-16"}
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.salary_increment.newSalary")}
                    </span>
                  }
                  type="text"
                  name="newSalary"
                  inputProps={{ maxlength: 9 }}
                  onChange={(e) => onChange(e, "newSalary")}
                  value={salary?.newSalary || ""}
                  validators={["required", "isPositive", `minNumber:${salary?.oldSalary}`]}
                  errorMessages={[
                    t("staff.notify.errorMessages_required"),
                    t("staff.notify.invalidPositive"),
                    t("staff.notify.inValidNewSalary"),
                  ]}
                  size="small"
                />
              </Grid>
              <Grid item xs={6} sm={6} md={2} lg={2}>
                <TextValidator
                  className={"w-100 mb-16"}
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.salary_increment.reason")}
                    </span>
                  }
                  type="text"
                  name="reason"
                  onChange={(e) => onChange(e, "reason")}
                  value={salary?.reason || ""}
                  validators={["required", "maxStringLength:255"]}
                  errorMessages={[
                    t("staff.notify.errorMessages_required"),
                    `${t("staff.notify.invalidStringContent")}(255 kí tự)`,
                  ]}
                  size="small"
                />
              </Grid>
              <Grid item xs={6} sm={6} md={2} lg={2}>
                <TextValidator
                  className={"w-100 mb-16"}
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.salary_increment.note")}
                    </span>
                  }
                  type="text"
                  name="note"
                  onChange={(e) => onChange(e, "note")}
                  value={salary?.note || ""}
                  validators={["required", "maxStringLength:1000"]}
                  errorMessages={[
                    t("staff.notify.errorMessages_required"),
                    `${t("staff.notify.invalidStringContent")}(1000 kí tự)`,
                  ]}
                  size="small"
                />
              </Grid>
              <Grid item justify="flex-end" className="mb-16">
                <Button
                  className="align-bottom mr-8 mb-4"
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isPending}
                >
                  {t(`general.save`)}
                </Button>
                <Button className="align-bottom mr-8 mb-4 color-error" variant="contained" onClick={handleClose}>
                  {t("general.cancel")}
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        </Grid>
      )}
      {showConfirmationDialog && (
        <ConfirmationDialog
          title={t("general.confirm")}
          t={t}
          onConfirmDialogClose={() => {
            setShowConfirmationDialog(false);
          }}
          onYesClick={handleConfirmDelete}
          text={t("general.deleteConfirm")}
          Yes={t("general.Yes")}
          No={t("general.cancel")}
        />
      )}
      {showNotify?.shouldShowNotifyDialog && <NotifyDialog t={t} handleCloseDialog={handleCloseNotify} item={showNotify} />}
      {shouldOpenDocumentDialog && (
        <SalaryIncreaseDialog handleCloseDialog={handleClose} dataSalaryIncrease={salary} t={t} />
      )}
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <CustomTable
          data={salariesByPage}
          columns={columns}
          totalElements={totalElement}
          pagePagination={pagePagination}
          setPagination={setPagePagination}
        />
      </Grid>
    </Grid>
  );
};
export default memo(SalaryIncrement);
