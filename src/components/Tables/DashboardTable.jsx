import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Icon } from '@iconify/react';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const columns = [
  { id: 'accountStatus', label: '', minWidth: 15, align: 'center' },
  { id: 'account', label: 'Account', minWidth: 138 },
  {
    id: 'mt',
    label: 'MT',
    minWidth: 35,
    align: 'center',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'balance',
    label: 'Balance',
    minWidth: 50,
    align: 'center',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'equity',
    label: 'Equity',
    minWidth: 46,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'equityPercentage',
    label: 'Equity %',
    minWidth: 55,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'openTrades',
    label: 'Open Trades (Lots)',
    minWidth: 133,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'pending',
    label: 'Pending',
    minWidth: 51,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'day',
    label: 'Day',
    minWidth: 24,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'week',
    label: 'Week',
    minWidth: 35,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'month',
    label: 'Month',
    minWidth: 42,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'total',
    label: 'Total',
    minWidth: 32,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'graph',
    label: '',
    minWidth: 16,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
];

function createData(
  accountStatus,
  account,
  mt,
  balance,
  equity,
  equityPercentage,
  openTrades,
  pending,
  day,
  week,
  month,
  total,
  graph
) {
  return {
    accountStatus,
    account,
    mt,
    balance,
    equity,
    equityPercentage,
    openTrades,
    pending,
    day,
    week,
    month,
    total,
    graph,
  };
}

const rows = [
  createData(
    '✔',
    'Demo Account (846220)',
    4,
    100731.14,
    100747.33,
    100.02,
    '5 (0.50)',
    '0 (0.00)',
    17.64,
    163.87,
    17.64,
    703.68
  ),
  createData(
    '✔',
    'TradersNetworkClub (254738)',
    4,
    61724.44,
    30034.12,
    48.69,
    '38 (7.67)',
    '0 (0.00)',
    28.39,
    296.09,
    28.39,
    7010.2
  ),
];

export default function DashboardTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#2E353E',
        boxShadow: 'none',
        '& .MuiPaper-root': {
          color: '#ccc',
          backgroundColor: '#2E353E',
          boxShadow: 'none',
        },
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 440,
          '.MuiTable-root': {
            borderColor: '#282D36',
            borderWidth: '1px',
          },
        }}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{
            '& .MuiTableCell-root': {
              color: '#ccc',
              backgroundColor: '#2E353E',
              border: '#282D36',
            },
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': {
                  border: 1,
                  borderColor: '#282D36',
                },
              }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ padding: '5px' }}
                >
                  <div className="flex gap-2 items-center justify-center">
                    {column.label}
                    {/* <Icon
                      icon="fa:sort"
                      className="cursor-pointer"
                      color="#ccc"
                    /> */}
                    <div className="flex flex-col width={11} cursor-pointer">
                      <Icon
                        icon="teenyicons:up-solid"
                        color="#ccc"
                        className="mb-[-4px]"
                        width={11}
                      />
                      <Icon
                        icon="teenyicons:down-solid"
                        width={11}
                        color="#ccc"
                      />
                    </div>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              '&:last-child td, &:last-child th': {
                border: 1,
                borderColor: '#282D36',
              },
            }}
          >
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    // sx={{
                    //   '&:last-child td, &:last-child th': {
                    //     border: 1,
                    //     borderColor: '#282D36',
                    //   },
                    // }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{ padding: '5px' }}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="records per page"
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        color=""
        sx={{
          marginTop: '10px',
          '& .MuiTablePagination-displayedRows': {
            color: '#ccc',
            // bgcolor: '#282D36',
          },
          '& .MuiTablePagination-selectLabel': {
            color: '#ccc',
            // bgcolor: '#282D36',
          },
          '& .MuiTablePagination-select': {
            color: '#ccc',
            bgcolor: '#282D36',
            borderRadius: '4px',
            height: '25px',
            width: '20px',
            paddingRight: '28px',
            paddingTop: '10px',
          },
          '& .MuiTablePagination-actions': {
            color: '#ccc',
            bgcolor: '#282D36',
            borderRadius: '4px',
          },
        }}
      /> */}
    </Paper>
  );
}
