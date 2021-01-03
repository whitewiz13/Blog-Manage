import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ReactHtmlParser from 'react-html-parser';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  continueBut:{
    color:"white",
    borderColor:"white"
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

export default function MainFeaturedPost(props) {
  const classes = useStyles();
  var { post } = props;
  var img;
  if(post === undefined){
    post = {
      PostTitle : "So empty...",
      PostDetail : "Please Write something, it's getting cold. I see a white light if you don't write something soon it'll be over very soon",
      Image : "https://source.unsplash.com/random"
    }
  }else{
  img = 'url("https://wallpapercave.com/wp/wp1929365.jpg")';}
  /*if(post.Image!==null){
    img = `url("/get_image/${post.Image}")`
  }*/
  return (
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage:img}}>
      {/* Increase the priority of the hero background image */}
      {post.Image!==null && <img style = {{display:"none"}} src={`/get_image/${post.Image}`} alt={post.imageText} />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h2" variant="h4" color="inherit" gutterBottom>
              {post.PostTitle}
            </Typography>
            <Typography component = "span" variant="h5" color="inherit" paragraph>
              {ReactHtmlParser(post.PostDetail.substring(0,100))}<p>...</p>
            </Typography>
            <Button className={classes.continueBut} variant="outlined">
              Continue Reading
            </Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}