import React, { memo, useEffect, useRef, useState } from "react";
import StaffInformation from "./StaffInfomation";
import Certificates from "./Certificate";
import Family from "./Family";
import { ADD_STAFF_TABS } from "app/constants/staffConstant";
import { useDispatch, useSelector } from "react-redux";
import { setStaffImage } from "app/redux/actions/StaffActions";
import { toast } from "react-toastify";
import { staffSelector } from "app/redux/selectors/StaffSelector";
import { getAllCertificates } from "app/redux/actions/CertificateActions";
import { getShouldUpdateCertificate } from "app/redux/selectors/CertificateSelector";
import { getShouldUpdateFamily } from "app/redux/selectors/FamilySelector";
import { getAllFamilyMembers } from "app/redux/actions/FamilyAction";
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
  const { handleClose, t, handleShowDocumentDialog } = props;
  const staff = useSelector(staffSelector);
  const dispatch = useDispatch();
  const [tab, setTab] = useState(ADD_STAFF_TABS.INFORMATION.value);
  const [informationSaved, setInformationSaved] = useState(false);
  const shouldUpdateCertificate = useSelector(getShouldUpdateCertificate);
  const shouldUpdateFamily = useSelector(getShouldUpdateFamily);
  const informationFormRef = useRef(null);
  const handleSubmit = () => {
    if(tab === ADD_STAFF_TABS.INFORMATION.value){
      informationFormRef.current.submit();
    }else{
      handleClose();
    }
    
  };
  useEffect(()=>{
    if(staff?.id){
      if(shouldUpdateCertificate) dispatch(getAllCertificates(staff?.id));
      if(shouldUpdateFamily)  dispatch(getAllFamilyMembers(staff?.id));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[shouldUpdateCertificate,shouldUpdateFamily]);
  useEffect(()=>{
    if(staff?.id){
      dispatch(getAllCertificates(staff?.id));
      dispatch(getAllFamilyMembers(staff?.id));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          className =""
        >
          <Tab label={t(`staff.${ADD_STAFF_TABS.INFORMATION.name}`)} value={ADD_STAFF_TABS.INFORMATION.value} />
          <Tab label={t(`staff.${ADD_STAFF_TABS.CERTIFICATES.name}`)} value={ADD_STAFF_TABS.CERTIFICATES.value} />
          <Tab label={t(`staff.${ADD_STAFF_TABS.RELATIONSHIP.name}`)} value={ADD_STAFF_TABS.RELATIONSHIP.value} />
        </Tabs>
      </DialogTitle>

      <DialogContent dividers spacing={2}>
        {tab === ADD_STAFF_TABS.INFORMATION.value && (
          <StaffInformation item={staff} t={t} formRef={informationFormRef} handleCloseDialog ={handleClose}/>
        )}
        {tab === ADD_STAFF_TABS.CERTIFICATES.value && <Certificates staffId={staff?.id} t={t} />}
        {tab === ADD_STAFF_TABS.RELATIONSHIP.value && <Family staffId={staff?.id} t={t} />}
      </DialogContent>
      <DialogActions spacing={4} className="flex flex-center flex-middle">
        {informationSaved && (
          <Button variant="contained" color="primary" onClick={() => {handleShowDocumentDialog(staff,true)}}>
            {t("general.register")}
          </Button>
        )}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {t("general.save")}
        </Button>
        <Button variant="contained" className="color-error" onClick={handleClose}>
          {t("general.cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default memo(AddStaffDialog);
