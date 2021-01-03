import React,{useEffect} from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CardPost from './blog-element/CardPost';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  progressDiv:{
    justifyContent: 'center',
    textAlign:'center'
  }
}));

export default function Posts(props) {
  const classes = useStyles();
  const [postList,setPostList] = React.useState(null);
  useEffect(()=>{
    axios.post('/load_posts',{cat:null}).then((response)=>{
        setPostList(response.data.posts.reverse());
    });
  },[]);
  const refreshList = () =>{
    axios.post('/load_posts',{cat:null}).then((response)=>{
        setPostList(response.data.posts.reverse());
    });
  }
  if(postList!==null){
    return (
      <React.Fragment>
        <div>
            <Grid container spacing = {3} >
            {postList.map((post) => (
                <CardPost key={post.PostTitle} 
                post={post} refreshList = {refreshList} 
                setBackdrop = {props.setBackdrop}
                setOpen = {props.setOpen}
                setSnackSev = {props.setSnackSev}
                setSnackTest = {props.setSnackTest}
                />
              ))}
            </Grid>
        </div>
      </React.Fragment>
      );
  }else{
    return(<div className={classes.progressDiv}><CircularProgress /></div>)
  }
}
