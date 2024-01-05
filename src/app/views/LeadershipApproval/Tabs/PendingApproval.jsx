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
import {
  staffListSelector,
  totalElementsSelector,
  shouldUpdateSelector,
  staffSelector,
} from "app/redux/selectors/StaffSelector.js";
import moment from "moment";
import { GENDER, STAFF_STATUS, SUBMIT_PROFILE_STATUS, TEAM } from "app/constants/staffConstant.js";
import CustomTable from "app/component/CustomTable";
import PendingApprovalDialog from "./PedingApprovalDialog";
import EndProfileFormDialog from "app/component/Form/EndProfileFormDialog";
import AdditionalDialog from "../AdditionalDialog";
import RejectionDialog from "../RejectionDialog";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function PendingApproval(props) {
  const staff = useSelector(staffSelector);
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
  const [showEditorEndingDialog, setShowEditorEndingDialog] = useState(false);
  const [shouldOpenDocumentDialog, setShouldOpenDocumentDialog] = useState(false);
  const [showAdditionalDialog, setShowAdditionalDialog] = useState(false);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [keyword, setKeyword] = useState("");
  const updatePageData = async () => {
    var searchObject = {};
    searchObject.keyword = keyword;
    searchObject.pageIndex = pagePagination.page + 1;
    searchObject.pageSize = pagePagination.rowsPerPage;
    searchObject.listStatus = STAFF_STATUS?.PENDING;
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
    setShowEditorEndingDialog(false);
    setShowEditorDialog(false);
    setShouldOpenDocumentDialog(false);
    setShowAdditionalDialog(false);
    setShowRejectionDialog(false);
  };
  const handleShowEditorDialog = (item) => {
    dispatch(getStaffByIdAction(item?.id));
    setShowEditorEndingDialog(true);
  };
  const handleShowDocumentDialog = (item) => {
    dispatch(getStaffByIdAction(item?.id));
    setShouldOpenDocumentDialog(true);
  };
  const handleSubmit = () => {
    dispatch(
      updateStaffAction({
        ...staff,
        terminationAppointmentDate: moment().format("YYYY-MM-DD"),
        submitProfileStatus: "7",
      })
    );
    handleCloseDialog();
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
        submitProfileStatus: "8",
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
        reasonForRefuseEndProfile: content,
        submitProfileStatus: "9",
      })
    );
    handleCloseDialog();
  };
  const EndingAction = (props) => {
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
  const Action = (props) => {
    const { item, handleShowDialog } = props;
    return (
      <div className="none_wrap">
        <>
          {STAFF_STATUS?.VIEW_PENDING.includes(item.submitProfileStatus) && (
            <IconButton size="small" onClick={() => handleShowDialog(item)}>
              <Icon fontSize="small" color="primary">
                edit
              </Icon>
            </IconButton>
          )}
          {STAFF_STATUS?.END_PROFILE_PROCESS.includes(item.submitProfileStatus) && (
            <>
              <IconButton
                size="small"
                onClick={() => {
                  handleShowDocumentDialog(item);
                }}
              >
                <VisibilityIcon fontSize="small"></VisibilityIcon>
              </IconButton>
              <IconButton size="small" onClick={() => handleShowEditorDialog(item)}>
                <Icon fontSize="small" color="primary">
                  edit
                </Icon>
              </IconButton>
            </>
          )}
        </>
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
      maxWidth: "150px",
      minWidth: "150px",
      render: (props) => (
        <span>{t(`staff.submit_profile_status.${SUBMIT_PROFILE_STATUS[props.submitProfileStatus]}`)}</span>
      ),
    }
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
        {showEditorDialog && (
          <PendingApprovalDialog isPendingRegister={true} t={t} handleCloseDialog={handleCloseDialog} />
        )}
        {shouldOpenDocumentDialog && (
          <PendingApprovalDialog t={t} handleCloseDialog={handleCloseDialog} isPendingEndProfile={true} />
        )}
        {showEditorEndingDialog && (
          <EndProfileFormDialog handleCloseDialog={handleCloseDialog} t={t} Action={EndingAction} />
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
export default PendingApproval;
