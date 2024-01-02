import React, { useState } from "react";
import { getStaffByIdAction, searchByPageAction, setItem, updateStaffAction } from "app/redux/actions/StaffActions.js";
import { Grid, IconButton, FormControl, Input, InputAdornment, Icon, Button } from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { staffListSelector, totalElementsSelector, shouldUpdateSelector, staffSelector } from "app/redux/selectors/StaffSelector.js";
import moment from "moment";
import { GENDER, STAFF_STATUS, TEAM } from "app/constants/staffConstant.js";
import CustomTable from "app/component/CustomTable";
import PendingApprovalDialog from "./PedingApprovalDialog";
import AdditionalDialog from "../AdditionalDialog";
import RejectionDialog from "../RejectionDialog";
import EndProfileFormDialog from "app/component/Form/EndProfileFormDialog";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function PendingEndProfile(props) {
  const dispatch = useDispatch();
  const staff = useSelector(staffSelector);
  const staffList = useSelector(staffListSelector);
  const totalElements = useSelector(totalElementsSelector);
  const shouldUpdate = useSelector(shouldUpdateSelector);
  const { t } = props;
  const [pagePagination, setPagePagination] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [showEditorDialog, setShowEditorDialog] = useState(false);
  const [showAdditionalDialog, setShowAdditionalDialog] = useState(false);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [shouldOpenDocumentDialog, setShouldOpenDocumentDialog] = useState(false);
  const [keyword, setKeyword] = useState("");

  const updatePageData = async () => {
    var searchObject = {};
    searchObject.keyword = keyword;
    searchObject.pageIndex = pagePagination.page + 1;
    searchObject.pageSize = pagePagination.rowsPerPage;
    searchObject.listStatus = STAFF_STATUS.END_PROFILE_PROCESS;
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

  const handleSubmit = () => {
    dispatch(
      updateStaffAction({
        ...staff,
        terminationAppointmentDate:moment().format("YYYY-MM-DD"),
        submitProfileStatus: "7"
      })
    );
    handleCloseDialog();
}
  const handleShowEditorDialog = (item) => {
    dispatch(getStaffByIdAction(item?.id));
    setShowEditorDialog(true);
  };
  const handleShowDocumentDialog = (item) => {
    dispatch(getStaffByIdAction(item?.id));
    setShouldOpenDocumentDialog(true);
  };
  const handleCloseDialog = () => {
    dispatch(setItem({}));
    setShowEditorDialog(false);
    setShouldOpenDocumentDialog(false);
    setShowAdditionalDialog(false);
    setShowRejectionDialog(false);
  };
  
  const handleShowAdditionalDialog = () => {
    setShowAdditionalDialog(true);
  };
  const handleCloseAdditionalDialog = () => {
    setShowAdditionalDialog(false);
  };
  const handleSubmitAdditional = (content) => {
    dispatch(
      updateStaffAction({
        ...staff,
        additionalRequestTermination: content,
        submitProfileStatus: "8"
      })
    );
    handleCloseDialog();
  };

  const handleShowRejectionDialog = () => {
    setShowRejectionDialog(true);
  };
  const handleCloseRejectionDialog = () => {
    setShowRejectionDialog(false);
  };
  const handleSubmitRejection = (rejectionDate, content) => {
    dispatch(
      updateStaffAction({
        ...staff,
        refuseEndProfileDay: rejectionDate,
        reasonForRefuseEndProfile:content,
        submitProfileStatus: "9"
      })
    );
    handleCloseDialog();
  };

  const Action = (props) => {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleSubmit();
          }}
        >
          {t("general.approve")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleShowAdditionalDialog();
          }}
        >
          {t("general.additionalRequest")}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            handleShowRejectionDialog();
          }}
        >
          {t("general.reject")}
        </Button>
      </>
    );
  };
  let columns = [
    {
      title: t("general.action"),
      field: "custom",
      align: "center",
      minWidth: "80px",
      render: (rowData) => (
        <>
          <IconButton size="small" onClick={() => handleShowEditorDialog(rowData)}>
            <Icon fontSize="small" color="primary">
              edit
            </Icon>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              handleShowDocumentDialog(rowData);
            }}
          >
            <VisibilityIcon fontSize="small"></VisibilityIcon>
          </IconButton>
        </>
      ),
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
      render: (props) => <p className="custom-table-cell">{props?.address}</p>,
    },
    {
      title: t("staff.phone"),
      field: "phone",
      align: "center",
      minWidth: "150px",
    },
  ];
  return (
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
        {shouldOpenDocumentDialog && <PendingApprovalDialog t={t} handleCloseDialog={handleCloseDialog} isPendingEndProfile={true}/>}
        {showEditorDialog && (
          <EndProfileFormDialog
            handleCloseDialog={handleCloseDialog}
            t={t}
            Action={Action}
          />
        )}
        {showAdditionalDialog && (
          <AdditionalDialog
            t={t}
            handleCloseDialog={handleCloseAdditionalDialog}
            handleSubmitForm={handleSubmitAdditional}
          />
        )}
        {showRejectionDialog && (
          <RejectionDialog
            t={t}
            handleCloseDialog={handleCloseRejectionDialog}
            handleSubmitForm={handleSubmitRejection}
            tittle={"reasonForRefuseEndProfile"}
          />
        )}
        <CustomTable
          data={staffList}
          columns={columns}
          totalElements={totalElements}
          pagePagination={pagePagination}
          setPagination={setPagePagination}
        />
      </Grid>
    </Grid>
  );
}
export default PendingEndProfile;
