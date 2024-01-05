import React, { useCallback, useState } from "react";
import { searchByPageAction, deleteStaffAction, setItem, getStaffByIdAction } from "app/redux/actions/StaffActions.js";
import { Grid, IconButton, Icon, FormControl, Input, InputAdornment, Button } from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Breadcrumb, ConfirmationDialog } from "egret";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { staffListSelector, totalElementsSelector, shouldUpdateSelector } from "app/redux/selectors/StaffSelector.js";
import moment from "moment";
import { GENDER, STAFF_STATUS, SUBMIT_PROFILE_STATUS, TEAM } from "app/constants/staffConstant.js";
import CustomTable from "app/component/CustomTable";
import PendingApprovalDialog from "../LeadershipApproval/Tabs/PedingApprovalDialog";
import ManageStaffDialog from "./ManageStaffDialog";
import NotifyDialog from "app/component/CustomNotifyDialog";
import { createProcess, updateProcess } from "app/redux/actions/ProcessAction";
import ManageSendLeader from "./ManageSendLeader";
import PromotionDialog from "app/component/Form/PromotionDialog";
import SalaryIncreaseDialog from "app/component/Form/SalaryIncreaseDialog";
import { createSalaries, updateSalary } from "app/redux/actions/SalaryAction";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function ManageStaff(props) {
  const dispatch = useDispatch();
  const staffList = useSelector(staffListSelector);
  const totalElements = useSelector(totalElementsSelector);
  const shouldUpdate = useSelector(shouldUpdateSelector);
  const { t } = props;
  const [currentItem, setCurrentItem] = useState({});
  const [pagePagination, setPagePagination] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [showEditorDialog, setShowEditorDialog] = useState(false);
  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] = useState(false);
  const [shouldOpenDocumentDialog, setShouldOpenDocumentDialog] = useState(false);
  const [shouldOpenAdditionalDialog, setShouldOpenAdditionalDialog] = useState(false);
  const [shouldOpenSendLeaderDialog, setShouldOpenSendLeaderDialog] = useState(false);
  const [shouldOpenPromotionForm, setShouldOpenPromotionForm] = useState(false);
  const [shouldOpenSalaryForm, setShouldOpenSalaryForm] = useState(false);
  const [iShowAdditional, setIsShowAddition] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [keyword, setKeyword] = useState("");
  const updatePageData = async () => {
    var searchObject = {};
    searchObject.keyword = keyword;
    searchObject.pageIndex = pagePagination.page + 1;
    searchObject.pageSize = pagePagination.rowsPerPage;
    searchObject.listStatus = STAFF_STATUS?.MANAGE;
    dispatch(searchByPageAction(searchObject));
  };

  useEffect(() => {
    updatePageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePagination.rowsPerPage, pagePagination.page, keyword]);

  useEffect(() => {
    if (shouldUpdate) {
      updatePageData();
      handleCloseDocumentDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUpdate]);

  const handleShowDocumentDialog = useCallback((item, register) => {
    dispatch(getStaffByIdAction(item?.id));
    setIsRegister(register);
    setShouldOpenDocumentDialog(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleDelete = (staff) => {
    setCurrentItem(staff);
    setShouldOpenConfirmationDialog(true);
  };
  const handleShowNotify = (staff, ShowAddition) => {
    setIsShowAddition(ShowAddition);
    setCurrentItem(staff);
    setShouldOpenAdditionalDialog(true);
  };

  const handleDialogClose = useCallback(() => {
    setShowEditorDialog(false);
    setShouldOpenConfirmationDialog(false);
    setShouldOpenDocumentDialog(false);
    setShouldOpenAdditionalDialog(false);
  }, []);

  const handleCloseManageDialog = useCallback(() => {
    setShouldOpenPromotionForm(false);
    setShouldOpenSalaryForm(false);
    setShouldOpenSendLeaderDialog(false);
  }, []);
  const handleCloseDocumentDialog = useCallback(() => {
    setShouldOpenDocumentDialog(false);
  }, []);

  const handleConfirmationResponse = async () => {
    if (staffList?.length === 1 && setPagePagination.page === 1) {
      setPagePagination({ ...pagePagination, page: 0 });
    }
    dispatch(deleteStaffAction(currentItem?.id));
    handleDialogClose();
  };

  const handleAddItem = (item) => {
    dispatch(setItem(item));
    setShowEditorDialog(true);
  };

  ////
  const handleSubmitSendLeader = (Data, staff) => {
    if(shouldOpenPromotionForm){
      if (Data?.id) {
        dispatch(updateProcess({ ...Data, processStatus: "2" }));
      } else dispatch(createProcess(staff?.id, { ...Data, processStatus: "2" }));
    }else 
    if(shouldOpenSalaryForm){
      if (Data?.id) {
          dispatch(updateSalary({ ...Data, salaryIncreaseStatus: 2 }))
      } else
          dispatch(createSalaries(staff?.id, { ...Data, salaryIncreaseStatus: 2 }))
    }
      handleCloseManageDialog();
  };
  const DialogAction = ({ isPending }) => {
    return (
      <>
        <Button
          disabled={isPending}
          variant="contained"
          color="primary"
          onClick={() => {
            setShouldOpenSendLeaderDialog(true);
          }}
        >
          {t("general.sendLeader")}
        </Button>
      </>
    );
  };
  const Action = (props) => {
    const item = props.item;
    return (
      <div className="none_wrap">
        {STAFF_STATUS?.VIEW.includes(item.submitProfileStatus) && (
          <IconButton
            size="small"
            onClick={() => {
              handleShowDocumentDialog(item, false);
            }}
          >
            <VisibilityIcon fontSize="small"></VisibilityIcon>
          </IconButton>
        )}
        {STAFF_STATUS?.EDIT.includes(item.submitProfileStatus) && (
          <IconButton size="small" onClick={() => handleAddItem(item)}>
            <Icon fontSize="small" color="primary">
              edit
            </Icon>
          </IconButton>
        )}
        {STAFF_STATUS?.REMOVE.includes(item.submitProfileStatus) && (
          <IconButton size="small" onClick={() => handleDelete(item)}>
            <Icon fontSize="small" color="error">
              delete
            </Icon>
          </IconButton>
        )}
        {STAFF_STATUS?.ADDITIONAL.includes(item.submitProfileStatus) && (
          <IconButton size="small" onClick={() => handleShowNotify(item, true)}>
            <Icon fontSize="small" color="secondary">
              notifications
            </Icon>
          </IconButton>
        )}
        {STAFF_STATUS?.REJECT.includes(item.submitProfileStatus) && (
          <IconButton size="small" onClick={() => handleShowNotify(item, false)}>
            <Icon fontSize="small" color="secondary">
              notifications
            </Icon>
          </IconButton>
        )}
      </div>
    );
  };
  let columns = [
    {
      title: t("general.action"),
      field: "custom",
      align: "center",
      maxWidth: "100px",
      minWidth: "100px",
      render: (rowData) => <Action item={rowData} />,
    },
    {
      title: t("STT"),
      align: "center",
      maxWidth: "60px",
      minWidth: "60px",
      render: (rowData) => rowData.tableData.id + 1 + pagePagination.page * pagePagination.rowsPerPage,
    },
    {
      title: t("staff.code"),
      field: "code",
      align: "center",
      maxWidth: "120px",
      minWidth: "120px",
    },
    { title: t("staff.name"), field: "name", align: "left", minWidth: "200px" },
    {
      title: t("staff.dateOfBirth"),
      field: "dateOfBirth",
      align: "center",
      maxWidth: "100px",
      minWidth: "100px",
      render: (props) => <span>{moment(new Date(props?.dateOfBirth)).format("DD/MM/YYYY")}</span>,
    },
    {
      title: t("staff.gender_display"),
      field: "gender",
      align: "center",
      maxWidth: "80px",
      minWidth: "80px",
      render: (props) => <span>{t(`staff.gender.${GENDER[props.gender]?.name}`)}</span>,
    },
    {
      title: t("staff.team"),
      field: "team",
      align: "left",
      maxWidth: "150px",
      minWidth: "150px",
      render: (props) => <span>{TEAM[props.team]?.name}</span>,
    },
    {
      title: t("staff.phone"),
      field: "phone",
      align: "center",
      maxWidth: "100px",
      minWidth: "100px",
    },
    {
      title: t("staff.address"),
      field: "address",
      align: "left",
      maxWidth: "250px",
      minWidth: "250px",
      render: (props) => <p className="custom-table-cell">{props?.address}</p>,
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
    <div className="m-sm-24">
      <div className="mb-sm-24 sm-hide">
        <Breadcrumb routeSegments={[{ name: t("Dashboard.manageStaff"), path: "staff_manager/ManageStaff" }]} />
      </div>
      <Grid container spacing={2} justify="space-between">
        <Grid item md={4} xs={12}></Grid>
        <Grid item md={4} sm={12} xs={12}>
          <FormControl fullWidth style={{ marginTop: "6px" }}>
            <Input
              className="search_box w-100"
              onChange={(event) => {
                setKeyword(event.target.value);
              }}
              placeholder={t("general.enterSearch")}
              id="search_box"
              startAdornment={
                <InputAdornment>
                  <Link to="#">
                    {" "}
                    <SearchIcon style={{ position: "absolute", top: "0", right: "0" }} />
                  </Link>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <div>
            {shouldOpenConfirmationDialog && (
              <ConfirmationDialog
                title={t("general.confirm")}
                t={t}
                onConfirmDialogClose={handleDialogClose}
                onYesClick={handleConfirmationResponse}
                text={t("general.deleteConfirm")}
                Yes={t("general.Yes")}
                No={t("general.cancel")}
              />
            )}
          </div>
          <div>
            {showEditorDialog && (
              <ManageStaffDialog
                handleClose={handleDialogClose}
                t={t}
                handleShowDocumentDialog={handleShowDocumentDialog}
                setShouldOpenPromotionForm={setShouldOpenPromotionForm}
                setShouldOpenSalaryForm={setShouldOpenSalaryForm}
              />
            )}
            {shouldOpenDocumentDialog && (
              <PendingApprovalDialog
                handleCloseDialog={handleCloseDocumentDialog}
                handleCloseAllDialog={handleDialogClose}
                t={t}
                isRegister={isRegister}
              />
            )}
            {iShowAdditional && shouldOpenAdditionalDialog && (
              <NotifyDialog
                t={t}
                handleCloseDialog={handleDialogClose}
                item={{
                  tittle: "Nội dung yêu cầu bổ sung kết thúc",
                  message: currentItem?.additionalRequestTermination,
                }}
              />
            )}
            {!iShowAdditional && shouldOpenAdditionalDialog && (
              <NotifyDialog
                t={t}
                handleCloseDialog={handleDialogClose}
                item={{
                  tittle: "Nội dung từ chối kết thúc",
                  message: currentItem?.reasonForRefuseEndProfile,
                }}
              />
            )}
            {shouldOpenPromotionForm && (
              <PromotionDialog
                handleCloseDialog={() => {
                  setShouldOpenPromotionForm(false);
                }}
                t={t}
                Action={DialogAction}
              />
            )}
            {shouldOpenSalaryForm && (
              <SalaryIncreaseDialog
                handleCloseDialog={() => {
                  setShouldOpenSalaryForm(false);
                }}
                t={t}
                Action={DialogAction}
              />
            )}
            {shouldOpenSendLeaderDialog && (
              <ManageSendLeader
                t={t}
                handleCloseDialog={() => {
                  setShouldOpenSendLeaderDialog(false);
                }}
                handleSubmit={handleSubmitSendLeader}
                isProcess={shouldOpenPromotionForm}
                isSalary={shouldOpenSalaryForm}
              />
            )}
          </div>
          <CustomTable
            data={staffList}
            columns={columns}
            totalElements={totalElements}
            pagePagination={pagePagination}
            setPagination={setPagePagination}
          />
        </Grid>
      </Grid>
    </div>
  );
}
export default ManageStaff;
