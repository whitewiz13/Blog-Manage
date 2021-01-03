import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

export default function DeletePost(props) {
    const {post,handleClose,refreshList,setBackdrop,setOpen,setSnackSev,setSnackTest} = props;
    const handlePostDelete = () =>{
        handleClose();
        setBackdrop(true);
        const postData={
            id : post._id
        }
        const config = {
            headers: {
              'authorization' : localStorage.getItem('authSession_token'),
            }
        };
        axios.post('/delete_post',postData,config).then((response)=>{
            if(response.data!==false){
                refreshList();
                setSnackSev('success');
                setSnackTest("Post successfully deleted!");
                setBackdrop(false);
                setOpen(true);
            }
        });
    }
    return(
        <div>
            <DialogTitle id="alert-dialog-title">{"This action cannot be undone!"}</DialogTitle>
            <Divider/>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Delete Post " {post.PostTitle} "?
                </DialogContentText>
            </DialogContent>
            <Divider/>
            <DialogActions>
                <Button onClick={handlePostDelete} color="primary">
                    Confirm
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Cancel
                </Button>
            </DialogActions>
    </div>)

}