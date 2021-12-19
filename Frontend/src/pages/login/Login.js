import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import { gql, useMutation } from '@apollo/client';

import { AuthContext } from '../../Context/Auth';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import gif from '../../assets/loading.gif';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#90caf9',
    },
    '& .MuiFormLabel-root': {
      color: '#fff',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#90caf9',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(255,255,255,0.5)',
      },
      '&:hover fieldset': {
        borderColor: '#fff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#90caf9',
      },
      color: '#fff',
    },
  },
})(TextField);

export default function Login({ Close, Open, OpenSignUp }) {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [info, setInfo] = useState({
    username: '',
    password: '',
  });

  const [LoginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      context.login(result.data.login);
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      history.push('/home');
    },
    onError(err) {
      console.log("Login",err)
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: info,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    LoginUser();
  };

  const { username, password } = info;

  const handleChange = (e) =>
    setInfo({ ...info, [e.target.name]: e.target.value });

  if (loading)
    return (
      <Dialog
        open={loading}
        onClose={loading}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        style={{ backgroundColor: 'rgba(0,0,0)' }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0)',
            border: '0px',
          }}
        >
          <img src={gif} alt='' width='150' />
        </div>
      </Dialog>
    );
  else
    return (
      <Dialog
        open={Open}
        TransitionComponent={Transition}
        keepMounted
        onClose={Close}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#1B1E3F',
            padding: '20px',
            width: '40vw',
          }}
        >
          <Avatar>
            <i class='fas fa-user-lock' style={{ color: '#1B1E3F' }}></i>
          </Avatar>
          <Typography component='h1' variant='h5' style={{ color: '#fff' }}>
            Sign in
          </Typography>
          <form onSubmit={handleSubmit}>
            <CssTextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              value={username}
              autoComplete='off'
              autoFocus
              onChange={handleChange}
            />
            {errors.username && (
              <p
                style={{
                  padding: '5px',
                  color: 'rgb(250, 179, 174)',
                  backgroundColor: 'rgb(24, 6, 5)',
                  borderRadius: '5px',
                }}
                severity='error'
              >
                <i
                  class='fas fa-exclamation-circle'
                  style={{ color: 'red' }}
                ></i>{' '}
                {errors.username}
              </p>
            )}
            <CssTextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='off'
              onChange={handleChange}
              value={password}
            />
            {errors.password && (
              <p
                style={{
                  padding: '5px',
                  color: 'rgb(250, 179, 174)',
                  backgroundColor: 'rgb(24, 6, 5)',
                  borderRadius: '5px',
                }}
                severity='error'
              >
                <i
                  class='fas fa-exclamation-circle'
                  style={{ color: 'red' }}
                ></i>{' '}
                {errors.password}
              </p>
            )}
            <FormControlLabel
              control={<Checkbox value='remember' style={{ color: 'white' }} />}
              label='Remember me'
              style={{ color: 'white' }}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              style={{ backgroundColor: '#90caf9' }}
            >
              Sign In
            </Button>
            <Grid container style={{ marginTop: '10px' }}>
              <Grid item xs>
                <Link href='#' variant='body2' style={{ color: '#90caf9' }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href='#'
                  variant='body2'
                  style={{ color: '#90caf9' }}
                  onClick={OpenSignUp}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Dialog>
    );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
