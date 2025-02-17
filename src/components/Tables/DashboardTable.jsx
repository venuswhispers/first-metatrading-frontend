import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import api from '../../utils/api';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';

import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Icon } from '@iconify/react';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



export default function TradesTable({ headers }) {
  const [sort, setSort] = React.useState({
    id: '',
    type: '',
  });

  const [count, setCount] = React.useState();

  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangeRowsPerPage = (e) => {
    let config = JSON.parse(sessionStorage.getItem('dashboard'));
    config.accounts.pagecount = e.target.value;
    config.accounts.page = 1;
    sessionStorage.setItem('dashboard', JSON.stringify(config));

    setRowsPerPage(e.target.value);
    handlePageChange(null, 1);
  };

  const handlePageChange = async (e, value) => {
    setPage(value);

    try {
      let config = JSON.parse(sessionStorage.getItem('dashboard'));
      config.accounts.page = value;
      sessionStorage.setItem('dashboard', JSON.stringify(config));

      const { page, pagecount, sort, type } = config.accounts;
      // console.log(page, pagecount, sort, type);
      const res = await api.get(
        `/account/accounts?page=${page}&pagecount=${pagecount}&sort=${sort}&type=${type}`
      );
      setData(res.data.data);
      setCount(res.data.count);
    } catch (e) {
      console.log(e);
    }
  };

  const _calcProfitByDate = (data) => {
    let { day, week, month } = { day: 0, week: 0, month: 0 };
    data.forEach((profit) => {
      const gap = new Date().getTime() - new Date(profit.closeTime).getTime();
      if (gap < 3600 * 24 * 1000) {
        day += profit.profit;
      } else if (gap < 3600 * 24 * 1000 * 7) {
        week += profit.profit;
      } else if (gap < 3600 * 24 * 1000 * 30) {
        month += profit.profit;
      }
    });

    return { day, week, month };
  };

  React.useEffect(() => {
    let session = sessionStorage.getItem('dashboard');
    async function fetchData(config) {
      const { page, pagecount, sort, type } = config;
      const res = await api.get(
        `/account/accounts?page=${page}&pagecount=${pagecount}&sort=${sort}&type=${type}`
      );
      console.log(res.data)
      setData(res.data.data);
      setCount(res.data.count);
    }
    async function fetchData1() {
      const res = await api.get(
        `/account/accounts?page=${1}&pagecount=${10}&sort=${''}&type=${''}`
      );
      setData(res.data.data);
      setCount(res.data.count);
    }
    if (session) {
      let config = JSON.parse(session).accounts;
      setPage(config.page);
      setRowsPerPage(config.pagecount);
      setSort({
        id: config.sort,
        type: config.type,
      });

      fetchData(config);
    } else {
      setPage(1);
      setRowsPerPage(10);
      setSort({
        id: '',
        type: '',
      });
      fetchData1();
    }
  }, []);

  return (
    <div className="mt-2 text-[#ccc] bg-[#2E353E] p-5 rounded pb-[10px]">
      <div className="flex justify-between w-full pb-3">
        <div className="flex items-center gap-2">
          <FormControl size="small">
            <Select
              displayEmpty
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              input={
                <OutlinedInput
                  sx={{
                    width: '80px',
                    color: 'white',
                  }}
                />
              }
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          <Typography>records per page</Typography>
        </div>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </div>
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
                {headers.filter(item => item.checked && item.id !== "actions").map(({ label, id }) => (
                  <TableCell
                    key={id}
                    align="center"
                    sx={{
                      padding: '5px',
                    }}
                  >
                    <div className="flex items-center justify-between p-[3px]">
                      {label}
                      <div className="flex flex-col cursor-pointer">
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
              {
                data &&
                  data.map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {headers.filter(item => item.checked && item.id !== "actions").map(({ id }) => {
                          const { day, week, month } = _calcProfitByDate(
                            row.profit
                          );
                          row = { ...row, day, week, month };
                          let value = row[id];
                          if (id === 'account') {
                            value = `${row.name}(${row.login})`;
                          } else if (id === 'equityPercentage') {
                            if (isNaN((row.equity / row.balance) * 100)) value = ''; else value = (row.equity / row.balance) * 100;
                          } else if (id === 'openTrades') {
                            value = `${row.count} (${row.volume})`;
                          }
                          return (
                            <TableCell
                              key={id}
                              align="left"
                              sx={{
                                padding: '5px',
                                paddingLeft: 2,
                              }}
                            >
                              <div className="truncate">{value}</div>
                            </TableCell>
                          );
                        })}
                        {
                          headers.find(({id}) => id === "actions").checked &&
                          <TableCell
                            key={row._id + 'goto'}
                            align="center"
                            sx={{
                              padding: '5px',
                            }}
                          >
                            <Link
                              to={`/analysis/analysis-account/${row.accountId}`}
                            >
                              <IconButton
                                size="small"
                                color="inherit"
                                sx={{
                                  backgroundColor: '#0088CC',
                                  borderRadius: '4px',
                                  fontSize: 12,
                                  padding: '8px 6px',
                                }}
                              >
                                <Icon icon="fa:bar-chart" color="white" />
                              </IconButton>
                            </Link>
                          </TableCell>
                        }
                      </TableRow>
                    );
                  })
              }
            </TableBody>
          </Table>
        </TableContainer>

        <div className="flex justify-between items-center">
          <Typography sx={{ color: '#ccc', fontSize: 13 }}>
            Showing {rowsPerPage * (page - 1) + 1} to{' '}
            {rowsPerPage * page > count ? count : rowsPerPage * page} of {count}{' '}
            entries
          </Typography>
          <Pagination
            sx={{
              paddingY: 2,
            }}
            count={
              count % rowsPerPage === 0
                ? count / rowsPerPage
                : Math.floor(count / rowsPerPage) + 1
            }
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </div>
      </Paper>
    </div>
  );
}
