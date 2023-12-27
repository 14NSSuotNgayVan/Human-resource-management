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
import Draggable from "react-draggable";
import { DOCUMENT_TABS } from "app/constants/staffConstant";
import CustomCV from "app/component/CustomCV";
import Resume from "app/component/CustomResume";
import { useDispatch, useSelector } from "react-redux";
import { staffSelector } from "app/redux/selectors/StaffSelector";
import CustomCertificate from "app/component/CustomCertificate";
import { isMdScreen } from 'utils';
import { getAllCertificates } from "app/redux/actions/CertificateActions";
import { getAllFamilyMembers } from "app/redux/actions/FamilyAction";
import ApprovalDialog from "../ApprovalDialog";
import AdditionalDialog from "../AdditionalDialog";
const PendingApprovalDialog = (props) => {
  const { t, handleCloseDialog } = props;
  const [tab, setTab] = useState(DOCUMENT_TABS.DOCUMENTS.value);
  const [shouldOpenApprovalDialog,setShouldOpenApprovalDialog] = useState(false);
  const [shouldOpenAdditionalDialog,setShouldOpenAdditionalDialog] = useState(false);
  const staff = useSelector(staffSelector);
  const dispatch = useDispatch(); 
  useEffect(()=>{
    if(staff?.id){
      dispatch(getAllCertificates(staff?.id));
      dispatch(getAllFamilyMembers(staff?.id));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleOpenAdditionalDialog=()=>{
    setShouldOpenAdditionalDialog(true);
  }
  const handleCloseAdditionalDialog=()=>{
    setShouldOpenAdditionalDialog(false);
  }
  const handleOpenApprovalConfirmDialog=()=>{
    setShouldOpenApprovalDialog(true);
  }
  const handleCloseApprovalConfirmDialog=()=>{
    setShouldOpenApprovalDialog(false);
  }
  return (
    <Dialog
      open={true}
      PaperComponent={(props) => (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
          <Paper {...props} />
        </Draggable>
      )}
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
            orientation= {isMdScreen() ? "horizontal":"vertical"} 
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            centered
            className=""
          >
            <Tab
              label={t(`staff.${DOCUMENT_TABS.DOCUMENTS.name}`)}
              value={DOCUMENT_TABS.DOCUMENTS.value}
            />
            <Tab
              label={t(`staff.${DOCUMENT_TABS.RESUME.name}`)}
              value={DOCUMENT_TABS.RESUME.value}
            />
            <Tab
              label={t(`staff.${DOCUMENT_TABS.CERTIFICATES.name}`)}
              value={DOCUMENT_TABS.CERTIFICATES.value}
            />
          </Tabs>
        </Grid>
        <Grid item lg={10} md={10} sm={12} className="tabs-content">
          <DialogContent dividers spacing={1}>
            {tab === DOCUMENT_TABS.DOCUMENTS.value && <CustomCV t={t} item={staff} />}
            {tab === DOCUMENT_TABS.RESUME.value && <Resume t={t} item={staff} />}
            {tab === DOCUMENT_TABS.CERTIFICATES.value && <CustomCertificate t={t} item={staff} />}
          </DialogContent>
        </Grid>
      </Grid>
      {shouldOpenApprovalDialog && (<ApprovalDialog t={t} handleCloseDialog={handleCloseApprovalConfirmDialog} item ={staff}/>)}
      {shouldOpenAdditionalDialog && (<AdditionalDialog t={t} handleCloseDialog={handleCloseAdditionalDialog} item ={staff}/>)}
      <DialogActions spacing={4} className="flex flex-center flex-middle">
        <Button variant="contained" color="primary" onClick={() => {handleOpenApprovalConfirmDialog()}}>
          {t("general.approve")}
        </Button>
        <Button variant="contained" color="primary" onClick={() => {handleOpenAdditionalDialog()}}>
          {t("general.additionalRequest")}
        </Button>
        <Button variant="contained" color="secondary" onClick={() => {}}>
          {t("general.reject")}
        </Button>
        <Button variant="contained" className="color-error" onClick={handleCloseDialog}>
          {t("general.cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default PendingApprovalDialog;
