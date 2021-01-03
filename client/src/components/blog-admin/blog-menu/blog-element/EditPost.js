import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    appBar: {
        position: 'relative',
        background:'black'
      },
      title: {
        marginLeft: theme.spacing(2),
        flex: 1,
      },
}));

export default function EditPost(props) {
    const classes = useStyles();
    const {post,handleEditClose} = props;
    return(<div>
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleEditClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" noWrap className={classes.title}>
                    {post.PostTitle}
                </Typography>
                {/*<Button autoFocus color="inherit" onClick={handleEditClose}>
                    Save
                </Button>*/}
            </Toolbar>
        </AppBar>
        <DialogContent>
        </DialogContent>
    </div>)
}