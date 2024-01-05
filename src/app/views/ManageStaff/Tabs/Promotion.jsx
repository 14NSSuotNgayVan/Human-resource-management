import React, { useEffect, useRef, useState } from "react";
import { Button, FormControl, Grid, Icon, IconButton, MenuItem } from "@material-ui/core";
import { SelectValidator, TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import moment from "moment";
import CustomTable from "app/component/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmationDialog } from "egret";
import {STAFF_POSITION, STAFF_STATUS, SUBMIT_PROFILE_STATUS } from "app/constants/staffConstant";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getProcess, getShouldUpdateProcess } from "app/redux/selectors/ProcessSelector";
import { createProcess, deleteProcess, setProcess, updateProcess } from "app/redux/actions/ProcessAction";
import NotifyDialog from "app/component/CustomNotifyDialog";
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
      {STAFF_STATUS?.VIEW_MANAGE.includes(item.processStatus) && (
        <IconButton
          size="small"
          onClick={() => {
            handleShowDocumentDialog(item);
          }}
        >
          <VisibilityIcon fontSize="small"></VisibilityIcon>
        </IconButton>
      )}
      {!isPendingEndProfile && STAFF_STATUS?.EDIT_PROCESS.includes(item.processStatus) && (
        <IconButton size="small" onClick={() => handleUpdate(item)}>
          <Icon fontSize="small" color="primary">
            edit
          </Icon>
        </IconButton>
      )}
      {!isPendingEndProfile && STAFF_STATUS?.REMOVE.includes(item.processStatus) && (
        <IconButton size="small" onClick={() => handleShowDeleteConfirm(item.id)}>
          <Icon fontSize="small" color="error">
            delete
          </Icon>
        </IconButton>
      )}
      {STAFF_STATUS?.ADDITIONAL.includes(item.processStatus) && (
        <IconButton
          size="small"
          onClick={() => handleShowNotify({ message: item?.additionalRequest, tittle: "Yêu cầu bổ sung" })}
        >
          <Icon fontSize="small" color="secondary">
            notifications
          </Icon>
        </IconButton>
      )}
      {STAFF_STATUS?.REJECT.includes(item.processStatus) && (
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
const Promotion = (props) => {
  const { t, isPendingEndProfile,setShouldOpenPromotionForm } = props;
  const item =useSelector(staffSelector);
  const dispatch = useDispatch();
  const promotionList = useSelector(getProcess);
  const shouldUpdatePromotion = useSelector(getShouldUpdateProcess);
  const [promotionsByPage, setPromotionsByPage] = useState([]);
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
  const [promotion, setPromotion] = useState({});
  useState(() => {
    setPromotion({
      promotionDay: new Date(),
      newPosition: 1,
      note: "",
    });
  }, [shouldUpdatePromotion]);

  useEffect(() => {
    setIsPending(promotionList.some((item) => item?.processStatus === "2"));
  }, [promotionList]);
  const updatePageData = () => {
    const promotions = [...promotionList];
    const startOfPage = pagePagination.page * pagePagination.rowsPerPage;
    const endOfPage = (pagePagination.page + 1) * pagePagination.rowsPerPage;
    const pageData = isPendingEndProfile
      ? promotions
          .filter((item) => item?.processStatus === "3" || item?.processStatus === "4" || item?.processStatus === "5")
          .slice(startOfPage, endOfPage)
      : promotions.slice(startOfPage, endOfPage);
    setPromotionsByPage(pageData);
    setTotalElement(promotions.length);
  };
  useEffect(() => {
    updatePageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePagination,promotionList]);
  const handleSubmit = () => {
    if (isEditing) {
      dispatch(updateProcess(promotion));
    }
    else {
      dispatch(createProcess(item?.id, { ...promotion, processStatus: "1" }));
    }
    setShouldOpenPromotionForm(true);
  };
  const handleClose = () => {
    setPromotion({
      promotionDay: new Date(),
      newPosition: 1,
      note: "",
    });
    dispatch(setProcess({}));
    setIsEditing(false);
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
    setPromotion({ ...promotion, [field]: event.target.value });
  };
  const handleShowDeleteConfirm = (id) => {
    setShowConfirmationDialog(true);
    setId(id);
  };
  const handleConfirmDelete = () => {
    dispatch(deleteProcess(id));
    setShowConfirmationDialog(false);
  };
  const handleUpdate = (item) => {
    setIsEditing(true);
    setPromotion({ ...item });
  };
  const handleShowNotify = (item) => {
    setShowNotify({
      shouldShowNotifyDialog: true,
      message: item?.message,
      tittle: item?.tittle,
    });
  };
  const handleShowDocumentDialog = (PromotionData) => {
    dispatch(setProcess({...PromotionData}));
    setShouldOpenPromotionForm(true);
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
      title: t("staff.promotion.promotionDay"),
      field: "promotionDay",
      align: "center",
      maxWidth: "100px",
      minWidth: "100px",
      render: (props) => <span>{moment(new Date(props?.promotionDay)).format("DD/MM/YYYY")}</span>,
    },
    {
      title: t("staff.promotion.currentPosition"),
      field: "currentPosition",
      align: "center",
      maxWidth: "100px",
      minWidth: "100px",
      render: (props) => <span>{STAFF_POSITION?.find((item) => item?.id === props?.currentPosition)?.name}</span>,
    },
    {
      title: t("staff.promotion.newPosition"),
      field: "newPosition",
      align: "center",
      maxWidth: "100px",
      minWidth: "100px",
      render: (props) => <span>{STAFF_POSITION?.find((item) => item?.id === props?.newPosition)?.name}</span>,
    },
    {
      title: t("staff.promotion.note"),
      field: "note",
      align: "left",
      maxWidth: "250px",
      minWidth: "250px",
      render: (props) => <p className="custom-table-cell">{props?.note}</p>,
    },
    {
      title: t("staff.submit_profile_status_display"),
      field: "submitProfileStatus",
      align: "left",
      maxWidth: "150px",
      minWidth: "150px",
      render: (props) => <span>{t(`staff.submit_profile_status.${SUBMIT_PROFILE_STATUS[props.processStatus]}`)}</span>,
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
              <Grid item xs={6} sm={6} md={2} lg={2}>
                <FormControl fullWidth={true} className="" size="small">
                  <SelectValidator
                    size="small"
                    label={
                      <span className="inputLabel">
                        <span style={{ color: "red" }}> * </span>
                        {t("staff.promotion.currentPosition")}
                      </span>
                    }
                    value={item?.currentPosition ?? 1}
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

              <Grid item xs={6} sm={6} md={2} lg={2}>
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
              <Grid item xs={6} sm={6} md={4} lg={4}>
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
                  {t(`general.${"save"}`)}
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
