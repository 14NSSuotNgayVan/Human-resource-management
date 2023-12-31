import React, { useEffect, useRef, useState } from "react";
import { Button, FormControl, Grid, Icon, IconButton, MenuItem } from "@material-ui/core";
import { SelectValidator, TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import moment from "moment";
import CustomTable from "app/component/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmationDialog } from "egret";
import { LEADER, NAME_REGEX, STAFF_POSITION, SUBMIT_PROFILE_STATUS } from "app/constants/staffConstant";
import { staffSelector } from "app/redux/selectors/StaffSelector";
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
const Promotion = (props) => {
  const { t, item } = props;
  const dispatch = useDispatch();
  const promotionList = [];
  const [promotionsByPage, setPromotionsByPage] = useState([]);
  const [totalElement, setTotalElement] = useState(0);
  const [pagePagination, setPagePagination] = useState({ page: 0, rowsPerPage: 10 });

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [promotion, setPromotion] = useState({});
  const form = useRef(null);
  const updatePageData = () => {
    const salaries = [...promotionList];
    const startOfPage = pagePagination.page * pagePagination.rowsPerPage;
    const endOfPage = (pagePagination.page + 1) * pagePagination.rowsPerPage;
    const pageData = salaries.slice(startOfPage, endOfPage);
    setPromotionsByPage(pageData);
    setTotalElement(salaries.length);
  };
  useEffect(() => {
    updatePageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePagination]);
  const handleSubmit = () => {};
  const handleClose = () => {
    setPromotion(null);
    setShowConfirmationDialog(false);
  };
  const onChange = (event, field) => {
    setPromotion({ ...promotion, [field]: event.target.value });
  };
  const handleShowDeleteConfirm = (id) => {
    setShowConfirmationDialog(true);
    setPromotion({ id: id });
  };
  const handleConfirmDelete = () => {
    setShowConfirmationDialog(false);
  };
  const handleUpdate = (item) => {
    setPromotion({ ...item });
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
      title: t("staff.promotion.promotionDay"),
      field: "promotionDay",
      align: "center",
      minWidth: "120px",
      render: (props) => <span>{moment(new Date(props?.promotionDay)).format("DD/MM/YYYY")}</span>,
    },
    {
      title: t("staff.promotion.currentPosition"),
      field: "currentPosition",
      align: "left",
      minWidth: "150px",
      maxWidth: "250px",
    },
    {
      title: t("staff.promotion.newPosition"),
      field: "newPosition",
      align: "left",
      minWidth: "150px",
      maxWidth: "250px",
    },
    {
      title: t("staff.promotion.note"),
      field: "note",
      align: "left",
      minWidth: "170px",
      maxWidth: "200px",
      render: (props) => wrapText4(props?.note,200),
    },
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
                    {t("staff.promotion.promotionDay")}
                  </span>
                }
                onChange={(e) => onChange(e, "promotionDay")}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}    
                name="promotionDay"
                value={
                  promotion?.promotionDay
                    ? moment(promotion?.promotionDay).format("YYYY-MM-DD")
                    : moment().format("YYYY-MM-DD")
                }
                validators={["required"]}
                errorMessages={[t("staff.notify.errorMessages_required")]}
                size="small"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <FormControl fullWidth={true} className="" size="small">
                <SelectValidator
                  size="small"
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.promotion.currentPosition")}
                    </span>
                  }
                  value={promotion?.currentPosition ?? 1}
                  inputProps={{
                    readOnly: true,
                  }}
                  onChange={(e) => onChange(e, "currentPosition")}
                  validators={["required"]}
                  errorMessages={[t("staff.notify.errorMessages_required")]}
                  className="w-100 mb-16"
                >
                  {STAFF_POSITION?.map((item) => {
                    return (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </SelectValidator>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={6} md={3} lg={3}>
              <FormControl fullWidth={true} className="" size="small">
                <SelectValidator
                  size="small"
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.promotion.newPosition")}
                    </span>
                  }
                  value={promotion?.newPosition ?? ""}
                  onChange={(e) => onChange(e, "newPosition")}
                  validators={["required"]}
                  errorMessages={[t("staff.notify.errorMessages_required")]}
                  className="w-100 mb-16"
                >
                  {STAFF_POSITION?.map((item) => {
                    return (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </SelectValidator>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <TextValidator
                className={"w-100 mb-16"}
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.promotion.note")}
                  </span>
                }
                type="text"
                name="note"
                onChange={(e) => onChange(e, "note")}
                value={promotion?.note || ""}
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
                  value={promotion?.leaderId ?? ""}
                  inputProps={{
                    readOnly: promotion?.leaderId && promotion?.salaryIncreaseStatus === "4",
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
          data={promotionsByPage}
          columns={columns}
          totalElements={totalElement}
          pagePagination={pagePagination}
          setPagination={setPagePagination}
        />
      </Grid>
    </Grid>
  );
};
export default Promotion;
