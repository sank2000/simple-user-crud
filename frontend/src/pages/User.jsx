import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Table,
  TableContainer,
  Button,
  Paper,
  TableBody,
  LinearProgress,
} from '@material-ui/core';

import { StyledTableCell, StyledTableRow, NotFound } from '../components';

export default function List() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { id } = useParams();

  const getUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/user/${id}`);
      setUser(data.data);
      setLoading(false);
    } catch (error) {
      const statusCode = error.response ? error.response.status : null;
      if (statusCode === 404 || statusCode === 400) {
        setLoading(false);
        setUser({});
      }
    }
  };

  useEffect(() => {
    getUser();
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
            {user.name && (
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    ID
                  </StyledTableCell>
                  <StyledTableCell>{user._id}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Name
                  </StyledTableCell>
                  <StyledTableCell>{user.name}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Phone Number
                  </StyledTableCell>
                  <StyledTableCell>{user.phoneNumber}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Email
                  </StyledTableCell>
                  <StyledTableCell>{user.email}</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            )}
          </Table>
          {!user.name && <NotFound description="User not found !" />}
        </TableContainer>
      )}
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push('/')}
        >
          Home
        </Button>
      </div>
    </section>
  );
}
