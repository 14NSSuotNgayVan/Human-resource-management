import React, { useState } from "react";
import { getStaffByIdAction, setItem } from "app/redux/actions/StaffActions.js";
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
import AdditionalDialog from "../AdditionalDialog";
import RejectionDialog from "../RejectionDialog";
import { getProcess, getShouldUpdateProcess } from "app/redux/selectors/ProcessSelector";
import { getAllProcessByLeader, updateProcess } from "app/redux/actions/ProcessAction";
import { STAFF_POSITION } from "app/constants/staffConstant";
import PromotionDialog from "app/component/Form/PromotionDialog";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function PendingPromotion({ t }) {
  const dispatch = useDispatch();
  const promotionList = useSelector(getProcess);
  const shouldUpdate = useSelector(getShouldUpdateProcess);
  const [promotionByPage, setPromotionByPage] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [totalElement, setTotalElement] = useState(0);
  const [pagePagination, setPagePagination] = useState({ page: 0, rowsPerPage: 10 });
  const [showEditorDialog, setShowEditorDialog] = useState(false);
  const [showAdditionalDialog, setShowAdditionalDialog] = useState(false);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [shouldOpenDocumentDialog, setShouldOpenDocumentDialog] = useState(false);
  const [promotion, setPromotion] = useState({
    promotionDay: new Date(),
    note: "",
    newPosition: 0,
    leaderId: 0,
  });

  const updatePageData = () => {
    const promotions = [...promotionList];
    const startOfPage = pagePagination.page * pagePagination.rowsPerPage;
    const endOfPage = (pagePagination.page + 1) * pagePagination.rowsPerPage;
    const pageData = searchObjectsByKeyword(keyword, promotions).slice(startOfPage, endOfPage);
    setPromotionByPage(pageData);
    setTotalElement(promotions.length);
  };

  useEffect(() => {
    dispatch(getAllProcessByLeader());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    updatePageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePagination, promotionList,keyword]);
  useEffect(() => {
    if (shouldUpdate) {
      dispatch(getAllProcessByLeader());
      updatePageData();
      setShowEditorDialog(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUpdate]);
  const handleShowEditorDialog = (item) => {
    dispatch(getStaffByIdAction(item?.employeeId));
    setPromotion({ ...item });
    setShowEditorDialog(true);
  };
  const handleCloseDialog = () => {
    dispatch(setItem({}));
    setPromotion({});
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
        updateProcess({
        ...promotion,
        acceptanceDate: moment().format("YYYY-MM-DD"),
        processStatus: 3,
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
        updateProcess({
        ...promotion,
        additionalRequest: content,
        processStatus: 4,
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
        updateProcess({
        ...promotion,
        rejectionDate: rejectionDate,
        reasonForRefusal: content,
        processStatus: 5,
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
      align: "center",
      minWidth: "150px",
      maxWidth: "250px",
      render: (props) => <span>{STAFF_POSITION.find(item=>item?.id === props?.currentPosition).name}</span>,
    },
    {
      title: t("staff.promotion.newPosition"),
      field: "newPosition",
      align: "center",
      minWidth: "150px",
      maxWidth: "250px",
      render: (props) => <span>{STAFF_POSITION.find(item=>item?.id === props?.newPosition).name}</span>,
    },
    {
      title: t("staff.promotion.note"),
      field: "note",
      align: "left",
      minWidth: "170px",
      render: (props) => <p className="custom-table-cell">{props?.note}</p>,
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
        {shouldOpenDocumentDialog && <PendingApprovalDialog t={t} handleCloseDialog={handleCloseDialog} />}
        {showEditorDialog && (
          <PromotionDialog
            handleCloseDialog={handleCloseDialog}
            processData={promotion}
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
          data={promotionByPage}
          columns={columns}
          totalElements={totalElement}
          pagePagination={pagePagination}
          setPagination={setPagePagination}
        />
      </Grid>
    </Grid>
  );
}
export default PendingPromotion;
