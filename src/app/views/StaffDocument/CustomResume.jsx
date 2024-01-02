import React from "react";
import "../../../../src/styles/views/_resume.scss";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { useSelector } from "react-redux";
import { imageSelector } from "app/redux/selectors/StaffSelector";
import moment from "moment";
import { GENDER, RELATIONSHIP } from "app/constants/staffConstant";
import MaterialTable from "material-table";
import { getAllFamilyMember } from "app/redux/selectors/FamilySelector";

const Resume = (props) => {
  const { t, item } = props;

  return (
    <>
      <div className="resume-wrapper">
        <Grid container spacing={2} justify="space-between">
          <Grid item md={4}>
            <div className="resume-image">
              <img alt="avatar" src={item?.image || "/assets/images/avatar.jpg"} />
            </div>
          </Grid>
          <Grid item md={8}>
            <h3 className="resume-sub-heading">Cộng hòa xã hội chủ nghĩa việt nam</h3>
            <h4 className="resume-sub-heading heading-underline">Độc lập - Tự do - Hạnh phúc</h4>
            <h3 className="resume-heading">Sơ yếu lí lịch</h3>
            <h4 className="resume-sub-heading">Tự thuật</h4>
          </Grid>
        </Grid>
        <div className="resume-body">
          <div className="resume-information">
            <h4 className="information-heading">I.Thông tin bản thân</h4>
            <div className="information-details">
              <Grid container spacing={2}>
                <Grid item md={8} lg={8} sm={8} className="flex">
                  <span className="detail-tittle">1. Họ và tên nhân viên:</span>
                  <span className="detail-content underline-dashed">{item?.name}</span>
                </Grid>
                <Grid item md={4} lg={4} sm={4} className="flex">
                  <span className="detail-tittle">2. Giới tính:</span>
                  <span className="detail-content underline-dashed">
                    {t(`staff.gender.${GENDER[item?.gender]?.name}`)}
                  </span>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item md={12} lg={12} sm={12} className="flex">
                  <span className="detail-tittle">3. Ngày sinh:</span>
                  <span className="detail-content underline-dashed">
                    {moment(new Date(item?.dateOfBirth)).format("DD/MM/YYYY")}
                  </span>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item md={12} lg={12} sm={12} className="flex">
                  <span className="detail-tittle">4. Hộ khẩu thường trú:</span>
                  <span className="detail-content underline-dashed">{item?.address}</span>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item md={12} lg={12} sm={12} className="flex">
                  <span className="detail-tittle">5. Điện thoại liên lạc: :</span>
                  <span className="detail-content underline-dashed">{item?.phone}</span>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item md={6} lg={6} sm={6} className="flex">
                  <span className="detail-tittle">6. Dân tộc:</span>
                  <span className="detail-content underline-dashed">{item?.ethnic}</span>
                </Grid>
                <Grid item md={6} lg={6} sm={6} className="flex">
                  <span className="detail-tittle">7. Tôn giáo:</span>
                  <span className="detail-content underline-dashed">{item?.religion}</span>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item md={6} lg={6} sm={6} className="flex">
                  <span className="detail-tittle">8. Căn cước công dân:</span>
                  <span className="detail-content underline-dashed">{item?.citizenIdentificationNumber}</span>
                </Grid>
                <Grid item md={6} lg={6} sm={6} className="flex">
                  <span className="detail-tittle">9. Ngày cấp:</span>
                  <span className="detail-content underline-dashed">
                    {moment(new Date(item?.dateOfIssuanceCard)).format("DD/MM/YYYY")}
                  </span>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item md={12} lg={12} sm={12} className="flex">
                  <span className="detail-tittle">10. Nơi cấp :</span>
                  <span className="detail-content underline-dashed">{item?.placeOfIssueCard}</span>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className="resume-family">
            <h4 className="family-heading">II. Thông tin gia đình</h4>
            <div className="family-detail-table">
              <TableContainer>
                <Table border="1">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" width="6%" className="table-head">
                        STT
                      </TableCell>
                      <TableCell align="center" width="20%" className="table-head">
                        {t("staff.family.name")}
                      </TableCell>
                      <TableCell align="center" width="12%" className="table-head">
                        {t("staff.family.dateOfBirth")}
                      </TableCell>
                      <TableCell align="center" width="12%" className="table-head">
                        {t("staff.family.relationShip")}
                      </TableCell>
                      <TableCell align="center" width="14%" className="table-head">
                        {t("staff.family.phoneNumber")}
                      </TableCell>
                      <TableCell align="center" width="16%" className="table-head">
                        {t("CCCD")}
                      </TableCell>
                      <TableCell align="center" width="20%" className="table-head">
                        {t("staff.family.address")}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {item?.employeeFamilyDtos?.length > 0 ? (
                      item?.employeeFamilyDtos?.map((family, index) => (
                        <TableRow key={family.id}>
                          <TableCell align="center" className="table-cell">
                            <span>{index + 1}</span>
                          </TableCell>
                          <TableCell align="left" className="table-cell">
                            <span>{family.name}</span>
                          </TableCell>
                          <TableCell align="center" className="table-cell">
                            <span>{moment(new Date(family?.dateOfBirth)).format("DD/MM/YYYY")}</span>
                          </TableCell>
                          <TableCell align="center" className="table-cell">
                            <span>{RELATIONSHIP[family?.relationShip]?.name}</span>
                          </TableCell>
                          <TableCell align="center" className="table-cell">
                            <span>{family.phoneNumber}</span>
                          </TableCell>
                          <TableCell align="center" className="table-cell">
                            <span>{family.citizenIdentificationNumber}</span>
                          </TableCell>
                          <TableCell align="left" className="table-cell">
                            <span>{family.address}</span>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className="table-cell"></TableCell>
                        <TableCell className="table-cell"></TableCell>
                        <TableCell className="table-cell"></TableCell>
                        <TableCell className="table-cell"></TableCell>
                        <TableCell className="table-cell"></TableCell>
                        <TableCell className="table-cell"></TableCell>
                        <TableCell className="table-cell"></TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div className="resume-reassurance">
            <h4 className="reassurance-heading">III. LỜI CAM ĐOAN</h4>
            <p>
              Tôi xin cam đoan bản khai sơ yếu lý lịch trên là đúng sự thật, nếu có điều gì không đúng tôi xin chịu
              trách nhiệm trước pháp luật về lời khai của mình.
            </p>
          </div>
        </div>
        <div className="resume-footer">
          <div className="footer-container">
            <div className="resume-date">
              <span className="reassurance-place">Hà Nội</span>,
              <span className="reassurance-day">
                <span className="date-tittle">ngày</span>
                <span className="date-content underline-dashed">
                  {moment(new Date(item?.submitDay)).format("DD/MM/YYYY").split("/")[0]}
                </span>
              </span>
              <span className="reassurance-month">
                <span className="date-tittle">tháng</span>
                <span className="date-content underline-dashed">
                  {moment(new Date(item?.submitDay)).format("DD/MM/YYYY").split("/")[1]}
                </span>
              </span>
              <span className="reassurance-year">
                <span className="date-tittle">năm</span>
                <span className="date-content underline-dashed">
                  {moment(new Date(item?.submitDay)).format("DD/MM/YYYY").split("/")[2]}
                </span>
              </span>
            </div>
            <h4 className="footer-label">Người khai</h4>
            <span className="footer-sub-label">(kí và ghi rõ họ tên)</span>
            <div className="footer-signature">{item?.name}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Resume;
