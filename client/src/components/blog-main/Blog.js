import React, { useEffect }from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
//import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  progressDiv:{
    justifyContent: 'center',
    textAlign:'center'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const sections = [
  { title: 'Everything', url: '#' },
  { title: 'Letters', url: '#' },
  { title: 'World', url: '#' },
  { title: 'Stupid Things', url: '#' },
];
/*
var mainFeaturedPost = {
  PostTitle: 'Loading',
  PostDetail:
    "Almost done...",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    PostTitle: 'Loading',
    Pubdate: new Date(),
    PostDetail:
      'Almost done...',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
];
*/
const sidebar = {
  title: 'About',
  quoteTitle : 'Quote',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'October 2020', url: '#' },
    { title: 'September 2020', url: '#' },
    { title: 'August 2020', url: '#' },
  ],
  social: [
    { name: 'Like i got any...', icon: SentimentDissatisfiedIcon },
   /* { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },*/
  ],
};

export default function Blog() {
  const classes = useStyles();
  const [postList,setPostList] = React.useState(null);
  const [userdata,setUserData] = React.useState(null);
  const [backDrop,setBackdrop] = React.useState(false);
  const [dash,setDash] = React.useState(null);
  useEffect(()=>{
    const tok = {
      token : localStorage.getItem('authSession_token'),
      cat : null
    }
    axios.post('/load_blog',tok).then((response)=>{
        setUserData(response.data);
        setDash(response.data.dash);
    });
    axios.post('/load_posts',tok).then((response)=>{
     setPostList(response.data.posts.reverse());
    });
  },[]);
  const refreshPost = (category) =>{
    setBackdrop(true);
    const tok = {
      token : localStorage.getItem('authSession_token'),
      cat : category
    }
    axios.post('/load_posts',tok).then((response)=>{
      setPostList(response.data.posts.reverse());
      setBackdrop(false);
    });
  }
  if(userdata != null &&  dash !=null){
  return (
    <React.Fragment>
      <CssBaseline />
      <Fade in>
      <Container maxWidth="lg">
        <Header title={userdata.blogtitle} sections={sections} dash = {dash} refreshPost = {refreshPost} 
        setBackdrop = {setBackdrop}/>
        {postList !=null && 
        <Fade in>
       <main>
         <MainFeaturedPost post={postList[0]} />
          {/*<Grid container spacing={4}>
            {postList.slice(1,3).map((post) => (
              <FeaturedPost key={post.PostTitle} post={post} />
            ))}
            </Grid>*/}
          <Grid container spacing={5} className={classes.mainGrid}>
         <Main title="From the Novel" posts={postList} />
            <Sidebar
              quoteTitle = {sidebar.quoteTitle}
              quote = {userdata.quote}
              title={sidebar.title}
              description={userdata.about}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
        </Fade>}
        {postList === null &&  
        <div className = {classes.progressDiv}><CircularProgress /></div>}
      </Container>
      </Fade>
      <Backdrop className={classes.backdrop} open={backDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Footer title="Ciao" description="Thanks for stopping by!"  endName = {userdata.name}/>
    </React.Fragment>
  );}else{
    return(<div className={classes.progressDiv}><CircularProgress /></div>)
  }
}
