import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Fab from '@material-ui/core/Fab';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  fab: {
    background:'black',
    marginTop:'20px',
    zIndex : '2',
    '&:hover': {
      backgroundColor: '#43464b',
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  inputBox:{
    marginTop:'25px'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


export default function Security(props) {
  const {setBackdrop,setOpen,setSnackSev,setSnackTest} = props;
  const classes = useStyles();
  const handlePassChange = () => {
    setBackdrop(true);
    if(document.getElementById("oldPass").value === '' || document.getElementById("newPass").value === '' || 
    document.getElementById("confirmPass").value === ''){
      setSnackTest("All fields are required!");
      setSnackSev("warning");
      setBackdrop(false);
      setOpen(true);
    }else if(document.getElementById("newPass").value !== document.getElementById("confirmPass").value){
      setSnackTest("New and confirm password does not match!");
      setSnackSev("error");
      setBackdrop(false);
      setOpen(true);
    }else{
      const passChange ={
        oldPass : document.getElementById("oldPass").value,
        newPass : document.getElementById("newPass").value
      }
      const config = {
        headers: {
          'authorization' : localStorage.getItem('authSession_token'),
        }
      };
      axios.post('/change_pass',passChange,config).then((response)=>{
        if(response.data === true){
          setSnackTest("Password changed successfully");
          setSnackSev("success");
          document.getElementById("oldPass").value = '';
          document.getElementById("newPass").value ='';
          document.getElementById("confirmPass").value ='';
          setBackdrop(false);
          setOpen(true);
        }else{
          setSnackTest("Wrong Credentials!");
          setSnackSev("error");
          document.getElementById("oldPass").value = '';
          document.getElementById("newPass").value ='';
          document.getElementById("confirmPass").value ='';
          setBackdrop(false);
          setOpen(true);
        }
      });
    }
  }
  return (
    <React.Fragment>
      <Grid item xs={12}>
            <Paper className = {classes.paper}>
            <Grid container spacing = {2} justify="center">
              <Typography component="h2" variant="h5" color = "textPrimary">
                Change Password
              </Typography>
              </Grid>
              <Grid container spacing = {2} justify="center">
              <TextField className = {classes.inputBox}
              fullWidth
                    id="oldPass"
                    label="Old Password"
                    defaultValue=''
                    InputProps={{
                      readOnly: false,
                    }}
                    variant="outlined"
                  />
              </Grid>
              <Grid container spacing = {2} justify="center">
              <TextField id="newPass"
              className = {classes.inputBox}
              fullWidth
                    label="New Password"
                    defaultValue=''
                    InputProps={{
                      readOnly: false,
                    }}
                    variant="outlined"
                  />
                 <TextField className = {classes.inputBox}
              fullWidth
                    id="confirmPass"
                    label="Confirm New Password"
                    defaultValue=''
                    InputProps={{
                      readOnly: false,
                    }}
                    variant="outlined"
                  />
              </Grid>
              <Fab variant="extended" color="primary" aria-label="add" className = {classes.fab}
              onClick={handlePassChange}>
          <VpnKeyIcon className = {classes.extendedIcon} />
          Change
          </Fab>
            </Paper>
          </Grid>
    </React.Fragment>
  );
}
