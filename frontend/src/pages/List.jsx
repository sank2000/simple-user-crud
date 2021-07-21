import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  IconButton,
} from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LinearProgress from '@material-ui/core/LinearProgress';

import { StyledTableCell, StyledTableRow, NotFound } from '../components';

export default function List() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const getUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/user');
      setUser(data.data);
      setLoading(false);
    } catch (error) {
      const statusCode = error.response ? error.response.status : null;
      if (statusCode === 404) {
        setLoading(false);
        console.log('profile not found');
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section style={{ margin: '20px 0' }}>
      {loading ? (
        <LinearProgress />
      ) : (
        <TableContainer
          component={Paper}
          style={{ width: '90%', margin: '0 auto' }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>View</StyledTableCell>
                <StyledTableCell>Edit</StyledTableCell>
                <StyledTableCell>Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.map((val, ind) => {
                return (
                  <StyledTableRow key={ind}>
                    <StyledTableCell component="th" scope="row">
                      {val._id}
                    </StyledTableCell>
                    <StyledTableCell>{val.name}</StyledTableCell>
                    <StyledTableCell>
                      <IconButton
                        onClick={() => {
                          history.push(`/${val._id}`);
                        }}
                      >
                        <VisibilityOutlinedIcon />
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell>
                      <IconButton
                        onClick={() => {
                          history.push({
                            pathname: '/edit',
                            state: val,
                          });
                        }}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell>
                      <IconButton
                        onClick={() => {
                          console.log('delete');
                        }}
                      >
                        <DeleteForeverOutlinedIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
          {user.length === 0 && <NotFound />}
        </TableContainer>
      )}
    </section>
  );
}
