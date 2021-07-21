import { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
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
      const res = await axios.post('/user', data);
      setLoading(false);
      setSnack({
        open: true,
        type: 'success',
        message: 'User created successfully',
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
        console.log('profile not found');
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

  return (
    <Container maxWidth="sm" style={{ marginTop: '30px' }}>
      <Typography variant="h5">Create User</Typography>
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
