import React from "react";
import { makeStyles, Grid, Typography,Card, CardActionArea, CardMedia, CardContent} from "@material-ui/core";


export default ({podcast, onPodcastSelect}) => {
  const useStyles = makeStyles({
    root: {
      minHeight: '325px',
      width: "100%"
    },
    actionArea: {
      height: "100%"
    },
    media: {
      height: 0,
      paddingTop: '70%',
      marginTop:'30'
    },
    
  });
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} className={classes.root}>
      <Card>
        <CardActionArea onClick={() => onPodcastSelect(podcast)} className={classes.actionArea}>
          <CardMedia 
            className={classes.media}
            image={podcast.artworkUrl600}
            title={podcast.collectionName}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" noWrap>
              {podcast.collectionName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {'Genre: '+podcast.primaryGenreName}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>

    
  );
}

