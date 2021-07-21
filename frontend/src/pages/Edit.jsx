import { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

import { Alert, ButtonLoader } from '../components';

const initialValue = {
  name: '',
  phoneNumber: '',
  email: '',
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Add() {
  const classes = useStyles();
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [snack, setSnack] = useState({
    open: false,
    type: 'error',
    message: 'hey ',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const payload = {};

      Object.entries(data).forEach((val) => {
        if (location.state[val[0]] !== val[1]) {
          payload[val[0]] = val[1];
        }
      });

      await axios.put('/user', {
        ...payload,
        id: location.state._id,
      });
      setLoading(false);
      setSnack({
        open: true,
        type: 'success',
        message: 'User updated successfully',
      });
      setTimeout(() => {
        history.push('/');
      }, 2000);
    } catch (error) {
      const statusCode = error.response ? error.response.status : null;
      if (statusCode === 400) {
        setLoading(false);
        setSnack({
          open: true,
          type: 'error',
          message: error.response.data.error ?? 'Something went wrong !',
        });
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack((old) => ({ ...old, open: false }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((old) => ({
      ...old,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (location.state) {
      setData(location.state);
    } else {
      history.push('/');
    }
  }, [location]);

  return (
    <Container maxWidth="sm" style={{ marginTop: '30px' }}>
      <Typography variant="h5">Update User</Typography>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="Name"
          required
          fullWidth
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        <TextField
          label="Phone Number"
          type="number"
          required
          fullWidth
          name="phoneNumber"
          value={data.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          required
          type="email"
          name="email"
          fullWidth
          value={data.email}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Save {loading && <ButtonLoader />}
        </Button>
      </form>
      <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snack.type}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
