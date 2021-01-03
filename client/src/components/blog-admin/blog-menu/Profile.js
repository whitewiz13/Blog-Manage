import React,{ useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  fab: {
    background:'black',
    position: 'absolute',
    bottom: '20px',
    right: '30px',
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
  progressDiv:{
    justifyContent: 'center',
    textAlign:'center'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Profile(props) {
  const {setBackdrop,setOpen,setSnackSev,setSnackTest} = props;
  const [uData,setUserData] = React.useState(null);
  const [editPeron,setEditPerson] = React.useState(false);
  const classes = useStyles();
  useEffect(()=>{
    const config = {
      headers: {
        'authorization' : localStorage.getItem('authSession_token'),
      }
    };
    axios.post('/load_data',null,config).then((response)=>{
      if(response.data!=null){
        setUserData(response.data);
      }
    });
  },[]);
  function editPDetail(){
    if(!editPeron){
      setEditPerson(true);
      document.getElementById("name").focus();
    }else{
      setBackdrop(true);
      setEditPerson(false);
      if(uData.Name === document.getElementById("name").value
      && uData.username ===document.getElementById("username").value &&
      uData.blogtitle === document.getElementById("blogTitle").value &&
      uData.about === document.getElementById("about").value &&
      uData.quote === document.getElementById("quote").value){
        setSnackSev('warning');
        setSnackTest("Nothing to save!");
        setBackdrop(false);
        setOpen(true);
      }else{
        const userData = {
          Name : document.getElementById("name").value,
          username : document.getElementById("username").value,
          blogtitle : document.getElementById("blogTitle").value,
          about : document.getElementById("about").value,
          quote : document.getElementById("quote").value,
        }
        const config = {
          headers: {
            'authorization' : localStorage.getItem('authSession_token'),
          }
        };
        axios.post('/update_data',userData,config).then((response)=>{
          if(response.data !==null){
            setUserData(response.data);
            setSnackSev('success');
            setSnackTest("Data successfully saved!");
            setBackdrop(false);
            setOpen(true);
          }
        });
      }
    }
  }
  if(uData!=null){
  return (
    <React.Fragment>
      <div>
        <Grid container spacing = {3} justify="flex-end">
        {!editPeron ?
              <Fab variant = "extended"size="large" color="primary" aria-label="add" className = {classes.fab}
              onClick={()=>{editPDetail()}}>
              <EditIcon className={classes.extendedIcon}/>
              Edit
                  </Fab>: 
                  <Fab variant = "extended"size="large" color="primary" aria-label="add" className = {classes.fab}
                  onClick={()=>{editPDetail()}}>
                    <SaveIcon className={classes.extendedIcon}/>
                    Save
                    </Fab>}
          <Grid item xs={12}>
            <Paper className = {classes.paper}>
            <Grid container spacing = {2} justify="center">
              <Typography component="h2" variant="h5" color = "textPrimary">
                Personal Details
              </Typography>
              </Grid>
              <Grid container spacing = {2} justify="center">
              <TextField className = {classes.inputBox}
              fullWidth
                    id="name"
                    label="Name"
                    defaultValue={uData.Name}
                    InputProps={{
                      readOnly: !editPeron,
                    }}
                    variant="outlined"
                  />
              </Grid>
              <Grid container spacing = {2} justify="center">
              <TextField id="username"
              className = {classes.inputBox}
              fullWidth
                    label="Username"
                    defaultValue={uData.username}
                    InputProps={{
                      readOnly: !editPeron,
                    }}
                    variant="outlined"
                  />
                 <TextField className = {classes.inputBox}
              fullWidth
                    id="blogTitle"
                    label="Blog Title"
                    defaultValue={uData.blogtitle}
                    InputProps={{
                      readOnly: !editPeron,
                    }}
                    variant="outlined"
                  />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className = {classes.paper}>
            <Grid container spacing = {2} justify="center">
            <Typography component="h2" variant="h5" color = "textPrimary">
                About
              </Typography>
              </Grid>
              <Grid container spacing = {2} justify="center">
              <TextField className = {classes.inputBox}
              fullWidth
                    id="about"
                    label="About you"
                    multiline
                    defaultValue={uData.about}
                    InputProps={{
                      readOnly: !editPeron,
                    }}
                    variant="outlined"
                  />
                          <TextField className = {classes.inputBox}
              fullWidth
                    id="quote"
                    label="Quote"
                    multiline
                    defaultValue={uData.quote}
                    InputProps={{
                      readOnly: !editPeron,
                    }}
                    variant="outlined"
                  />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );}else{
    return(<div className={classes.progressDiv}><CircularProgress /></div>);
  }
}
