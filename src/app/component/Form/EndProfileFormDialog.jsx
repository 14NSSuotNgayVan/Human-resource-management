import React, { useRef, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Icon from "@material-ui/core/Icon";
import { Box, Dialog, DialogActions, Grid, Input } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import Button from "@material-ui/core/Button";
import "../../../styles/components/_form.scss";
import { staffSelector } from "app/redux/selectors/StaffSelector";
import { useSelector } from "react-redux";
import { STAFF_POSITION } from "app/constants/staffConstant";
import moment from "moment";
import { ValidatorForm } from "react-material-ui-form-validator";
import EndProfileDialog from "app/views/ManageStaff/EndProfileDialog";
import { toast } from "react-toastify";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
function EndProfileFormDialog({ t, handleCloseDialog, isRegister, handleCloseParentDialog, Action }) {
  const staff = useSelector(staffSelector);
  const form = useRef(null);
  const [formData, setFormData] = useState({ ...staff });
  const [shouldOpenSendLeader, setShouldOpenSendLeader] = useState(false);
  const handleChange = (event,field) => {
    event.persist();
    const { value, innerHTML } = event.target;
    switch (field) {
      case "reasonForEnding": {
        setFormData({
          ...formData,
          [field]: innerHTML,
        });
        break;
      }
      default: {
        setFormData({
          ...formData,
          [field]: value,
        });
        break;
      }
    }
  };

  const handleSubmit = () => {
    if(!formData?.endDay || !formData?.reasonForEnding){
      toast.error("vui lòng điền đầy đủ thông tin trước khi trình");
    }else setShouldOpenSendLeader(true);
  };
  return (
    <Dialog open={true} fullWidth maxWidth="md">
      <ValidatorForm onSubmit={handleSubmit} ref={form}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Đơn xin nghỉ việc
        </DialogTitle>
        <IconButton className="buttonClose" onClick={handleCloseDialog}>
          <Icon color="error" title={t("close")}>
            close
          </Icon>
        </IconButton>
        <DialogContent dividers className="wrapper-a4 mh-70">
          <Box className="A4">
            <Box className="A4-content text-justify">
              <Typography fontWeight="bold" className="flex-center">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
              </Typography>
              <Typography fontWeight="bold" className="flex-center heading-underline">
                Độc lập - Tự do - Hạnh phúc
              </Typography>
              <Typography fontWeight="bold" className="flex-center mt-32">
                ĐƠN XIN NGHỈ VIỆC
              </Typography>
              <Typography className="mt-32">
                Kính gửi: Ban Giám đốc công ty <b>OCEANTECH</b>
              </Typography>
              <Typography className="pb-12">
                Tên tôi là: <b>{formData?.name}</b>
              </Typography>
              <Typography>
                Hiện tại đang là{" "}
                {STAFF_POSITION?.find((position) => position?.id === (formData?.currentPosition ?? 1))?.name} tại công
                ty OCEANTECH<b></b>
              </Typography>
              <Typography className="pb-12">
                Tôi làm đơn này, đề nghị Ban Gián đốc cho tôi xin nghỉ việc từ ngày{" "}
                {
                  moment(new Date(formData?.endDay ? formData?.endDay : formData?.endDay))
                    .format("DD/MM/YYYY")
                    .split("/")[0]
                }{" "}
                tháng{" "}
                {
                  moment(new Date(formData?.endDay ? formData?.endDay : formData?.endDay))
                    .format("DD/MM/YYYY")
                    .split("/")[1]
                }{" "}
                năm{" "}
                {
                  moment(new Date(formData?.endDay ? formData?.endDay : formData?.endDay))
                    .format("DD/MM/YYYY")
                    .split("/")[2]
                }
                {isRegister && (
                  <>
                    <Input
                      id="icon-button-date"
                      className="mr-4 ml-4"
                      type="date"
                      inputProps={{
                        min: moment().format("YYYY-MM-DD"),
                        width: "50",
                      }}
                      name="endDay"
                      value={formData?.endDay || ""}
                      onChange={(e)=>handleChange(e,"endDay")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    vì lý do
                    <p
                      name="reasonForEnding"
                      contentEditable
                      dangerouslySetInnerHTML={{ __html: formData?.reasonForEnding || "" }}
                      onInput={(e)=>handleChange(e,"reasonForEnding")}
                      style={{
                        display: "inline-block",
                        borderBottom: "1px solid #000000",
                        padding: " 0 10px 0 6px",
                      }}
                    />
                  </>
                )}
              </Typography>
              <Typography className="pb-12">
                Trong thời gian chờ đợi sự chấp thuận của Ban Giám đốc Công ty, tôi sẽ tiếp tục làm việc nghiêm túc và
                tiến hành bàn giao công việc cũng như tài sản cho người quản lý trực tiếp của tôi là ông/bà{" "}
                <b>{formData?.leaderName}</b>
              </Typography>
              <Typography>Tôi xin chân thành cảm ơn!</Typography>
              <Grid container>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <Typography className="flex-center">
                    Hà Nội, Ngày{" "}
                    {
                      moment(new Date(formData?.endDay ? formData?.endDay : formData?.endDay))
                        .format("DD/MM/YYYY")
                        .split("/")[0]
                    }{" "}
                    tháng{" "}
                    {
                      moment(new Date(formData?.endDay ? formData?.endDay : formData?.endDay))
                        .format("DD/MM/YYYY")
                        .split("/")[1]
                    }{" "}
                    năm{" "}
                    {
                      moment(new Date(formData?.endDay ? formData?.endDay : formData?.endDay))
                        .format("DD/MM/YYYY")
                        .split("/")[2]
                    }
                  </Typography>
                  <Typography fontWeight="bold" className="flex-center">
                    Người làm đơn
                  </Typography>
                  <Typography fontStyle="italic" className="flex-center">
                    (Ký, ghi rõ họ tên)
                  </Typography>
                  <div className="mt-32 flex-center">
                    <span className="sign-text ">{formData?.name ? formData?.name : ""}</span>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="flex flex-center px-16">
          {shouldOpenSendLeader && (
            <EndProfileDialog
              t={t}
              item={formData}
              handleCloseDialog={() => {
                setShouldOpenSendLeader(false);
              }}
              handleCloseParentDialog={handleCloseParentDialog}
            />
          )}
          {isRegister && (
            <Button variant="contained" color="primary" type="submit">
              {t("general.save")}
            </Button>
          )}
          {Action ? <Action /> : ""}
          <Button variant="contained" className="color-error" onClick={handleCloseDialog}>
            Hủy
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}

export default EndProfileFormDialog;
