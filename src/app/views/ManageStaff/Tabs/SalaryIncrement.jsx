import React, { useEffect, useRef, useState } from "react";
import { Button, FormControl, Grid, Icon, IconButton, MenuItem } from "@material-ui/core";
import { SelectValidator, TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import moment from "moment";
import CustomTable from "app/component/CustomTable";
import { useDispatch} from "react-redux";
import { ConfirmationDialog } from "egret";
import { LEADER, SUBMIT_PROFILE_STATUS } from "app/constants/staffConstant";
import { wrapText4 } from "utils";

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
const SalaryIncrement = (props) => {
  const { t, item } = props;
  const dispatch = useDispatch();
  const salaryList = [];
  const [salariesByPage, setSalariesByPage] = useState([]);
  const [totalElement, setTotalElement] = useState(0);
  const [pagePagination, setPagePagination] = useState({ page: 0, rowsPerPage: 10 });

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [salary, setSalary] = useState({});
  const form = useRef(null);
  const updatePageData = () => {
    const salaries = [...salaryList];
    const startOfPage = pagePagination.page * pagePagination.rowsPerPage;
    const endOfPage = (pagePagination.page + 1) * pagePagination.rowsPerPage;
    const pageData = salaries.slice(startOfPage, endOfPage);
    setSalariesByPage(pageData);
    setTotalElement(salaries.length);
  };
  useEffect(() => {
    updatePageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePagination]);
  const handleSubmit = () => {};
  const handleClose = () => {
    setSalary(null);
    setShowConfirmationDialog(false);
  };
  const onChange = (event, field) => {
    setSalary({ ...salary, [field]: event.target.value });
  };
  const handleShowDeleteConfirm = (id) => {
    setShowConfirmationDialog(true);
    setSalary({ id: id });
  };
  const handleConfirmDelete = () => {
    setShowConfirmationDialog(false);
  };
  const handleUpdate = (item) => {
    setSalary({ ...item });
  };
  let columns = [
    {
      title: t("general.action"),
      field: "custom",
      align: "center",
      minWidth: "80px",
      render: (rowData) => (
        <Action item={rowData} handleShowDeleteConfirm={handleShowDeleteConfirm} handleUpdate={handleUpdate} />
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
    },
    {
      title: t("staff.salary_increment.newSalary"),
      field: "newSalary",
      align: "right",
      minWidth: "150px",
      maxWidth: "250px",
    },
    { title: t("staff.salary_increment.reason"), field: "reason", align: "left", minWidth: "170px",maxWidth: "200px",
    render: (props) => wrapText4(props?.reason,200), },
    {
      title: t("staff.submit_profile_status_display"),
      field: "submitProfileStatus",
      align: "left",
      minWidth: "150px",
      render: (props) => (
        <span>{t(`staff.submit_profile_status.${SUBMIT_PROFILE_STATUS[props.submitProfileStatus]}`)}</span>
      ),
    },
  ];
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <ValidatorForm onSubmit={handleSubmit} ref={form}>
          <Grid container spacing={2} className="p-12">
            <Grid item lg={3} md={3} sm={6} xs={6}>
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
                value={
                  salary?.startDate ? moment(salary?.startDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD")
                }
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
                onChange={(e) => onChange(e, "oldSalary")}
                validators={["required", "isPositive"]}
                errorMessages={[t("staff.notify.errorMessages_required"), t("staff.notify.invalidPositive")]}
                size="small"
              />
            </Grid>

            <Grid item xs={6} sm={6} md={3} lg={3}>
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
                onChange={(e) => onChange(e, "newSalary")}
                value={salary?.newSalary || ""}
                validators={["required", "isPositive"]}
                errorMessages={[t("staff.notify.errorMessages_required"), t("staff.notify.invalidPositive")]}
                size="small"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3}>
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
                validators={["required", "maxStringLength:250"]}
                errorMessages={[
                  t("staff.notify.errorMessages_required"),
                  `${t("staff.notify.invalidStringContent")}(250 kí tự)`,
                ]}
                size="small"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3}>
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
                validators={["required", "maxStringLength:250"]}
                errorMessages={[
                  t("staff.notify.errorMessages_required"),
                  `${t("staff.notify.invalidStringContent")}(250 kí tự)`,
                ]}
                size="small"
              />
            </Grid>
            <Grid item lg={3} md={3} sm={6} xs={6}>
              <FormControl fullWidth={true} className="" size="small">
                <SelectValidator
                  size="small"
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("sendLeader.leaderName")}
                    </span>
                  }
                  value={salary?.leaderId ?? ""}
                  inputProps={{
                    readOnly: salary?.leaderId && salary?.salaryIncreaseStatus === "4",
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
            <Grid item justify="flex-end" className="mb-16">
              <Button className="align-bottom mr-8 mb-4" variant="contained" color="primary" type="submit">
                {t("general.save")}
              </Button>
              <Button className="align-bottom mr-8 mb-4 color-error" variant="contained" onClick={handleClose}>
                {t("general.cancel")}
              </Button>
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
