import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import clsx from 'clsx';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {Link as Rlink} from 'react-router-dom';
import Createpost from './blog-menu/Createpost';
import Posts from './blog-menu/Posts';
import Profile from './blog-menu/Profile';
import Security from './blog-menu/Security';
import Grow from '@material-ui/core/Grow';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockIcon from '@material-ui/icons/Lock';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Copyright(props) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        {props.name}
      </Link>{' '}
    </Typography>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    background:'black',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 16,
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  progressDiv:{
    justifyContent: 'center',
    textAlign:'center'
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [auth,setAuth] = React.useState(null);
  const [uData,setUData] = React.useState("");
  const [snackText, setSnackTest] = React.useState('');
  const [snackSev, setSnackSev] = React.useState('success');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [backDrop,setBackdrop] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [dtitle,setDtitle] = React.useState("Write Something!");

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
    setOpen(false);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setDrawerOpen(false);
    if(index === 0){
      setDtitle("Write Something!");
    }else if(index === 1){
      setDtitle("Profile");
    }else if(index === 2){
      setDtitle("Recent Posts");
    }else{
      setDtitle("Security");
    }
  };
  function handleLogout(){
    localStorage.clear();
    window.location = "/main"
  }
  useEffect(()=>{
    const config = {
      headers: {
        'authorization' : localStorage.getItem('authSession_token'),
      }
    };
      axios.post('/check_auth',null,config).then((response)=>{
        if(response.data.auth===true){
          setAuth(response.data.auth);
          setUData(response.data.name);
        }else{
          setAuth(response.data.auth);
        }
      });
  },[]);
  if(auth===null){
    return(<div className={classes.progressDiv}><CircularProgress /></div>);
  }else if(auth===false){
    localStorage.clear();
    return <Redirect to='/login'  />
  }else{
  return (
    <Grow in>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {dtitle}
          </Typography>
          <Rlink to = "/main" style={{ textDecoration: 'none',color:'white' }}>
          <Button color="inherit" variant = "text">
            Go Home
          </Button>
          </Rlink>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="bottom"
        open={drawerOpen}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Create Post" />
          </ListItem>
          <ListItem button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)} >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}>
            <ListItemIcon>
              <AssignmentIcon />
                </ListItemIcon>
              <ListItemText primary="Recent Posts" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListSubheader inset>Settings</ListSubheader>
          <ListItem button
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary="Security" />
          </ListItem>
          <ListItem button onClick={()=>{handleLogout()}}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Create Post */}
            {selectedIndex === 0 && 
            <Grow in>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Createpost setBackdrop = {setBackdrop}
                  setOpen = {setOpen} setSnackSev = {setSnackSev}
                  setSnackTest = {setSnackTest}/>
                </Paper>
              </Grid>
            </Grow>}
            {/* User Profile */}
            {selectedIndex === 1 &&
            <Grow in>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Profile setBackdrop = {setBackdrop} 
                  setOpen = {setOpen} setSnackSev = {setSnackSev}
                  setSnackTest = {setSnackTest}/>
                </Paper>
              </Grid>
            </Grow>}
            {/* Recent Posts*/}
            {selectedIndex === 2 &&
            <Grow in>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Posts setBackdrop = {setBackdrop}
                     setOpen = {setOpen} setSnackSev = {setSnackSev}
                     setSnackTest = {setSnackTest}/>
                </Paper>
              </Grid>
            </Grow>}
             {/* User Security */}
            {selectedIndex === 3 &&
            <Grow in>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Security setBackdrop = {setBackdrop}
                  setOpen = {setOpen} setSnackSev = {setSnackSev}
                  setSnackTest = {setSnackTest}/>
                </Paper>
              </Grid>
            </Grow>}
          </Grid>
          <Box pt={4}>
            <Copyright name = {uData}/>
          </Box>
        </Container>
      </main>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackSev}>
        {snackText}
        </Alert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={backDrop}>
        <CircularProgress color="inherit" />
    </Backdrop>
    </div>
    </Grow>);
  }
}
