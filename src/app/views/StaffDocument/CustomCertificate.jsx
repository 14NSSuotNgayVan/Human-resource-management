import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import moment from "moment";
import React from "react";
const CustomCertificate = (props) => {
  const { item, t } = props;
  return (
    <>
      <div className="certificate-wrapper">
        <h2 className="certificate-heading">Văn bằng</h2>
        <div className="certificate-detail-table">
          <TableContainer>
            <Table border="1">
              <TableHead>
                <TableRow>
                  <TableCell align="center" width="6%" className="table-head">
                    STT
                  </TableCell>
                  <TableCell align="center" width="20%" className="table-head">
                    {t("staff.certificate.certificateName")}
                  </TableCell>
                  <TableCell align="center" width="12%" className="table-head">
                    {t("staff.certificate.issueDate")}
                  </TableCell>
                  <TableCell align="center" width="12%" className="table-head">
                    {t("staff.certificate.field")}
                  </TableCell>
                  <TableCell align="center" width="14%" className="table-head">
                    {t("staff.certificate.content")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {item?.certificatesDto?.length > 0 ? (
                  item?.certificatesDto?.map((certificate, index) => (
                    <TableRow key={certificate.id}>
                      <TableCell align="center" className="table-cell">
                        <span>{index + 1}</span>
                      </TableCell>
                      <TableCell align="left" className="table-cell">
                        <span>{certificate.certificateName}</span>
                      </TableCell>
                      <TableCell align="center" className="table-cell">
                        <span>{moment(new Date(certificate?.issueDate)).format("DD/MM/YYYY")}</span>
                      </TableCell>
                      <TableCell align="center" className="table-cell">
                        <span>{certificate?.field}</span>
                      </TableCell>
                      <TableCell align="center" className="table-cell">
                        <span>{certificate?.content}</span>
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
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};
export default CustomCertificate;
