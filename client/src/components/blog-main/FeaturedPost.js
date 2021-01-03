import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import ReactHtmlParser from 'react-html-parser';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.PostTitle}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {new Date(post.PubDate).toDateString()} by {post.Author}
              </Typography>
              <Typography component = "span" variant="subtitle1" paragraph>
                {ReactHtmlParser(post.PostDetail.substring(0,60))}....
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
          {post.Image!==null &&
            <CardMedia className={classes.cardMedia} image={`/get_image/${post.Image}`} title={post.imageTitle} />}
          {post.Image===null &&
            <CardMedia className={classes.cardMedia} image="none" title={post.imageTitle} />}
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
}