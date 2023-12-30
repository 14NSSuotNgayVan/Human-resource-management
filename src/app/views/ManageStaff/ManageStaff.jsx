import React, { useCallback, useState } from "react";
import { searchByPageAction, deleteStaffAction, setItem, getStaffByIdAction } from "app/redux/actions/StaffActions.js";
import { Grid, IconButton, Icon, Button, FormControl, Input, InputAdornment } from "@material-ui/core";
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
import AdditionalDialog from "../LeadershipApproval/AdditionalDialog";
import RejectionDialog from "../LeadershipApproval/RejectionDialog";

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
  const [shouldOpenAdditionalDialog, setShouldOpenNotifyDialog] = useState(false);
  const [iShowAdditional,setIsShowAddition] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [keyword, setKeyword] = useState("");
  const updatePageData = async () => {
    var searchObject = {};
    searchObject.keyword = keyword;
    searchObject.pageIndex = pagePagination.page + 1;
    searchObject.pageSize = pagePagination.rowsPerPage;
    searchObject.listStatus = STAFF_STATUS.MANAGE;
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

  const handleShowDocumentDialog =useCallback((item,register) => {
    dispatch(getStaffByIdAction(item?.id));
    setIsRegister(register);
    setShouldOpenDocumentDialog(true);
    // setShowEditorDialog(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const handleDelete = (staff) => {
    setCurrentItem(staff);
    setShouldOpenConfirmationDialog(true);
  };
  const handleShowNotify = (staff,ShowAddition) => {
    setIsShowAddition(ShowAddition);
    setCurrentItem(staff);
    setShouldOpenNotifyDialog(true);
  };
  
  const handleDialogClose = useCallback(() => {
    setShowEditorDialog(false);
    setShouldOpenConfirmationDialog(false);
    setShouldOpenDocumentDialog(false);
    setShouldOpenNotifyDialog(false);
  },[]);
  const handleCloseDocumentDialog = useCallback(() => {
    setShouldOpenDocumentDialog(false);
  },[]);

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

  const Action = (props) => {
    const item = props.item;
    return (
      <div className="none_wrap">
        {STAFF_STATUS.EDIT.includes(item.submitProfileStatus) && (
          <IconButton size="small" onClick={()=>handleAddItem(item)}>
            <Icon fontSize="small" color="primary">
              edit
            </Icon>
          </IconButton>
        )}
        {STAFF_STATUS.REMOVE.includes(item.submitProfileStatus)&&
        <IconButton size="small" onClick={()=>handleDelete(item)}>
          <Icon fontSize="small" color="error">
            delete
          </Icon>
        </IconButton>}
        {STAFF_STATUS.VIEW.includes(item.submitProfileStatus)&&
        <IconButton size="small" onClick={() => {handleShowDocumentDialog(item,false)}}>
          <VisibilityIcon fontSize="small"></VisibilityIcon>
        </IconButton>}
        {STAFF_STATUS.ADDITIONAL.includes(item.submitProfileStatus)&&
        <IconButton size="small" onClick={()=>handleShowNotify(item,true)}>
        <Icon fontSize="small" color="secondary">
        notifications
        </Icon>
      </IconButton>}
        {STAFF_STATUS.REJECT.includes(item.submitProfileStatus)&&
        <IconButton size="small" onClick={()=>handleShowNotify(item,false)}>
        <Icon fontSize="small" color="secondary">
        notifications
        </Icon>
      </IconButton>}
      </div>
    );
  };
  let columns = [
    {
      title: t("general.action"),
      field: "custom",
      align: "center",
      minWidth: "80px",
      render: (rowData) => <Action item={rowData} />,
    },
    {
      title: t("STT"),
      align: "center",
      minWidth: "60px",
      render: (rowData) => rowData.tableData.id +1+pagePagination.page*pagePagination.rowsPerPage,
    },
    {
      title: t("staff.code"),
      field: "code",
      align: "center",
      minWidth: "150px",
    },
    { title: t("staff.name"), field: "name", align: "left", minWidth: "170px" },
    {
      title: t("staff.dateOfBirth"),
      field: "dateOfBirth",
      align: "center",
      minWidth: "120px",
      render: (props) => <span>{moment(new Date(props?.dateOfBirth)).format("DD/MM/YYYY")}</span>,
    },
    {
      title: t("staff.gender_display"),
      field: "gender",
      align: "center",
      minWidth: "80px",
      render: (props) => <span>{t(`staff.gender.${GENDER[props.gender]?.name}`)}</span>,
    },
    {
      title: t("staff.team"),
      field: "team",
      align: "left",
      minWidth: "100px",
      render: (props) => <span>{TEAM[props.team]?.name}</span>,
    },

    {
      title: t("staff.address"),
      field: "address",
      align: "left",
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      title: t("staff.phone"),
      field: "phone",
      align: "center",
      minWidth: "150px",
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
        <Breadcrumb
          routeSegments={[{ name: t("Dashboard.addStaff"), path: "staff_manager/AddStaff" }]}
        />
      </div>
      <Grid container spacing={2} justify="space-between">
        <Grid item md={4} xs={12}>
          <Button
            className="align-bottom mr-8 mb-4"
            variant="contained"
            color="primary"
            onClick={() => handleAddItem(null)}
          >
          {t("general.add")}
          </Button>
        </Grid>
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
                open={shouldOpenConfirmationDialog}
                onConfirmDialogClose={handleDialogClose}
                onYesClick={handleConfirmationResponse}
                text={t("general.deleteConfirm")}
                Yes={t("general.Yes")}
                No={t("general.No")}
              />
            )}
          </div>
          <div>
          {shouldOpenDocumentDialog && (
            <PendingApprovalDialog
            handleCloseDialog ={handleCloseDocumentDialog}
            handleCloseAllDialog ={handleDialogClose}
            t ={t}
            isRegister={isRegister}
            />
            )}
            {iShowAdditional && shouldOpenAdditionalDialog && (
            <AdditionalDialog
            handleCloseDialog ={handleDialogClose}
            t ={t}
            item={currentItem}
            iShowAdditional={true}
            isManage ={true}
            />
            )}
            {!iShowAdditional && shouldOpenAdditionalDialog && (
            <RejectionDialog
            handleCloseDialog ={handleDialogClose}
            t ={t}
            item={currentItem}
            isShowRejectReason={true}
            isManage ={true}
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
