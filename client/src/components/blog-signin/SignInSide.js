import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Sandeep Thakur
      </Link>{' '}
      {/*new Date().getFullYear()*/}
      {/*'.'*/}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width:50,
    height:50,
    background:'none'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progressDiv:{
    justifyContent: 'center',
    textAlign:'center'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function SignInSide(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [backDrop,setBackdrop] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  function logUserIn(e){
    e.preventDefault();
    setBackdrop(true);
    const userRes = {
      username : document.getElementById("uname").value,
      pass : document.getElementById("password").value
    }
    axios.post('/login',userRes).then((response)=>{
      if(response.data!==false){
        localStorage.setItem('authSession_token', response.data.token);
        setBackdrop(false);
        props.history.push({
          pathname : '/dash',
          state : {data1 : response.data}
        });
      }else{
        setBackdrop(false);
        setOpen(true);
      }
    });
  }
  if(localStorage.getItem('authSession_token')){
    return <Redirect to='/dash'/>
  }else{
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <img src='/favicon.png' alt = ""/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit = {(e)=>{logUserIn(e)}}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="uname"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/*
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />*/}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
                Sign In
              </Button>
            {/*<Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>*/}
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Invalid Credentials!"}</DialogTitle>
        <DialogContent dividers>
        <Typography gutterBottom>
            There was a problem logging you in, either the account does not exist
            or you are using wrong credendials. Please try again!
          </Typography>
        </DialogContent>
      </Dialog>
      <Backdrop className={classes.backdrop} open={backDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
  }
}
