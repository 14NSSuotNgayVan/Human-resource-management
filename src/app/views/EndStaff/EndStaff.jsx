import React, { useCallback, useState } from "react";
import { searchByPageAction, setItem, getStaffByIdAction } from "app/redux/actions/StaffActions.js";
import { Grid, IconButton, Icon, FormControl, Input, InputAdornment } from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Breadcrumb } from "egret";
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
import SaveProfileDialog from "./SaveProfileDialog";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function EndStaff(props) {
  const dispatch = useDispatch();
  const staffList = useSelector(staffListSelector);
  const totalElements = useSelector(totalElementsSelector);
  const shouldUpdate = useSelector(shouldUpdateSelector);
  const { t } = props;
  const [pagePagination, setPagePagination] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [showSaveProfileDialog, setShowSaveProfileDialog] = useState(false);
  const [shouldOpenDocumentDialog, setShouldOpenDocumentDialog] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [keyword, setKeyword] = useState("");
  const updatePageData = async () => {
    var searchObject = {};
    searchObject.keyword = keyword;
    searchObject.pageIndex = pagePagination.page + 1;
    searchObject.pageSize = pagePagination.rowsPerPage;
    searchObject.listStatus = STAFF_STATUS.VIEW_END_PROFILE;
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

  const handleDialogClose = useCallback(() => {
    setShowSaveProfileDialog(false);
    setShouldOpenDocumentDialog(false);
  }, []);
  const handleCloseDocumentDialog = useCallback(() => {
    setShouldOpenDocumentDialog(false);
  }, []);

  const handleShowSaveProfileDialog = (item) => {
    dispatch(setItem(item));
    setShowSaveProfileDialog(true);
  };

  const Action = (props) => {
    const item = props.item;
    return (
      <div className="none_wrap">
        {STAFF_STATUS.VIEW_END_PROFILE.includes(item.submitProfileStatus) && (
          <IconButton
            size="small"
            onClick={() => {
              handleShowDocumentDialog(item, false);
            }}
          >
            <VisibilityIcon fontSize="small"></VisibilityIcon>
          </IconButton>
        )}
        {STAFF_STATUS.EDIT_END_PROFILE.includes(item.submitProfileStatus) && (
          <IconButton size="small" onClick={() => handleShowSaveProfileDialog(item)}>
            <Icon fontSize="small" color="primary">
              save
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
      minWidth: "80px",
      render: (rowData) => <Action item={rowData} />,
    },
    {
      title: t("STT"),
      align: "center",
      minWidth: "60px",
      render: (rowData) => rowData.tableData.id + 1 + pagePagination.page * pagePagination.rowsPerPage,
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
        <Breadcrumb routeSegments={[{ name: t("Dashboard.endStaff"), path: "staff_manager/EndStaff" }]} />
      </div>
      <Grid container spacing={2} justify="space-between">
        <Grid item md={4} sm={12} xs={12}></Grid>
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
            {showSaveProfileDialog && (
              <>
                <SaveProfileDialog t={t} handleCloseDialog={handleDialogClose} />
              </>
            )}
            {shouldOpenDocumentDialog && (
              <PendingApprovalDialog
                handleCloseDialog={handleCloseDocumentDialog}
                handleCloseAllDialog={handleDialogClose}
                t={t}
                isRegister={isRegister}
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
export default EndStaff;
