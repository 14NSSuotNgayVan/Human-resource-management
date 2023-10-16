import React, { memo, useEffect, useRef, useState } from "react";
import { SelectValidator, TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import StaffInformation from "./StaffInfomation";
import Certificates from "./Certificate";
import Family from "./Family";
import { ADD_STAFF_TABS } from "app/constants/staffConstant";
import { useDispatch, useSelector } from "react-redux";
import { addStaffAction, setStaffImage } from "app/redux/actions/StaffActions";
import { toast } from "react-toastify";
import { staffSelector } from "app/redux/selectors/StaffSelector";
import { getAllCertificates } from "app/redux/actions/CertificateActions";
import { getShouldUpdateCertificate } from "app/redux/selectors/CertificateSelector";
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
} = require("@material-ui/core");
const { default: Draggable } = require("react-draggable");

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
const AddStaffDialog = (props) => {
  const { handleClose, t } = props;
  const staff = useSelector(staffSelector);
  const dispatch = useDispatch();
  const [tab, setTab] = useState(ADD_STAFF_TABS.INFORMATION.value);
  const [informationSaved, setInformationSaved] = useState(false);
  const shouldUpdateCertificate = useSelector(getShouldUpdateCertificate);
  const informationFormRef = useRef(null);
  const handleSubmit = () => {
    informationFormRef.current.submit();
    
  };
  useEffect(()=>{
    if(staff?.id){
      if(shouldUpdateCertificate) dispatch(getAllCertificates(staff?.id));
    }
  },[shouldUpdateCertificate]);
  useEffect(()=>{
    if(staff?.id){
      dispatch(getAllCertificates(staff?.id));
    }
  },[]);

  useEffect(() => {
    dispatch(setStaffImage(staff?.image));
    if (staff) setInformationSaved(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staff]);

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
        <span className="headerStyle">{staff ? t("staff.action.updateStaff") : t("staff.action.addStaff")}</span>
        <IconButton className="buttonClose" onClick={() => handleClose()}>
          <Icon color="error" title={t("close")}>
            close
          </Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers spacing={1}>
        <Tabs
          value={tab}
          onChange={(event, newValue) => {
            if (!informationSaved && newValue !== ADD_STAFF_TABS.INFORMATION.value) {
              toast.error(t("staff.notify.enterInformation"));
            } else setTab(newValue);
          }}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
        >
          <Tab label={t(`staff.${ADD_STAFF_TABS.INFORMATION.name}`)} value={ADD_STAFF_TABS.INFORMATION.value} />
          <Tab label={t(`staff.${ADD_STAFF_TABS.CERTIFICATES.name}`)} value={ADD_STAFF_TABS.CERTIFICATES.value} />
          <Tab label={t(`staff.${ADD_STAFF_TABS.RELATIONSHIP.name}`)} value={ADD_STAFF_TABS.RELATIONSHIP.value} />
        </Tabs>
        {tab === ADD_STAFF_TABS.INFORMATION.value && (
          <StaffInformation item={staff} t={t} formRef={informationFormRef} />
        )}
        {tab === ADD_STAFF_TABS.CERTIFICATES.value && <Certificates staffId={staff?.id} t={t} />}
        {tab === ADD_STAFF_TABS.RELATIONSHIP.value && <Family staffId={staff?.id} t={t} />}
      </DialogContent>
      <DialogActions spacing={4} className="flex flex-center flex-middle">
        <Button variant="contained" color="secondary" onClick={() => props.handleClose()}>
          {t("general.cancel")}
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {t("general.save")}
        </Button>
        {informationSaved && (
          <Button variant="contained" color="primary" onClick={() => {}}>
            {t("general.register")}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
export default memo(AddStaffDialog);
