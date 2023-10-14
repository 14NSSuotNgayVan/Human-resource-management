import { GENDER } from "app/constants/staffConstant";
import React from "react";
import { SelectValidator, TextValidator, ValidatorForm } from "react-material-ui-form-validator";
<<<<<<< Updated upstream
const { Dialog, Paper, IconButton, Icon, DialogTitle, DialogContent, Grid, DialogActions, Button, FormControl, MenuItem } = require("@material-ui/core");
=======
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
>>>>>>> Stashed changes
const { default: Draggable } = require("react-draggable");

const AddStaffDialog = (props) => {
<<<<<<< Updated upstream
  const { staff, handleClose, t } = props;
=======
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

>>>>>>> Stashed changes
  return (
    <Dialog
      open={true}
      PaperComponent={(props) => (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
          <Paper {...props} />
        </Draggable>
      )}
      maxWidth={"md"}
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
<<<<<<< Updated upstream
      <ValidatorForm className={"validatorForm"}>
        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextValidator
                className={"w-100 mb-16"}
                label={
                  <span className="inputLabel">
                    <span style={{ color: "red" }}> * </span>
                    {t("staff.name")}
                  </span>
                }
                type="text"
                name="name"
                value={staff?.name || ""}
                validators={["required"]}
                errorMessages={[t("general.errorMessages_required")]}
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
                    {t("staff.code")}
                  </span>
                }
                type="text"
                name="code"
                value={staff?.code || ""}
                validators={["required", "matchRegexp:^nv\\d{5}$", "minStringLength:6", "maxStringLength:10"]}
                errorMessages={[
                  t("general.errorMessages_required"),
                  t("general.invalidCodeFormat"),
                  t("general.minLength_required"),
                  t("general.maxLength_required"),
                ]}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControl fullWidth={true} variant="outlined" className="" size="small">
                <SelectValidator
                  variant="outlined"
                  size="small"
                  label={
                    <span className="inputLabel">
                      <span style={{ color: "red" }}> * </span>
                      {t("staff.gender_display")}
                    </span>
                  }
                  value={staff?.provinceId || ""}
                  onChange={(provinceId) =>{}}
                  validators={["required"]}
                  errorMessages={[t("general.errorMessages_required")]}
                  inputProps={{
                    name: "provinces",
                    id: "provinces",
                  }}
                  className="w-100 mb-16"
                >
                  {GENDER?.map((item) => {
                    return (
                      <MenuItem key={item?.id} value={item?.id}>
                        {t(`staff.gender.${item?.name}`)}
                      </MenuItem>
                    );
                  })}
                </SelectValidator>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions spacing={4} className="flex flex-center flex-middle">
          <Button variant="contained" color="secondary" onClick={() => props.handleClose()}>
            {t("general.cancel")}
=======
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
>>>>>>> Stashed changes
          </Button>
          <Button variant="contained" color="primary" type="submit">
            {t("general.save")}
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
};
export default AddStaffDialog;
