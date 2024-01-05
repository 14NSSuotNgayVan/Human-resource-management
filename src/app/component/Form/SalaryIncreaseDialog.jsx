import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Icon from '@material-ui/core/Icon';
import { Box, Dialog, DialogActions, Grid } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Button from '@material-ui/core/Button';
import '../../../styles/components/_form.scss';
import moment from 'moment';
import { staffSelector } from 'app/redux/selectors/StaffSelector';
import { useSelector } from 'react-redux';
import { LEADER } from 'app/constants/staffConstant';
import { getSalaries, getSalariesItem } from 'app/redux/selectors/SalarySelector';

function SalaryIncreaseDialog({ t, handleCloseDialog,Action }) {
  const staff = useSelector(staffSelector);
  const dataSalaryIncrease = useSelector(getSalariesItem);
  const salaryList = useSelector(getSalaries);

  return (
    <Dialog open={true}  fullWidth maxWidth="md">
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Đề xuất tăng lương
      </DialogTitle>
      <IconButton className="buttonClose" onClick={handleCloseDialog}>
            <Icon color="error" title={t("close")}>
              close
            </Icon>
          </IconButton>
      <DialogContent dividers className="wrapper-a4 mh-70">
      <Box className="A4">
      <Box className="A4-content">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div className="flex-center">
              <Typography fontWeight="bold" className="text-overflow">
                CÔNG TY OCEANTECH
              </Typography>
            </div>
            <Typography className="flex-center">
              <b> Số {staff?.id}/ QĐ - TL</b>
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <div className="flex-center">
              <Typography fontWeight="bold" className="text-overflow">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM{' '}
              </Typography>
            </div>
            <div className="flex-center">
              <Typography fontWeight="bold" className="text-overflow heading-underline">
                Độc lập - Tự do - Hạnh phúc
              </Typography>
            </div>
            <div className="flex-center">
              <Typography className="text-overflow line-height-25" fontStyle="italic">
                Hà Nội, Ngày {moment(new Date(dataSalaryIncrease?.startDate)).format("DD/MM/YYYY").split("/")[0]} tháng {moment(new Date(dataSalaryIncrease?.startDate)).format("DD/MM/YYYY").split("/")[1]} năm {moment(new Date(dataSalaryIncrease?.startDate)).format("DD/MM/YYYY").split("/")[2]}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Typography className="flex-center mt-32" fontWeight="bold">
          QUYẾT ĐỊNH
        </Typography>
        <Typography className="flex-center pb-12" fontStyle="italic">
          V/v tăng lương cho người lao động
        </Typography>
        <Typography>- Căn cứ vào Điều lệ, nội quy, quy chế của Công ty OCEANTECH</Typography>
        <Typography>
          - Căn cứ vào hợp đồng số <b>{staff?.code}</b> được ký giữa Công ty OCEANTECH và Ông/Bà{' '}
          <b>{staff?.name}</b> ngày {moment(new Date(staff?.submitDay)).format("DD/MM/YYYY").split("/")[0]} tháng {moment(new Date(staff?.submitDay)).format("DD/MM/YYYY").split("/")[1]} năm{' '}
          {moment(new Date(staff?.submitDay)).format("DD/MM/YYYY").split("/")[2]}
        </Typography>
        <Typography className="pb-12">
          - Căn cứ vào sự đóng góp thực tế của Ông/Bà: <b>{staff?.name}</b> đổi với sự phát triển của Công ty
          OCEANTECH
        </Typography>
        <div className="flex-center">
          <Typography className="text-overflow" fontWeight="bold">
            GIÁM ĐỐC CÔNG TY OCEANTECH
          </Typography>
        </div>
        <Typography  className="flex-center line-height-25" fontWeight="bold">
          QUYẾT ĐỊNH
        </Typography>
        <Typography>
          <b>- Điều 1:</b> Tăng lương cho Ông/Bà: <b>{staff?.name}</b> đang làm việc tại{' '}
          công ty kể từ ngày {moment(new Date(dataSalaryIncrease?.startDate)).format("DD/MM/YYYY").split("/")[0]} tháng{' '}
          {moment(new Date(dataSalaryIncrease?.startDate)).format("DD/MM/YYYY").split("/")[1]} năm {moment(new Date(dataSalaryIncrease?.startDate)).format("DD/MM/YYYY").split("/")[2]}, cụ thể như sau:
        </Typography>
        <Typography>
          Mức lương hiện tại: <b>{dataSalaryIncrease?.oldSalary?.toLocaleString('en-US')} VND</b>
        </Typography>
        <Typography>
          Mức lương sau điều chỉnh: <b>{dataSalaryIncrease?.newSalary?.toLocaleString('en-US')} VND</b>
        </Typography>
        <Typography>
          <b>- Điều 2: </b>Các Ông/Bà Phòng nhân sự, Phòng tài chính kế toán và Ông/Bà:{' '}
          <b>{LEADER?.find(item=>item?.id===dataSalaryIncrease?.leaderId)?.leaderName}</b> căn cứ thi hành quyết định này.
        </Typography>
        <Box className="flex-between mt-32">
          <Box className='px-32'>
            <Typography fontWeight="bold" fontStyle="italic">
              Nơi Nhận:
            </Typography>
            <Typography>Như điều 2</Typography>
            <Typography>Lưu HS,VP</Typography>
          </Box>
          <Box className='px-32'>
            <Typography fontWeight="bold" className="flex-center">
              GIÁM ĐỐC
            </Typography>
            <Typography fontStyle="italic" className="flex-center">
              (Ký tên, đóng dấu)
            </Typography>
            {dataSalaryIncrease?.salaryIncreaseStatus === 3 && (
              <div className="mt-32 flex-center">
                <span className="sign-text ">{staff?.leaderName}</span>
              </div>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
      </DialogContent>
      <DialogActions className="flex flex-center px-16">
        {Action? <Action isPending ={salaryList.some((item) => item.salaryIncreaseStatus === 2)}/> :""}
        <Button variant="contained" className="color-error" onClick={handleCloseDialog}>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SalaryIncreaseDialog;
