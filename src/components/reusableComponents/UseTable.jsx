import React, { useState } from "react";
import {
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";

function UseTable(records, headCells, value) {
  const pages = [5, 10, 15];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const TblContainer = (props) => (
    <Table
      sx={{
        marginTop: 3,
        "& thead th": {
          fontWeight: "600",
          backgroundColor: "#1976D2",
        },
        "& tbody td": {
          fontWeight: "300",
        },
        "& tbody tr:hover": {
          backgroundColor: "#f1f8fc",
          cursor: "pointer",
        },
      }}
    >
      {props.children}
    </Table>
  );
  const TblHead = (props) => {
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";
      console.log(isAsc);
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };
    return (
      <TableHead>
        <TableRow>
          {headCells.map((el, i) => {
            return (
              <TableCell
                key={el.id}
                sortDirection={orderBy === el.id ? order : false}
              >
                {el.disableSorting ? (
                  el.label
                ) : (
                  <TableSortLabel
                    active={orderBy === el.id}
                    direction={orderBy === el.id ? order : "asc"}
                    onClick={() => {
                      handleSortRequest(el.id);
                    }}
                  >
                    {el.label}
                  </TableSortLabel>
                )}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    ></TablePagination>
  );
  // Pagination function
  const stableSort = (array, comparator) => {
    const stablizedThis = array.map((el, i) => [el, i]);
    stablizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stablizedThis.map((el) => el[0]);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const recordsAfterPagingAndSorting = () => {
    return stableSort(value.fn(records), getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };
  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  };
}

export default UseTable;
