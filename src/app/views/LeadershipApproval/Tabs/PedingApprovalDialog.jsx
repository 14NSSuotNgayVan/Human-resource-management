import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
  Paper,
  Tab,
  Tabs,
} from "@material-ui/core";
import { DOCUMENT_TABS } from "app/constants/staffConstant";
import { useDispatch, useSelector } from "react-redux";
import { shouldUpdateSelector, staffSelector } from "app/redux/selectors/StaffSelector";
import { isMdScreen } from "utils";
import ApprovalDialog from "../ApprovalDialog";
import AdditionalDialog from "../AdditionalDialog";
import RejectionDialog from "../RejectionDialog";
import { ValidatorForm } from "react-material-ui-form-validator";
import CustomCV from "app/views/StaffDocument/CustomCV";
import Resume from "app/views/StaffDocument/CustomResume";
import CustomCertificate from "app/views/StaffDocument/CustomCertificate";
import { getAllExperiences } from "app/redux/actions/ExperienceAction";
import { updateStaffAction } from "app/redux/actions/StaffActions";
const PendingApprovalDialog = (props) => {
  const { t, handleCloseDialog,isPendingRegister,isRegister} = props;
  const [tab, setTab] = useState(DOCUMENT_TABS.DOCUMENTS.value);
  const [shouldOpenApprovalDialog, setShouldOpenApprovalDialog] = useState(false);
  const [shouldOpenAdditionalDialog, setShouldOpenAdditionalDialog] = useState(false);
  const [shouldOpenRejectionDialog, setShouldOpenRejectionDialog] = useState(false);
  const staff = useSelector(staffSelector);
  const [formData,setFormData] =useState({});
  const shouldUpdateStaff = useSelector(shouldUpdateSelector);
  const dispatch = useDispatch();
  useEffect(()=>{
    setFormData(staff);
    dispatch(getAllExperiences(staff?.id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[staff]); 
  useEffect(()=>{
    if(shouldUpdateStaff) {
    setShouldOpenRejectionDialog(false);
    setShouldOpenAdditionalDialog(false);
    setShouldOpenApprovalDialog(false);
    }
  },[shouldUpdateStaff])
  const handleOpenRejectionDialog = () => {
    setShouldOpenRejectionDialog(true);
  };
  const handleCloseRejectionDialog = useCallback(() => {
    setShouldOpenRejectionDialog(false);
  }, []);
  const handleOpenAdditionalDialog = () => {
    setShouldOpenAdditionalDialog(true);
  };
  const handleCloseAdditionalDialog = useCallback(() => {
    setShouldOpenAdditionalDialog(false);
  }, []);
  const handleOpenApprovalConfirmDialog = () => {
    setShouldOpenApprovalDialog(true);
  };
  const handleCloseApprovalConfirmDialog = useCallback(() => {
    setShouldOpenApprovalDialog(false);
  }, []);
  const handleUpdateStaff =()=>{
    dispatch(updateStaffAction(formData));
  }
  return (
    <Dialog
      open={true}
      maxWidth={"lg"}
      fullWidth={true}
    >
      <DialogTitle className={"draggableDialogTitle"} id="draggable-dialog-title">
        <span className="headerStyle">{t("staff.action.staffDocument")}</span>
        <IconButton className="buttonClose" onClick={handleCloseDialog}>
          <Icon color="error" title={t("close")}>
            close
          </Icon>
        </IconButton>
      </DialogTitle>
      <Grid container>
        <Grid item lg={2} md={2} sm={12} className="tabs-left">
          <Tabs
            value={tab}
            onChange={(event, newValue) => {
              setTab(newValue);
            }}
            orientation={isMdScreen() ? "horizontal" : "vertical"}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            centered
            className=""
          >
            <Tab label={t(`staff.${DOCUMENT_TABS.DOCUMENTS.name}`)} value={DOCUMENT_TABS.DOCUMENTS.value} />
            <Tab label={t(`staff.${DOCUMENT_TABS.RESUME.name}`)} value={DOCUMENT_TABS.RESUME.value} />
            <Tab label={t(`staff.${DOCUMENT_TABS.CERTIFICATES.name}`)} value={DOCUMENT_TABS.CERTIFICATES.value} />
          </Tabs>
        </Grid>
        <Grid item lg={10} md={10} sm={12} className="tabs-content">
          <DialogContent dividers spacing={1}>
            {tab === DOCUMENT_TABS.DOCUMENTS.value && <CustomCV t={t} setFormData={setFormData} formData={formData}/>}
            {tab === DOCUMENT_TABS.RESUME.value && <Resume t={t} item={formData} />}
            {tab === DOCUMENT_TABS.CERTIFICATES.value && <CustomCertificate t={t} item={formData} />}
          </DialogContent>
        </Grid>
      </Grid>
      {shouldOpenApprovalDialog && (
        <ApprovalDialog t={t} handleCloseDialog={handleCloseApprovalConfirmDialog} item={staff} />
      )}
      {shouldOpenAdditionalDialog && (
        <AdditionalDialog t={t} handleCloseDialog={handleCloseAdditionalDialog} item={staff} />
      )}
      {shouldOpenRejectionDialog && (
        <RejectionDialog t={t} handleCloseDialog={handleCloseRejectionDialog} item={staff} />
      )}
      <DialogActions spacing={4} className="flex flex-center flex-middle">
        
        {isRegister && <Button
          variant="contained"
          color="primary"
          onClick={() => {
            
          }}
        >
          {t("general.sendLeader")}
        </Button>}
        {isRegister && <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleUpdateStaff()
          }}
        >
          {t("general.save")}
        </Button>}
        {isPendingRegister && <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleOpenApprovalConfirmDialog();
          }}
        >
          {t("general.approve")}
        </Button>}
        {isPendingRegister && <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleOpenAdditionalDialog();
          }}
        >
          {t("general.additionalRequest")}
        </Button>}
        {isPendingRegister&& <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            handleOpenRejectionDialog();
          }}
        >
          {t("general.reject")}
        </Button>}
        <Button variant="contained" className="color-error" onClick={handleCloseDialog}>
          {t("general.cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default PendingApprovalDialog;
