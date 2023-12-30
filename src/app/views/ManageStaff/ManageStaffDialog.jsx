import React, { memo, useEffect, useRef, useState } from "react";
import { ADD_STAFF_TABS, GENDER, MANAGE_STAFF_TABS } from "app/constants/staffConstant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { staffSelector } from "app/redux/selectors/StaffSelector";
import SalaryIncrement from "./Tabs/SalaryIncrement";
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
const AddStaffDialog = (props) => {
  const { handleClose, t, handleShowDocumentDialog } = props;
  const staff = useSelector(staffSelector);
  const dispatch = useDispatch();
  const [tab, setTab] = useState(ADD_STAFF_TABS.INFORMATION.value);
  const handleSubmit = () => {};
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
        <span className="headerStyle">{t("manageStaff.manageHappen")}</span>
        <IconButton className="buttonClose" onClick={() => handleClose()}>
          <Icon color="error" title={t("close")}>
            close
          </Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers spacing={1}>
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
                    label="Mã nhân viên"
                    value={staff?.code}
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
                    label="Giới tính"
                    value={t(`staff.gender.${GENDER.find((item) => item.id === staff?.gender).name}`)}
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
                label={t(`manageStaff.${MANAGE_STAFF_TABS.PROPOSAL.name}`)}
                value={MANAGE_STAFF_TABS.PROPOSAL.value}
              />
            </Tabs>
          </Grid>
          <Grid item xs={12} lg={12} md={12} sm={12}>
            {tab === MANAGE_STAFF_TABS.SALARY_INCREMENT.value &&
            <SalaryIncrement item={staff} t={t}/>
            }
              </Grid>
        </Grid>
      </DialogContent>
      <DialogActions spacing={4} className="flex flex-center flex-middle">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleShowDocumentDialog(staff, true);
          }}
        >
          {t("manageStaff.showDocuments")}
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {t("manageStaff.endProfile")}
        </Button>
        <Button variant="contained" className="color-error" onClick={handleClose}>
          {t("general.cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default memo(AddStaffDialog);
