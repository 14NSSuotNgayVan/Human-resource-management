import React, { useEffect, useRef, useState } from "react";
import { Button, Grid, Icon, IconButton } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import moment from "moment";
import CustomTable from "app/component/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { getCertificatesByEmployeeId } from "app/redux/selectors/CertificateSelector";
import {
  createCertificates,
  deleteCertificate,
  updateCertificate,
} from "app/redux/actions/CertificateActions";
import { ConfirmationDialog } from "egret";
import { CERTIFICATE_REGEX, NAME_REGEX } from "app/constants/staffConstant";

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
  const handleSubmit = () => {
    if (certificate?.id) {
      dispatch(updateCertificate(certificate));
    } else dispatch(createCertificates(staffId, certificate));
    handleClose();
  };
  const handleClose = () => {
    setCertificate(null);
    setShowConfirmationDialog(false);
    form.current.resetValidations();
  };
  const onChange = (event, field) => {
    setCertificate({ ...certificate, [field]: event.target.value });
  };
  const handleShowDeleteConfirm = (id) => {
    setShowConfirmationDialog(true);
    setCertificate({ id: id });
  };
  const handleConfirmDelete = () => {
    dispatch(deleteCertificate(certificate.id));
    setShowConfirmationDialog(false);
  };
  const handleUpdate = (item) => {
    setCertificate({ ...item });
  };
  let columns = [
    {
      title: t("general.action"),
      field: "custom",
      align: "center",
      maxWidth: "100px",
      minWidth: "100px",
      render: (rowData) => (
        <Action item={rowData} handleShowDeleteConfirm={handleShowDeleteConfirm} handleUpdate={handleUpdate} />
      ),
    },
    {
      title: t("STT"),
      align: "center",
      maxWidth: "60px",
      minWidth: "60px",
      render: (rowData) => rowData.tableData.id +1+pagePagination.page*pagePagination.rowsPerPage,
    },
    {
      title: t("staff.certificate.certificateName"),
      field: "certificateName",
      align: "left",
      minWidth: "200px",
      render: (props) => <p className ="custom-table-cell">{props?.certificateName}</p>,
    },
    {
      title: t("staff.certificate.issueDate"),
      field: "issueDate",
      align: "center",
      maxWidth: "100px",
      minWidth: "100px",
      render: (props) => <span>{moment(new Date(props?.issueDate)).format("DD/MM/YYYY")}</span>,
    },
    {
      title: t("staff.certificate.field"),
      field: "field",
      align: "left",
      minWidth: "250px",
      maxWidth: "250px",
      render: (props) => <p className ="custom-table-cell">{props?.field}</p>,
    },
    { title: t("staff.certificate.content"), field: "content", align: "left", minWidth: "170px",render: (props) => <p className ="custom-table-cell">{props?.content}</p> },

  ];
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <ValidatorForm onSubmit={handleSubmit} ref={form}>
          <Grid container spacing={2} className="p-12">
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextValidator
                className={"w-100 mb-16"}
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.certificate.certificateName")}
                  </span>
                }
                type="text"
                name="certificateName"
                value={certificate?.certificateName || ""}
                onChange={(e) => onChange(e, "certificateName")}
                validators={["required",`matchRegexp:${CERTIFICATE_REGEX}`, "maxStringLength:255"]}
                errorMessages={[t("staff.notify.errorMessages_required"),t("staff.notify.invalidCertificateName"),`${t("staff.notify.invalidStringContent")}(225 kí tự)`]}
                size="small"
              />
            </Grid>
            <Grid item md={4} lg={4} sm={12} xs={12}>
              <TextValidator
                className="w-100 mb-16"
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.certificate.issueDate")}
                  </span>
                }
                format="dd/MM/yyyy"
                onChange={(e) => onChange(e, "issueDate")}
                type="date"
                name="issueDate"
                floatingLabelText={"dd/MM/yyyy"}
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
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <TextValidator
                className={"w-100 mb-16"}
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.certificate.field")}
                  </span>
                }
                type="text"
                name="field"
                onChange={(e) => onChange(e, "field")}
                value={certificate?.field || ""}
                validators={["required",`matchRegexp:${NAME_REGEX}`, "maxStringLength:255"]}
                errorMessages={[t("staff.notify.errorMessages_required"),t("staff.notify.invalidField"),`${t("staff.notify.invalidStringContent")}(225 kí tự)`]}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <TextValidator
                className={"w-100 mb-16"}
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.certificate.content")}
                  </span>
                }
                type="text"
                name="content"
                onChange={(e) => onChange(e, "content")}
                value={certificate?.content || ""}
                validators={["required","maxStringLength:255"]}
                errorMessages={[t("staff.notify.errorMessages_required"),`${t("staff.notify.invalidStringContent")}(255 kí tự)`,]}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
          <Grid container justify="flex-end" className="mb-16">
              <Button className="align-bottom mr-8 mb-4" variant="contained" color="primary" type="submit">
                {t("general.save")}
              </Button>
              <Button className="align-bottom mr-8 mb-4 color-error" variant="contained"  onClick={handleClose}>
                {t("general.cancel")}
              </Button>
          </Grid>
          </Grid>
          </Grid>
        </ValidatorForm>
      </Grid>
      {showConfirmationDialog && (
        <ConfirmationDialog
          title={t("general.confirm")}
          t={t}
          onConfirmDialogClose={handleClose}
          onYesClick={handleConfirmDelete}
          text={t("general.deleteConfirm")}
          Yes={t("general.Yes")}
          No={t("general.cancel")}
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
