import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {Link as RLink} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex:1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    '&:hover':{
      cursor:'pointer',
    },
  },
  mainImg :{
    width:150,
    height:150,
    borderRadius:"160px",
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title,dash,refreshPost,setBackdrop } = props;
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <div
          className={classes.toolbarTitle}>
            {dash ?
            <Typography
              align="left"
              component="h2"
              variant="h5">
            {title}
            </Typography>:<Typography
              align="left"
              component="h2"
              variant="h5">
            {title}
            </Typography>}
        </div>
        {/*<Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}>
          <img className = {classes.mainImg} src="/img/main.jpg" alt = "main"/>
        </Typography>*/}
        {dash ?
        <RLink to="/dash" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" size="small"   align="right">
            Dashboard
          </Button>
        </RLink>
         :/*<RLink to="/login" style={{ textDecoration: 'none' }}>*/
            <Button variant="outlined" size="small" onClick ={()=>{
              setBackdrop(true);
              window.location.href="https://sandeepthakur.co";
              setTimeout(()=>{setBackdrop(false)},3000);}}>
              Find Me
            </Button>
        /*</RLink>*/}
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            key={section.title}
            onClick={()=>{
              if(section.title!=="Everything")
                refreshPost(section.title)
              else
              refreshPost(null)
            }}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}