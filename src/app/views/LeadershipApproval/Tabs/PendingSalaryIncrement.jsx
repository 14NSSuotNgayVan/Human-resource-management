import React, { useState } from "react";
import { setItem, getStaffByIdAction } from "app/redux/actions/StaffActions.js";
import { Grid, IconButton, Icon, Button, FormControl, Input, InputAdornment } from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import CustomTable from "app/component/CustomTable";
import PendingApprovalDialog from "./PedingApprovalDialog";
import { searchObjectsByKeyword } from "utils";
import { getSalaries, getShouldUpdateSalary } from "app/redux/selectors/SalarySelector";
import SalaryIncreaseDialog from "app/component/Form/SalaryIncreaseDialog";
import { getAllSalariesByLeader, updateSalary } from "app/redux/actions/SalaryAction";
import AdditionalDialog from "../AdditionalDialog";
import RejectionDialog from "../RejectionDialog";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function PendingSalaryIncrement({ t }) {
  const dispatch = useDispatch();
  const salaryList = useSelector(getSalaries);
  const shouldUpdate = useSelector(getShouldUpdateSalary);
  const [salariesByPage, setSalariesByPage] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [totalElement, setTotalElement] = useState(0);
  const [pagePagination, setPagePagination] = useState({ page: 0, rowsPerPage: 10 });
  const [showEditorDialog, setShowEditorDialog] = useState(false);
  const [showAdditionalDialog, setShowAdditionalDialog] = useState(false);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);

  const [shouldOpenDocumentDialog, setShouldOpenDocumentDialog] = useState(false);
  const [salary, setSalary] = useState({
    startDate: new Date(),
    reason: "",
    note: "",
    oldSalary: 0,
    newSalary: 0,
  });

  const updatePageData = () => {
    const salaries = [...salaryList];
    const startOfPage = pagePagination.page * pagePagination.rowsPerPage;
    const endOfPage = (pagePagination.page + 1) * pagePagination.rowsPerPage;
    const pageData = searchObjectsByKeyword(keyword, salaries).slice(startOfPage, endOfPage);
    setSalariesByPage(pageData);
    setTotalElement(salaries.length);
  };

  useEffect(() => {
    dispatch(getAllSalariesByLeader());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    updatePageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePagination, salaryList,keyword]);
  useEffect(() => {
    if (shouldUpdate) {
      dispatch(getAllSalariesByLeader());
      updatePageData();
      setShowEditorDialog(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUpdate]);
  const handleShowEditorDialog = (item) => {
    dispatch(getStaffByIdAction(item?.employeeId));
    setSalary({ ...item });
    setShowEditorDialog(true);
  };
  const handleCloseDialog = () => {
    dispatch(setItem({}));
    setSalary({});
    setShowEditorDialog(false);
    setShouldOpenDocumentDialog(false);
    setShowAdditionalDialog(false);
    setShowRejectionDialog(false);
  };
  const handleShowDocumentDialog = (item) => {
    dispatch(getStaffByIdAction(item?.employeeId));
    setShouldOpenDocumentDialog(true);
  };
  const handleSubmit = () => {
    dispatch(
      updateSalary({
        ...salary,
        acceptanceDate: moment().format("YYYY-MM-DD"),
        salaryIncreaseStatus: 3,
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
      updateSalary({
        ...salary,
        additionalRequest: content,
        salaryIncreaseStatus: 4,
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
      updateSalary({
        ...salary,
        rejectionDate: rejectionDate,
        reasonForRefusal: content,
        salaryIncreaseStatus: 5,
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
      maxWidth: "100px",
      minWidth: "100px",
      render: (rowData) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              handleShowDocumentDialog(rowData);
            }}
          >
            <VisibilityIcon fontSize="small"></VisibilityIcon>
          </IconButton>
          <IconButton size="small" onClick={() => handleShowEditorDialog(rowData)}>
            <Icon fontSize="small" color="primary">
              edit
            </Icon>
          </IconButton>
        </>
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
      title: t("staff.salary_increment.startDate"),
      field: "startDate",
      align: "center",
      maxWidth: "100px",
      minWidth: "100px",
      render: (props) => <span>{moment(new Date(props?.startDate)).format("DD/MM/YYYY")}</span>,
    },
    {
      title: t("staff.salary_increment.oldSalary"),
      field: "oldSalary",
      align: "right",
      maxWidth: "100px",
      minWidth: "100px",
      render: (props) => `${props?.oldSalary.toLocaleString("en-US")} VND`,
    },
    {
      title: t("staff.salary_increment.newSalary"),
      field: "newSalary",
      align: "right",
      maxWidth: "100px",
      minWidth: "100px",
      render: (props) => `${props?.newSalary.toLocaleString("en-US")} VND`,
    },
    {
      title: t("staff.salary_increment.reason"),
      field: "reason",
      align: "left",
      maxWidth: "250px",
      minWidth: "250px",
      render: (props) => <p className="custom-table-cell">{props?.reason}</p>,
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
        {shouldOpenDocumentDialog && <PendingApprovalDialog t={t} handleCloseDialog={handleCloseDialog} />}
        {showEditorDialog && (
          <SalaryIncreaseDialog
            handleCloseDialog={handleCloseDialog}
            dataSalaryIncrease={salary}
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
            tittle={"reasonForRefusal"}
          />
        )}
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
}
export default PendingSalaryIncrement;
