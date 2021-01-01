import React from "react";
import { Grid, makeStyles, Typography,Card, CardActionArea, CardContent} from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

export default ({track, onTrackSelect}) => {

  const titles = Array.prototype.slice.call(
    track.getElementsByTagName("title"),
  )

  const useStyles = makeStyles({
    media: {
      height: 0,
      paddingTop: '70%',
      marginTop:'30'
    },
    playIcon: {
      verticalAlign:"middle",
      color: " #a93226",
      marginRight: "10px",
      marginBottom: "0",
    },
  });
  const classes = useStyles();

  return (
    <Grid item xs={12}>
    <Card>
      <CardActionArea onClick={() => onTrackSelect(track)}>
        <CardContent>
          <Typography variant="h6" noWrap>
            <PlayArrowIcon className={classes.playIcon}/>
            {titles[0].childNodes[0].nodeValue}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>


    
  );
}
