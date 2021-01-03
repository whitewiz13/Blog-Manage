import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ReactHtmlParser from 'react-html-parser';

const useStyles = makeStyles((theme) => ({
    pImage:{
        maxWidth: '50%',
        height: 'auto',
        borderRadius : "7px",
        border: '3px solid #000000',
        '@media only screen and (max-width: 640px)' : {
            maxWidth : '80%'
        }
    },
    postItem : {
        marginTop:'20px'
    },
    postDate : {
        marginTop:'10px',
        fontSize:'14px',
        textDecoration: 'none'
    },
    postBody : {
        marginTop:'10px',
    }
}));

export default function Createpost(props) {
    const classes = useStyles();
    const {post} = props;
    return (
    <div className = {classes.postItem}>
        <Typography component="h2" variant="h4">
            {post.PostTitle}
        </Typography>
        <Typography component="p" paragraph={true} className = {classes.postDate}>
            {new Date(post.PubDate).toDateString()} by 
            <Typography component="a" className ={classes.postDate}><strong> {post.Author}</strong> </Typography> 
        </Typography>
        <Typography component="span" paragraph={true} className = {classes.postBody}>
            {ReactHtmlParser(post.PostDetail)}
        </Typography>
       {<div style ={{textAlign:"center"}}>
       {post.Image!==null && <img className={classes.pImage} src={`/get_image/${post.Image}`} alt={post.imageText} />}
    </div>}
        <Divider></Divider>
    </div>);
}