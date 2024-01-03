import React, { useEffect, useRef, useState } from "react";
import { Button, FormControl, Grid, Icon, IconButton, MenuItem } from "@material-ui/core";
import { SelectValidator, TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import moment from "moment";
import CustomTable from "app/component/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmationDialog } from "egret";
import { LEADER, STAFF_STATUS, SUBMIT_PROFILE_STATUS } from "app/constants/staffConstant";
import { getOldestSalary} from "utils";
import { getSalaries } from "app/redux/selectors/SalarySelector";
import { createSalaries, deleteSalary, updateSalary } from "app/redux/actions/SalaryAction";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NotifyDialog from "app/component/CustomNotifyDialog";
import SalaryIncreaseDialog from "app/component/Form/SalaryIncreaseDialog";

const Action = (props) => {
  const { item, handleUpdate, handleShowDeleteConfirm, handleShowDocumentDialog, handleShowNotify,isPendingEndProfile } = props;
  return (
    <div className="none_wrap">
      {!isPendingEndProfile && STAFF_STATUS.EDIT_PROCESS.includes(item.salaryIncreaseStatus) && (
        <IconButton size="small" onClick={() => handleUpdate(item)}>
          <Icon fontSize="small" color="primary">
            edit
          </Icon>
        </IconButton>
      )}
      {!isPendingEndProfile && STAFF_STATUS.REMOVE.includes(item.salaryIncreaseStatus) && (
        <IconButton size="small" onClick={() => handleShowDeleteConfirm(item.id)}>
          <Icon fontSize="small" color="error">
            delete
          </Icon>
        </IconButton>
      )}
      {STAFF_STATUS.VIEW.includes(item.salaryIncreaseStatus) && (
        <IconButton
          size="small"
          onClick={() => {
            handleShowDocumentDialog(item);
          }}
        >
          <VisibilityIcon fontSize="small"></VisibilityIcon>
        </IconButton>
      )}
      {STAFF_STATUS.ADDITIONAL.includes(item.salaryIncreaseStatus) && (
        <IconButton
          size="small"
          onClick={() => handleShowNotify({ message: item?.additionalRequest, tittle: "Yêu cầu bổ sung" })}
        >
          <Icon fontSize="small" color="secondary">
            notifications
          </Icon>
        </IconButton>
      )}
      {STAFF_STATUS.REJECT.includes(item.salaryIncreaseStatus) && (
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
  const { t, item,isPendingEndProfile } = props;
  const dispatch = useDispatch();
  const salaryList = useSelector(getSalaries);
  const [salariesByPage, setSalariesByPage] = useState([]);
  const [totalElement, setTotalElement] = useState(0);
  const [pagePagination, setPagePagination] = useState({ page: 0, rowsPerPage: 10 });
  const [isPending,setIsPending] = useState(false);
  const [isActiveEdit, setIsActiveEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSendLeader, setIsSendLeader] = useState(false);
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
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  useEffect(() => {
    setIsActiveEdit(
      salaryList.length === 0 ||
        salaryList.every((item) => item.salaryIncreaseStatus === 3) ||
        salaryList.every((item) => item.salaryIncreaseStatus === 1)
    );
    setIsPending(salaryList.some((item) => item.salaryIncreaseStatus === 2));
    !isEditing &&setSalary({
      ...salary,
      oldSalary: getOldestSalary(salaryList),
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salaryList]);
  useEffect(() => {
    if (salary?.leaderId) setIsSendLeader(true);
    else setIsSendLeader(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salary?.leaderId]);
  const updatePageData = () => {
    const salaries = [...salaryList];
    const startOfPage = pagePagination.page * pagePagination.rowsPerPage;
    const endOfPage = (pagePagination.page + 1) * pagePagination.rowsPerPage;
    const pageData = isPendingEndProfile ? salaries.filter(item=>item?.salaryIncreaseStatus===3||item?.salaryIncreaseStatus===4).slice(startOfPage, endOfPage) :salaries.slice(startOfPage, endOfPage);
    setSalariesByPage(pageData);
    setTotalElement(salaries.length);
  };
  useEffect(() => {
    updatePageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePagination, salaryList]);
  const handleSubmit = () => {
    if (isEditing) {
      salary?.leaderId
        ? dispatch(updateSalary({ ...salary, salaryIncreaseStatus: 2 }))
        : dispatch(updateSalary(salary));
    } else
      salary?.leaderId
        ? dispatch(createSalaries(item?.id, { ...salary, salaryIncreaseStatus: 2 }))
        : dispatch(createSalaries(item?.id, { ...salary, salaryIncreaseStatus: 1 }));
  };
  const handleClose = () => {
    setShowNotify({
      shouldShowNotifyDialog: false,
      message: "",
      tittle: "",
    })
    setSalary({
      ...salary,
      startDate: new Date(),
      reason: "",
      note: "",
      oldSalary: getOldestSalary(salaryList),
      newSalary: 0,
    });
    setShowConfirmationDialog(false);
    setIsSendLeader(false);
    setIsEditing(false);
    setShouldOpenDocumentDialog(false);
    !isPendingEndProfile && form.current.resetValidations();
  };
  const onChange = (event, field) => {
    setSalary({ ...salary, [field]: event.target.value });
  };
  const handleShowDeleteConfirm = (id) => {
    setShowConfirmationDialog(true);
    setSalary({ id: id });
  };
  const handleConfirmDelete = () => {
    dispatch(deleteSalary(salary?.id));
    setShowConfirmationDialog(false);
  };
  const handleUpdate = (item) => {
    if(salary?.leaderId) setIsSendLeader(true);
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
  const handleShowDocumentDialog  = (salaryData) =>{
    setSalary(salaryData);
    setShouldOpenDocumentDialog(true);
  }
  let columns = [
    {
      title: t("general.action"),
      field: "custom",
      align: "center",
      minWidth: "80px",
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
      minWidth: "60px",
      render: (rowData) => rowData.tableData.id + 1 + pagePagination.page * pagePagination.rowsPerPage,
    },
    {
      title: t("staff.salary_increment.startDate"),
      field: "startDate",
      align: "center",
      minWidth: "120px",
      render: (props) => <span>{moment(new Date(props?.startDate)).format("DD/MM/YYYY")}</span>,
    },
    {
      title: t("staff.salary_increment.oldSalary"),
      field: "oldSalary",
      align: "right",
      minWidth: "150px",
      maxWidth: "250px",
      render: (props) =>`${props?.oldSalary.toLocaleString('en-US')} VND`,
    },
    {
      title: t("staff.salary_increment.newSalary"),
      field: "newSalary",
      align: "right",
      minWidth: "150px",
      maxWidth: "250px",
      render: (props) =>`${props?.newSalary.toLocaleString('en-US')} VND`,

    },
    {
      title: t("staff.salary_increment.reason"),
      field: "reason",
      align: "left",
      minWidth: "170px",
      render: (props) => <p className="custom-table-cell">{props?.reason}</p>,
    },
    {
      title: t("staff.submit_profile_status_display"),
      field: "salaryIncreaseStatus",
      align: "left",
      minWidth: "150px",
      render: (props) => (
        <span>{t(`staff.submit_profile_status.${SUBMIT_PROFILE_STATUS[props.salaryIncreaseStatus]}`)}</span>
      ),
    },
  ];
  return (
    <Grid container>
      {!isPendingEndProfile&&
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <ValidatorForm onSubmit={handleSubmit} ref={form}>
          <Grid container spacing={2} className="p-12">
            <Grid item lg={3} md={3} sm={6} xs={6}>
              <TextValidator
                disabled={!(isEditing || isActiveEdit)}
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
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <TextValidator
                disabled={!(isEditing || isActiveEdit) || getOldestSalary(salaryList)}
                className={"w-100 mb-16"}
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.salary_increment.oldSalary")}
                  </span>
                }
                type="text"
                name="oldSalary"
                value={salary?.oldSalary||""}
                inputProps={{
                  readOnly: salary?.oldSalary && salary?.salaryIncreaseStatus === "4",
                  maxlength:9
                }}
                onChange={(e) => onChange(e, "oldSalary")}
                validators={["required", "isPositive"]}
                errorMessages={[t("staff.notify.errorMessages_required"), 
                t("staff.notify.invalidPositive"),
              ]}
                size="small"
              />
            </Grid>

            <Grid item xs={6} sm={6} md={3} lg={3}>
              <TextValidator
                disabled={!(isEditing || isActiveEdit)}
                className={"w-100 mb-16"}
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.salary_increment.newSalary")}
                  </span>
                }
                type="text"
                name="newSalary"
                inputProps={{maxlength:9}}
                onChange={(e) => onChange(e, "newSalary")}
                value={salary?.newSalary || ""}
                validators={["required", "isPositive",`minNumber:${salary?.oldSalary}`]}
                errorMessages={[t("staff.notify.errorMessages_required"), t("staff.notify.invalidPositive"),
                t("staff.notify.inValidNewSalary")
              ]}
                size="small"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <TextValidator
                disabled={!(isEditing || isActiveEdit)}
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
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <TextValidator
                disabled={!(isEditing || isActiveEdit)}
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
            <Grid item lg={3} md={3} sm={6} xs={6}>
              <FormControl fullWidth={true} className="" size="small">
                <SelectValidator
                  disabled={!isActiveEdit}
                  size="small"
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("sendLeader.leaderName")}
                    </span>
                  }
                  value={salary?.leaderId ?? ""}
                  inputProps={{
                    readOnly: salary?.leaderId && salary?.salaryIncreaseStatus === 4,
                  }}
                  onChange={(e) => onChange(e, "leaderId")}
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
            <Grid item justify="flex-end" className="mb-16">
              {(isActiveEdit || isEditing) && (
                <>
                  <Button className="align-bottom mr-8 mb-4" variant="contained" color="primary" type="submit" disabled ={isPending && isSendLeader}>
                    {t(`general.${isSendLeader ? "sendLeader" : "save"}`)}
                  </Button>
                  <Button className="align-bottom mr-8 mb-4 color-error" variant="contained" onClick={handleClose}>
                    {t("general.cancel")}
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </ValidatorForm>
      </Grid>}
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
      {showNotify?.shouldShowNotifyDialog&&  <NotifyDialog t = {t} handleCloseDialog ={handleClose} item={showNotify} />}
      {shouldOpenDocumentDialog && <SalaryIncreaseDialog handleCloseDialog={handleClose} dataSalaryIncrease={salary} t={t}/>}
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
export default SalaryIncrement;
