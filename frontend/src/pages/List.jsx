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

import {
  StyledTableCell,
  StyledTableRow,
  NotFound,
  Dialog,
} from '../components';

export default function List() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [activeDoc, setActiveDoc] = useState({});

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
        setUser([]);
        console.log('profile not found');
      }
    }
  };

  const handleDelete = async () => {
    setButtonLoading(true);
    try {
      await axios.delete('/user', {
        data: {
          id: activeDoc._id,
        },
      });
      setButtonLoading(false);
      getUsers();
    } catch (error) {
      setButtonLoading(false);
      console.error(error);
    }
    setOpenDelete(false);
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
                          setActiveDoc(val);
                          setOpenDelete(true);
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
      <Dialog
        title="Confirm"
        description="Are you sure to delete this?"
        open={openDelete}
        loading={buttonLoading}
        handleClose={() => {
          if (!buttonLoading) setOpenDelete(false);
        }}
        handleConfirm={handleDelete}
      />
    </section>
  );
}
