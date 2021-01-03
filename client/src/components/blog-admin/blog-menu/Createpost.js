import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ReactQuill from 'react-quill';
import Compress from "react-image-file-resizer";
import 'react-quill/dist/quill.snow.css';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  fab: {
    marginTop:'15px',
    float:'right',
    background:'black',
    '&:hover': {
      backgroundColor: '#43464b',
    },
  },
  textStyle:{
    marginTop:'20px',
  },
  inputText:{
    borderColor:'red',
  },
  uploadBut:{
    marginLeft:'15px',
    background:'black',
    color:'white',
    '&:hover': {
      backgroundColor: '#43464b',
    },
  input: {
    display: 'none',
  },
  }
}));

const modules = {
  toolbar: [
    [{ 'header': [false, 4] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
  ],
},

formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
]
export default function Createpost(props) {
  const {setBackdrop,setOpen,setSnackSev,setSnackTest} = props;
  const [select, setState] = React.useState('Letters');
  const [pTitle,setPostTitle] = React.useState('');
  const [pDetail,setPostDetail] = React.useState('');
  const [imageFile,setImageFile] = React.useState('');

  async function submitPost(){
    setBackdrop(true);
   if( pTitle=== '' ||pDetail === ''){
      setSnackSev('error');
      setSnackTest("You have to write something!");
      setOpen(true);
      setBackdrop(false);
    }else{
      Compress.imageFileResizer(
        imageFile, 
        350, 
        350, 
        "JPEG", 
        85, // quality
        0, // rotation
        (uri) => {
          console.log(uri);
          const formData = new FormData();
          formData.append('file',uri);
          formData.append('PostTitle', pTitle);
          formData.append('PostDetail', pDetail);
          formData.append('Type', select);
          const config = {
            headers: {
              'authorization' : localStorage.getItem('authSession_token'),
              'content-type': 'multipart/form-data'
            }
          };
          axios.post('/save_post',formData,config).then((response)=>{
          if(response.data!==null){
            document.getElementById("postTitle").value = '';
            document.getElementById("postBody").value = '';
            setSnackSev('success');
            setSnackTest("Post successfully saved!");
            setImageFile('');
            setPostTitle('');
            setPostDetail('');
            setBackdrop(false);
            setOpen(true);
          }});
        },"blob" // blob or base64 default base64
      );
    }
  }
  const handleChange = (event) => {
    setState(event.target.value);
  };
  const gotImage = (event)=>{
    setImageFile(event.target.files[0]);
  }
  const classes = useStyles();
  return (
    <React.Fragment>
      <div>
      <form noValidate autoComplete="off">
      <TextField id="postTitle"
          value = {pTitle}
          onChange = {event => setPostTitle(event.target.value)}
          fullWidth labelwidth={60} 
          label="Post Title" 
          variant="outlined"
          className = {classes.inputText}/>
          <ReactQuill style={{marginTop:"20px"}}
          modules = {modules}
          formats = {formats}
          id="postBody"
          theme="snow"
          value = {pDetail}
          onChange={event=> setPostDetail(event)}
           />
        <FormControl variant="outlined" className={classes.textStyle}>
        <Grid style ={{marginTop:'40px'}}>
        <InputLabel htmlFor="outlined-age-native-simple" style ={{marginTop:'40px'}}>Type</InputLabel>
          <Select
            native
            value = {select}
            onChange={handleChange}
            label="Type"
            inputProps={{
              id: 'outlined-age-native-simple'
            }}
            variant = 'outlined'>
              <option value="Letters">Letters</option>
              <option value="World">World</option>
              <option value="Stupid Things">Stupid Things</option>
          </Select>
            {imageFile === '' ? 
                    <label htmlFor="imageUp">
                    <input
                      accept="image/*"
                      style = {{display:'none'}}
                      id="imageUp"
                      type="file"
                      onChange = {(e)=>{gotImage(e)}}>                        
                      </input>
                      <Button
                        size="large"
                        variant="contained"
                        color="default"
                        component = "span"
                        className={classes.uploadBut}
                        startIcon={<CloudUploadIcon />}>
                        Choose Image
                      </Button></label>: <div>Uploaded</div>}
      </Grid>
        </FormControl>
      </form>
      <Fab variant="extended" color="primary" aria-label="add" className = {classes.fab} onClick={()=>{submitPost()}}>
          <AddIcon  />
          Create Post
          </Fab>
      </div>
    </React.Fragment>
  );
}
