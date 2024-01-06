import React, { useState } from "react";
import { searchByPageAction, setItem } from "app/redux/actions/StaffActions.js";
import { Grid, IconButton, FormControl, Input, InputAdornment } from "@material-ui/core";
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
import { GENDER,STATUS_FOR_APPROVED,TEAM } from "app/constants/staffConstant.js";
import CustomTable from "app/component/CustomTable";
import PendingApprovalDialog from "../LeadershipApproval/Tabs/PedingApprovalDialog";
import { getProfileStatusNameById } from "utils";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function LeadershipApproved(props) {
  const dispatch = useDispatch();
  const staffList = useSelector(staffListSelector);
  const totalElements = useSelector(totalElementsSelector);
  const shouldUpdate = useSelector(shouldUpdateSelector);
  const { t } = props;
  const [pagePagination, setPagePagination] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [showEditorDialog, setShowEditorDialog] = useState(false);
  const [keyword, setKeyword] = useState("");
  const updatePageData = async () => {
    var searchObject = {};
    searchObject.keyword = keyword;
    searchObject.pageIndex = pagePagination.page + 1;
    searchObject.pageSize = pagePagination.rowsPerPage;
    searchObject.listStatus = STATUS_FOR_APPROVED.join(',');
    dispatch(searchByPageAction(searchObject));
  };

  useEffect(() => {
    updatePageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePagination.rowsPerPage, pagePagination.page, keyword]);

  useEffect(() => {
    if (shouldUpdate) {
      updatePageData();
      setShowEditorDialog(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUpdate]);
  const handleShowDialog = (item) => {
    dispatch(setItem(item));
    setShowEditorDialog(true);
  };
  const handleCloseDialog = () => {
    dispatch(setItem({}));
    setShowEditorDialog(false);
  };
  const Action = (props) => {
    const { item, handleShowDialog } = props;
    return (
      <div className="none_wrap">
        {STATUS_FOR_APPROVED.join(',').includes(item.submitProfileStatus) && (
          <IconButton size="small" onClick={() => handleShowDialog(item)}>
            <VisibilityIcon fontSize="small"></VisibilityIcon>
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
      render: (rowData) => <Action item={rowData} handleShowDialog={handleShowDialog} />,
    },
    {
      title: t("STT"),
      align: "center",
      maxWidth: "60px",
      minWidth: "60px",
      render: (rowData) => rowData.tableData.id +1+pagePagination.page*pagePagination.rowsPerPage,
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
        maxWidth: "150px",
        minWidth: "150px",
        render: (props) => (
          <span>{t(`staff.submit_profile_status.${getProfileStatusNameById(props?.submitProfileStatus)}`)}</span>
        ),
      },
  ];
  return (
    <div className="m-sm-24">
      <div className="mb-sm-24 sm-hide">
        <Breadcrumb
          routeSegments={[{ name: t("Dashboard.LeadershipApproved"), path: "staff_manager/LeadershipApproved" }]}
        />
      </div>
    <Grid container spacing={2} justify="flex-end">
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
        {showEditorDialog && <PendingApprovalDialog t={t} handleCloseDialog={handleCloseDialog} />}
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
export default LeadershipApproved;
