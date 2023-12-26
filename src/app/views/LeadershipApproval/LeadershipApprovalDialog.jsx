import React, { useCallback, useState } from "react";
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
import { LEADERSHIP_APPROVAL_TABS } from "app/constants/staffConstant";
import CustomCV from "app/component/CustomCV";
import Resume from "app/component/CustomResume";
import { useSelector } from "react-redux";
import { staffSelector } from "app/redux/selectors/StaffSelector";
import CustomCertificate from "app/component/CustomCertificate";
import { isMdScreen } from 'utils';
const LeadershipApprovalDialog = (props) => {
  const { t, handleCloseDialog } = props;
  const staff = useSelector(staffSelector);

  const [tab, setTab] = useState(LEADERSHIP_APPROVAL_TABS.DOCUMENTS.value);
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
              label={t(`staff.${LEADERSHIP_APPROVAL_TABS.DOCUMENTS.name}`)}
              value={LEADERSHIP_APPROVAL_TABS.DOCUMENTS.value}
            />
            <Tab
              label={t(`staff.${LEADERSHIP_APPROVAL_TABS.RESUME.name}`)}
              value={LEADERSHIP_APPROVAL_TABS.RESUME.value}
            />
            <Tab
              label={t(`staff.${LEADERSHIP_APPROVAL_TABS.CERTIFICATES.name}`)}
              value={LEADERSHIP_APPROVAL_TABS.CERTIFICATES.value}
            />
          </Tabs>
        </Grid>
        <Grid item lg={10} md={10} sm={12} className="tabs-content">
          <DialogContent dividers spacing={1}>
            {tab === LEADERSHIP_APPROVAL_TABS.DOCUMENTS.value && <CustomCV t={t} item={staff} />}
            {tab === LEADERSHIP_APPROVAL_TABS.RESUME.value && <Resume t={t} item={staff} />}
            {tab === LEADERSHIP_APPROVAL_TABS.CERTIFICATES.value && <CustomCertificate t={t} item={staff} />}
          </DialogContent>
        </Grid>
      </Grid>

      <DialogActions spacing={4} className="flex flex-center flex-middle">
        <Button variant="contained" color="primary" onClick={() => {}}>
          {t("general.approve")}
        </Button>
        <Button variant="contained" color="primary" onClick={() => {}}>
          {t("general.additionalRequest")}
        </Button>
        <Button variant="contained" color="primary" onClick={() => {}}>
          {t("general.reject")}
        </Button>
        <Button variant="contained" color="secondary" onClick={handleCloseDialog}>
          {t("general.cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default LeadershipApprovalDialog;
