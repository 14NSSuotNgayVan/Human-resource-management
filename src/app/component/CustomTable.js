import { TablePagination } from '@material-ui/core';
import MaterialTable, { MTableToolbar } from 'material-table';
import React from 'react';
import { useTranslation } from 'react-i18next';
const CustomTable = (props) => {
    const { data, columns, totalElements, pagePagination, setPagination } = props;
    const { t } = useTranslation();
    console.log(data);
    return (
        <>
            <MaterialTable
                title={t("general.list")}
                data={data}
                columns={columns}
                localization={{
                    body: {
                        emptyDataSourceMessage: `${t("general.emptyDataMessageTable")}`,
                    },
                }}
                options={{
                    selection: false,
                    actionsColumnIndex: -1,
                    paging: false,
                    search: false,
                    rowStyle: (rowData) => ({
                        backgroundColor: rowData.tableData?.id % 2 === 1 ? "#EEE" : "#FFF",
                    }),
                    cellStyle: {
                        padding: "8px 12px",
                        border: "1px solid #e6e6e6",
                    },
                    maxBodyHeight: "550px",
                    minBodyHeight: "120px",
                    headerStyle: {
                        backgroundColor: "#7467ef",
                        color: "#fff",
                        border: "1px solid #e6e6e6",
                        textAlign: "center",
                    },
                    padding: "dense",
                    toolbar: false,
                    sorting: false,
                    draggable: false,
                }}
            />
            <TablePagination
                align="left"
                className="px-16 mt-8"
                rowsPerPageOptions={[1, 2, 3, 5, 10, 25]}
                component="div"
                labelRowsPerPage={t("general.rows_per_page")}
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} ${t("general.of")} ${count !== -1 ? count : `more than ${to}`}`
                }
                count={totalElements}
                rowsPerPage={pagePagination.rowsPerPage}
                page={pagePagination.page}
                backIconButtonProps={{
                    "aria-label": "Previous Page",
                }}
                nextIconButtonProps={{
                    "aria-label": "Next Page",
                }}
                onChangePage={(event, newPage) => {
                    setPagination({ ...pagePagination, page: newPage});
                }}
                onChangeRowsPerPage={(event => { setPagination({ ...pagePagination, rowsPerPage: event.target.value, page: 0 }) })}
            />
        </>
    );
}
export default CustomTable;