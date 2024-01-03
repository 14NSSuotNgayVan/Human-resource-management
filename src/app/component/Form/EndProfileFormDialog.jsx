import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Icon from '@material-ui/core/Icon';
import { Box, Dialog, DialogActions, Grid } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Button from '@material-ui/core/Button';
import '../../../styles/components/_form.scss';
import { staffSelector } from 'app/redux/selectors/StaffSelector';
import { useSelector } from 'react-redux';
import { STAFF_POSITION } from 'app/constants/staffConstant';
import moment from 'moment';

function EndProfileFormDialog({ t, handleCloseDialog,Action,item }) {
  const staff = useSelector(staffSelector);
  return (
    <Dialog open={true}  fullWidth maxWidth="md">
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Đơn xin nghỉ việc
      </DialogTitle>
      <IconButton className="buttonClose" onClick={handleCloseDialog}>
            <Icon color="error" title={t("close")}>
              close
            </Icon>
          </IconButton>
      <DialogContent dividers className="wrapper-a4">
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
        <Typography className="mt-32">Kính gửi: Ban Giám đốc công ty <b>OCEANTECH</b></Typography>
        <Typography className="pb-12">
          Tên tôi là: <b>{item ? item?.name:staff?.name}</b>
        </Typography>
        <Typography>
          Hiện tại đang là {STAFF_POSITION.find((position)=>position?.id === (item ? item?.currentPosition:staff?.currentPosition ?? 1) )?.name} tại công ty OCEANTECH<b></b>
        </Typography>
        <Typography className="pb-12">
          Tôi làm đơn này, đề nghị Ban Gián đốc cho tôi xin nghỉ việc từ ngày {moment(new Date(item ? item?.endDay:staff?.endDay)).format("DD/MM/YYYY").split('/')[0]} tháng {moment(new Date(item ? item?.endDay:staff?.endDay)).format("DD/MM/YYYY").split('/')[1]} năm {moment(new Date(item ? item?.endDay:staff?.endDay)).format("DD/MM/YYYY").split('/')[2]} vì lý do: {item ? item?.reasonForEnding:staff?.reasonForEnding}
        </Typography>
        <Typography className="pb-12">
          Trong thời gian chờ đợi sự chấp thuận của Ban Giám đốc Công ty, tôi sẽ tiếp tục làm việc nghiêm túc và tiến
          hành bàn giao công việc cũng như tài sản cho người quản lý trực tiếp của tôi là ông/bà{' '}
          <b>{item ? item?.leaderName:staff?.leaderName}</b>
        </Typography>
        <Typography>Tôi xin chân thành cảm ơn!</Typography>
        <Grid container>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Typography className="flex-center">
              Hà Nội, Ngày {moment(new Date(item ? item?.endDay:staff?.endDay)).format("DD/MM/YYYY").split('/')[0]} tháng {moment(new Date(item ? item?.endDay:staff?.endDay)).format("DD/MM/YYYY").split('/')[1]} năm {moment(new Date(item ? item?.endDay:staff?.endDay)).format("DD/MM/YYYY").split('/')[2]}
            </Typography>
            <Typography fontWeight="bold" className="flex-center">
              Người làm đơn
            </Typography>
            <Typography fontStyle="italic" className="flex-center">
              (Ký, ghi rõ họ tên)
            </Typography>
            <div className="mt-32 flex-center">
                <span className="sign-text ">{item ? item?.leaderName:staff?.leaderName}</span>
              </div>
          </Grid>
        </Grid>
      </Box>
    </Box>
      </DialogContent>
      <DialogActions className="flex flex-center px-16">
        {Action?<Action/>:""}
        <Button variant="contained" className="color-error" onClick={handleCloseDialog}>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EndProfileFormDialog;
