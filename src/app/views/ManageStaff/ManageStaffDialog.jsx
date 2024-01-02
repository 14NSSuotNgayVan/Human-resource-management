import React, { memo, useEffect, useState } from "react";
import { ADD_STAFF_TABS, GENDER, MANAGE_STAFF_TABS } from "app/constants/staffConstant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { staffSelector } from "app/redux/selectors/StaffSelector";
import SalaryIncrement from "./Tabs/SalaryIncrement";
import Promotion from "./Tabs/Promotion";
import EndProfileDialog from "./EndProfileDialog";
import { getAllSalaries } from "app/redux/actions/SalaryAction";
import { getShouldUpdateSalary } from "app/redux/selectors/SalarySelector";
import { getShouldUpdateProcess } from "app/redux/selectors/ProcessSelector";
import { getAllProcess } from "app/redux/actions/ProcessAction";
import moment from "moment";
const {
  Dialog,
  Paper,
  IconButton,
  Icon,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Grid,
  Box,
  TextField,
} = require("@material-ui/core");
const { default: Draggable } = require("react-draggable");

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
const ManageStaffDialog = (props) => {
  const { handleClose, t, handleShowDocumentDialog, isPendingEndProfile } = props;
  const staff = useSelector(staffSelector);
  const shouldUpdateSalary = useSelector(getShouldUpdateSalary);
  const shouldUpdateProcess = useSelector(getShouldUpdateProcess);
  const [tab, setTab] = useState(ADD_STAFF_TABS.INFORMATION.value);
  const [showEndProfileDialog, setShowEndProfileDialog] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    setShowEndProfileDialog(true);
  };

  const handleCloseEndProfileDialog = () => {
    setShowEndProfileDialog(false);
  };
  useEffect(() => {
    if (staff?.id) {
      if (shouldUpdateSalary) dispatch(getAllSalaries(staff?.id));
      if (shouldUpdateProcess) dispatch(getAllProcess(staff?.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUpdateSalary, shouldUpdateProcess]);
  useEffect(() => {
    if (staff?.id) {
      dispatch(getAllSalaries(staff?.id));
      dispatch(getAllProcess(staff?.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        <span className="headerStyle">{t(`manageStaff.${isPendingEndProfile ? "history" : "manageHappen"}`)}</span>
        <IconButton className="buttonClose" onClick={() => handleClose()}>
          <Icon color="error" title={t("close")}>
            close
          </Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers spacing={2}>
        <Grid container>
          <Grid item xs={12} lg={12} md={12} sm={12}>
            <Grid container spacing={2} className="pb-16">
              <Grid item xs={3} className="flex flex-center">
                <Grid item className="staff-avatar max-width-height">
                  <img alt="avatar" src={staff?.image || "/assets/images/avatar.jpg"} />
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Box className="flex-grow-1 flex-column">
                  <TextField
                    id="standard-basic"
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Họ Tên"
                    value={staff?.name}
                    variant="standard"
                    className="my-8"
                  />
                  <TextField
                    id="standard-basic"
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Giới tính"
                    value={t(`staff.gender.${GENDER.find((item) => item.id === staff?.gender).name}`)}
                    variant="standard"
                    className="my-8"
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box className="flex-grow-1 flex-column">
                  <TextField
                    id="standard-basic"
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Mã nhân viên"
                    value={staff?.code}
                    variant="standard"
                    className="my-8"
                  />
                  <TextField
                    id="standard-basic"
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Số điện thoại"
                    value={staff?.phone}
                    variant="standard"
                    className="my-8"
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box className="flex-grow-1 flex-column">
                  <TextField
                    type="date"
                    id="standard-basic"
                    InputProps={{
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Ngày sinh"
                    value={moment(staff?.dateOfBirth).format("YYYY-MM-DD")}
                    variant="standard"
                    className="my-8"
                  />

                  <TextField
                    id="standard-basic"
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Email"
                    value={staff?.email}
                    variant="standard"
                    className="my-8"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={12} md={12} sm={12}>
            <Tabs
              value={tab}
              onChange={(event, newValue) => {
                setTab(newValue);
              }}
              indicatorColor="primary"
              textColor="primary"
              className=""
            >
              <Tab
                label={t(`manageStaff.${MANAGE_STAFF_TABS.SALARY_INCREMENT.name}`)}
                value={MANAGE_STAFF_TABS.SALARY_INCREMENT.value}
              />
              <Tab
                label={t(`manageStaff.${MANAGE_STAFF_TABS.PROMOTION.name}`)}
                value={MANAGE_STAFF_TABS.PROMOTION.value}
              />
            </Tabs>
          </Grid>
          <Grid item xs={12} lg={12} md={12} sm={12}>
            <div className="p-12">
              {tab === MANAGE_STAFF_TABS.SALARY_INCREMENT.value && (
                <SalaryIncrement item={staff} t={t} isPendingEndProfile={isPendingEndProfile} />
              )}
              {tab === MANAGE_STAFF_TABS.PROMOTION.value && (
                <Promotion item={staff} t={t} isPendingEndProfile={isPendingEndProfile} />
              )}
            </div>
          </Grid>
        </Grid>
        {showEndProfileDialog && (
          <EndProfileDialog
            t={t}
            handleCloseParentDialog={handleClose}
            item={staff}
            handleCloseDialog={handleCloseEndProfileDialog}
          />
        )}
      </DialogContent>
      <DialogActions spacing={4} className="flex flex-center flex-middle">
        {!isPendingEndProfile && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleShowDocumentDialog(staff, false);
              }}
            >
              {t("manageStaff.showDocuments")}
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {t("manageStaff.endProfile")}
            </Button>
          </>
        )}
        <Button variant="contained" className="color-error" onClick={handleClose}>
          {t("general.cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default memo(ManageStaffDialog);
