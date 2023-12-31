import React, { useEffect, useRef, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, IconButton } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import moment from "moment";
import CustomTable from "app/component/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { getCertificatesByEmployeeId, getShouldUpdateCertificate } from "app/redux/selectors/CertificateSelector";
import {
  createCertificates,
  deleteCertificate,
  getAllCertificates,
  updateCertificate,
} from "app/redux/actions/CertificateActions";
import { ConfirmationDialog } from "egret";
import { NAME_REGEX } from "app/constants/staffConstant";

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
const Certificates = (props) => {
  const { t, staffId } = props;
  const dispatch = useDispatch();
  const certificateList = useSelector(getCertificatesByEmployeeId);
  const [certificatesByPage, setCertificatesByPage] = useState([]);
  const [totalElement, setTotalElement] = useState(0);
  const [pagePagination, setPagePagination] = useState({ page: 0, rowsPerPage: 10 });

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [certificate, setCertificate] = useState({});
  const form = useRef(null);
  const updatePageData = () => {
    const certificates = [...certificateList];
    const startOfPage = pagePagination.page * pagePagination.rowsPerPage;
    const endOfPage = (pagePagination.page + 1) * pagePagination.rowsPerPage;
    const pageData = certificates.slice(startOfPage, endOfPage);
    setCertificatesByPage(pageData);
    setTotalElement(certificates.length);
  };
  useEffect(() => {
    updatePageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePagination]);
  useEffect(() => {
    form.current.resetValidations();
  }, [isEditing]);
  const handleSubmit = () => {
    if (certificate?.id) {
      dispatch(updateCertificate(certificate));
    } else dispatch(createCertificates(staffId, certificate));
    handleClose();
  };
  const handleClose = () => {
    setCertificate(null);
    setShowConfirmationDialog(false);
    setIsEditing(false);
  };
  const onChange = (event, field) => {
    setCertificate({ ...certificate, [field]: event.target.value });
  };
  const handleShowDeleteConfirm = (id) => {
    setIsEditing(false);
    setShowConfirmationDialog(true);
    setCertificate({ id: id });
  };
  const handleConfirmDelete = () => {
    dispatch(deleteCertificate(certificate.id));
    setShowConfirmationDialog(false);
  };
  const handleUpdate = (item) => {
    setIsEditing(true);
    setCertificate({ ...item });
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
      render: (rowData) => rowData.tableData.id +1+pagePagination.page*pagePagination.rowsPerPage,
    },
    {
      title: t("staff.certificate.certificateName"),
      field: "certificateName",
      align: "left",
      minWidth: "150px",
    },
    {
      title: t("staff.certificate.issueDate"),
      field: "issueDate",
      align: "center",
      minWidth: "120px",
      render: (props) => <span>{moment(new Date(props?.issueDate)).format("DD/MM/YYYY")}</span>,
    },
    {
      title: t("staff.certificate.field"),
      field: "field",
      align: "left",
      minWidth: "150px",
      maxWidth: "250px",
    },
    { title: t("staff.certificate.content"), field: "content", align: "left", minWidth: "170px" },

  ];
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <ValidatorForm onSubmit={handleSubmit} ref={form}>
          <Grid container spacing={2} className="p-12">
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextValidator
                className={"w-100 mb-16"}
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.certificate.certificateName")}
                  </span>
                }
                disabled={!isEditing}
                type="text"
                name="certificateName"
                value={certificate?.certificateName || ""}
                onChange={(e) => onChange(e, "certificateName")}
                validators={["required",`matchRegexp:${NAME_REGEX}`]}
                errorMessages={[t("staff.notify.errorMessages_required"),t("staff.notify.invalidName")]}
                
                size="small"
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="w-100 mb-16"
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.certificate.issueDate")}
                  </span>
                }
                onChange={(e) => onChange(e, "issueDate")}
                disabled={!isEditing}
                type="date"
                name="issueDate"
                value={certificate?.issueDate ? moment(certificate?.issueDate).format("YYYY-MM-DD") : ""}
                inputProps={{
                  max:moment().format("YYYY-MM-DD"),
                }}
                InputLabelProps={{
                  shrink: true,
                }}    
                validators={["required"]}
                errorMessages={[t("staff.notify.errorMessages_required")]}
                
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextValidator
                className={"w-100 mb-16"}
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.certificate.field")}
                  </span>
                }
                disabled={!isEditing}
                type="text"
                name="field"
                onChange={(e) => onChange(e, "field")}
                value={certificate?.field || ""}
                validators={["required",`matchRegexp:${NAME_REGEX}`]}
                errorMessages={[t("staff.notify.errorMessages_required"),t("staff.notify.invalidField")]}
                
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextValidator
                className={"w-100 mb-16"}
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.certificate.content")}
                  </span>
                }
                disabled={!isEditing}
                type="text"
                name="content"
                onChange={(e) => onChange(e, "content")}
                value={certificate?.content || ""}
                validators={["required","maxStringLength:250"]}
                errorMessages={[t("staff.notify.errorMessages_required"),t("staff.notify.invalidStringContent")]}
                
                size="small"
              />
            </Grid>
          </Grid>
          <Grid container justify="flex-end" className="mb-16">
            {!isEditing && (
              <Button
                className="align-bottom mr-8 mb-4"
                variant="contained"
                color="primary"
                onClick={() => {
                  setIsEditing(true);
                  setCertificate({});
                }}
              >
                {t("general.add")}
              </Button>
            )}
            {isEditing && (
              <Button className="align-bottom mr-8 mb-4" variant="contained" color="primary" type="submit">
                {t("general.save")}
              </Button>
            )}
            {isEditing && (
              <Button className="align-bottom mr-8 mb-4 color-error" variant="contained"  onClick={handleClose}>
                {t("general.cancel")}
              </Button>
            )}
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
          data={certificatesByPage}
          columns={columns}
          totalElements={totalElement}
          pagePagination={pagePagination}
          setPagination={setPagePagination}
        />
      </Grid>
    </Grid>
  );
};
export default Certificates;
