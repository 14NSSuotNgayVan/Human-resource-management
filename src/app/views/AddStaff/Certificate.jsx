import React, { useRef, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, IconButton } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import moment from "moment";
import CustomTable from "app/component/CustomTable";
import ConfirmationDialog from "../material-kit/dialog/ConfirmationDialog";

const Action = (props) => {
  const {item, handleUpdate, handleDelete} = props.item;
  return (
    <div className="none_wrap">
      <IconButton size="small" onClick={handleUpdate(item)}>
        <Icon fontSize="small" color="primary">
          edit
        </Icon>
      </IconButton>
      <IconButton size="small" onClick={handleDelete(item.id)}>
        <Icon fontSize="small" color="error">
          delete
        </Icon>
      </IconButton>
    </div>
  );
};
const Certificates = (props) => {
  const { t, staff,setStaff } = props;
  const [certificate, setCertificate] = useState({});
  const [certificateList, setCertificateList] = useState([]);
  const [pagePagination, setPagePagination] = useState({ page: 0, rowsPerPage: 10 });
  const [totalElements, setTotalElements] = useState(0);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const form = useRef(null);
  const handleSubmit = () => {
    // form.
    handleClose();
  };
  const handleClose = () => {
    setShowConfirmationDialog(false);
    setIsEditing(false);
  };
  const onChange = (event, field) => {
    console.log(field, event.target.value);
    setCertificate({ ...certificate, [field]: event.target.value });
  };
  const handleDelete=()=>{

  }
  const handleUpdate=(item)=>{
    setIsEditing(true);
    setCertificate({...item});
  }
  let columns = [
    {
      title: t("general.action"),
      field: "custom",
      align: "center",
      minWidth: "80px",
      render: (rowData) => <Action item={rowData} handleDelete={handleDelete} handleUpdate={handleUpdate}/>,
    },
    {
      title: t("staff.certificate.certificateName"),
      field: "certificateName",
      align: "center",
      minWidth: "150px",
    },
    {
      title: t("staff.certificate.issueDate"),
      field: "issueDate",
      align: "center",
      minWidth: "120px",
      render: (props) => <span>{moment(new Date(props?.issueDate)).format("DD/MM/YYYY")}</span>,
    },
    { title: t("staff.certificate.content"), field: "content", align: "center", minWidth: "170px" },

    {
      title: t("staff.certificate.field"),
      field: "field",
      align: "left",
      minWidth: "150px",
      maxWidth: "150px",
    },
  ];
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container spacing={1} className="p-12">
            <Grid item xs={12} sm={12} md={6} lg={6}>
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
                validators={["required"]}
                onChange={(e) => onChange(e, "certificateName")}
                errorMessages={[t("staff.notify.errorMessages_required")]}
                variant="outlined"
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
                type="date"
                name="issueDate"
                value={certificate?.issueDate ? moment(certificate?.issueDate).format("YYYY-MM-DD") : ""}
                validators={["required"]}
                errorMessages={[t("staff.notify.errorMessages_required")]}
                variant="outlined"
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
                type="text"
                name="field"
                onChange={(e) => onChange(e, "field")}
                value={certificate?.field || ""}
                validators={["required"]}
                errorMessages={[t("staff.notify.errorMessages_required")]}
                variant="outlined"
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
                type="text"
                name="content"
                onChange={(e) => onChange(e, "content")}
                value={certificate?.content || ""}
                validators={["required"]}
                errorMessages={[t("staff.notify.errorMessages_required")]}
                variant="outlined"
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
              <Button
                className="align-bottom mr-8 mb-4"
                variant="contained"
                color="secondary"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
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
              // onYesClick={}
              text={t("general.deleteConfirm")}
              Yes={t("general.Yes")}
              No={t("general.No")}
            />
          )}
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <CustomTable
          data={certificateList}
          columns={columns}
          totalElements={totalElements}
          pagePagination={pagePagination}
          setPagination={setPagePagination}
        />
      </Grid>
    </Grid>
  );
};
export default Certificates;
