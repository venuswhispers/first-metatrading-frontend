import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const columns = [
  { id: 'account', label: 'Account', minWidth: 125 },
  { id: 'terms', label: 'Terms', minWidth: 110 },
  // { id: 'description', label: 'Description' },
  {
    id: 'options',
    label: '',
    minWidth: 55,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
];

function createData(
  account,
  terms,
  // description,
  options
) {
  return {
    account,
    terms,
    // description,
    options,
  };
}

export default function SignalProviderTable({ data }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      console.log(data)
      const temp = data.map((signal) => {
        console.log("signal", signal)
        return createData(
          signal.account,
          signal.providerName
          // signal.description
          // signal.login,
          // signal.name,
          // signal.server
        );
      });
      setRows(temp);
      console.log('temp', temp)
    }
  }, [data]);

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
                  {column.label}
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
      <TablePagination
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
      />
    </Paper>
  );
}
