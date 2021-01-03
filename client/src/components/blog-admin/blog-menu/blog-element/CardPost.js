import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import ReactHtmlParser from 'react-html-parser';
import DeletePost from './DeletePost';
import EditPost from './EditPost';

const useStyles = makeStyles((theme)=>({
    root: {
      maxWidth: 360,
      width:400,
      marginLeft : '20px',
      marginRight:'20px',
      marginTop:'20px',
      marginBottom : '20px'
    },
    media: {
      height: 150,
    },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function CardPost(props) {
    const [deleteDialog,setDeleteDialog] = React.useState(false);
    const [editDialog, setEditDialog] = React.useState(false);
    const {post,refreshList} = props;
    const classes = useStyles();
    const handleClickOpen = () => {
        setDeleteDialog(true);
    };
    const handleClose = () => {
        setDeleteDialog(false);
    };
    const handleEditOpen = () =>{
        setEditDialog(true);
    }
    const handleEditClose = () =>{
        setEditDialog(false);
    }
    return(
        <React.Fragment>
            <Card className={classes.root}>
                <CardActionArea>
                {post.Image!==null &&
                    <CardMedia
                        className={classes.media}
                        image={`/get_image/${post.Image}`}
                        title="Contemplative Reptile"/>}
                  {post.Image===null &&
                    <CardMedia
                        className={classes.media}
                        image="none"
                        title="Contemplative Reptile"/>}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {post.PostTitle}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="span">
                            {ReactHtmlParser(post.PostDetail.substring(0,100))}...
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick = {handleEditOpen}>
                        Edit
                    </Button>
                    <Button size="small" color="primary" onClick={handleClickOpen}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
            <Dialog
                disableBackdropClick = {true}
                disableEscapeKeyDown = {false}
                open={deleteDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DeletePost 
                    post = {post}  
                    handleClose = {handleClose}
                    refreshList = {refreshList} 
                    setBackdrop={props.setBackdrop}
                    setOpen = {props.setOpen}
                    setSnackSev = {props.setSnackSev}
                    setSnackTest = {props.setSnackTest}/>
            </Dialog>
            <Dialog fullScreen open={editDialog} onClose={handleEditClose} TransitionComponent={Transition}>
                <EditPost 
                    post = {post} 
                    handleEditClose = {handleEditClose} 
                    refreshList = {refreshList} 
                    setBackdrop={props.setBackdrop}
                    setOpen = {props.setOpen}
                    setSnackSev = {props.setSnackSev}
                    setSnackTest = {props.setSnackTest}/>
            </Dialog>
        </React.Fragment>)
}