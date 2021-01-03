import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import NormalPost from './NormalPost';

export default function Main(props) {
  const { posts, title } = props;
  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post) => (
        <NormalPost key = {post.PostTitle} post = {post} />
      ))}
    </Grid>
  );
}