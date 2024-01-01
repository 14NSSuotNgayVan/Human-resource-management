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

function PromotionDialog({ t, handleCloseDialog, processData,action }) {
  const staff = useSelector(staffSelector);

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
      <DialogContent dividers className="wrapper-a4">
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
              <b> Số {staff?.id}/ QĐ - BN</b>
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <div className="flex-center">
              <Typography fontWeight="bold" className="text-overflow">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM{' '}
              </Typography>
            </div>
            <div className="flex-center">
              <Typography fontWeight="bold" className="text-overflow">
                Độc lập - Tự do - Hạnh phúc
              </Typography>
            </div>
            <div className="flex-center">
              <Typography className="text-overflow line-height-25" fontStyle="italic">
                Hà Nội, Ngày {moment(new Date(processData?.promotionDay)).format("DD/MM/YYYY").split("/")[0]} tháng {moment(new Date(processData?.promotionDay)).format("DD/MM/YYYY").split("/")[1]} năm {moment(new Date(processData?.promotionDay)).format("DD/MM/YYYY").split("/")[2]}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Typography className="flex-center mt-32" fontWeight="bold">
          QUYẾT ĐỊNH
        </Typography>
        <Typography className="flex-center pb-12" fontStyle="italic">
          V/v thăng chức
        </Typography>
        <div className="fex-center">
          <Typography fontWeight="bold" className="text-overflow">
            HỘI ĐỒNG THÀNH VIÊN CÔNG TY OCEANTECH
          </Typography>
        </div>
        <Typography>- Căn cứ Luật Doanh nghiệp 2020 và các văn bản hướng dẫn thi hành;</Typography>
        <Typography>- Căn cứ Điều lệ Công ty OCEANTECH</Typography>
        <Typography>- Căn cứ yêu cầu hoạt động sản xuất kinh doanh;</Typography>
        <Typography>
          - Xét năng lực, phẩm chất và trình độ của Ông/Bà <b>{staff?.name}</b>
        </Typography>
        <Typography className="flex-center line-height-25" fontWeight="bold">
          QUYẾT ĐỊNH
        </Typography>
        <Typography>
          <b>Điều 1:</b> Bổ nhiệm chức danh <b>{STAFF_POSITION.find((item)=>item?.id === processData?.newPosition)?.name}</b> đối với:
        </Typography>
        <Typography>
          - Ông/Bà: <b>{staff?.name}</b>. Giới tính: {staff?.gender === 0 ? 'Nữ' : 'Nam'}
        </Typography>
        <Typography>
          - Sinh ngày: {moment(new Date(staff?.dateOfBirth)).format("DD/MM/YYYY")}. Dân tộc: {staff?.religion}. Tôn giáo: {staff?.ethnic}
        </Typography>
        <Typography>
          - Số chứng minh nhân dân/Thẻ căn cước công dân: {staff?.citizenIdentificationNumber}. Nơi cấp:{' '}
          {staff?.placeOfIssueCard} Ngày cấp: {moment(new Date(staff?.dateOfIssuanceCard)).format("DD/MM/YYYY")}
        </Typography>
        <Typography>- Nơi đăng ký hộ khẩu thường trú: {staff?.address}</Typography>
        <Typography>- Nơi ở hiện tại: {staff?.address}</Typography>
        <Typography>
          <b>Điều 2: </b>Quyền và nghĩa vụ
        </Typography>
        <Typography>- Thực hiện quyền và nghĩa vụ của cấp bậc được bổ nhiệm theo quy định của công ty</Typography>
        <Typography>
          <b>Điều 3: </b>Hiệu lực thi hành
        </Typography>
        <Typography>
          - Ông/Bà có tên tại Điều 1 và các cơ quan, tổ chức, cá nhân liên quan chịu trách nhiệm thi hành quyết định
          này.
        </Typography>
        <Typography>Quyết định có hiệu lực kể từ ngày ký.</Typography>
        <Box className="flex-between mt-32">
          <Box>
            <Typography fontWeight="bold" fontStyle="italic">
              Nơi Nhận:
            </Typography>
            <Typography>Ông/Bà: {<b>{staff?.leaderName}</b>} </Typography>
            <Typography>Cơ quan, tổ chức, cá nhân liên quan</Typography>
            <Typography>Lưu HS,VP</Typography>
          </Box>
          <Box>
            <Typography fontWeight="bold" className="flex-center">
              TM. HỘI ĐỒNG THÀNH VIÊN
            </Typography>
            <Typography fontWeight="bold" className="flex-center">
              Chủ tịch Hội đồng thành viên
            </Typography>
            <Typography fontStyle="italic" className="flex-center">
              (Ký tên, đóng dấu)
            </Typography>
            {processData?.processStatus === '3' && (
              <div className="mt-32">
              <span className="sign-text ">{staff?.leaderName}</span>
            </div>
            )}
          </Box>
        </Box>
      </Box>
    </Box>


      </DialogContent>
      <DialogActions className="flex flex-center px-16">
        {action?? action}
        <Button variant="contained" className="color-error" onClick={handleCloseDialog}>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PromotionDialog;
