import React from "react";
import {
  Grid,
  Switch,
  Typography,
  FormControlLabel,
  makeStyles,
  Card,
  CardMedia,
} from "@material-ui/core";
import TrackList from "./components/TrackList";

export default ({
  selectedPodcast,
  tracks,
  onClickTrack,
  toggleSubscription,
  subscribed,
  loggedIn,
}) => {
  const useStyles = makeStyles({
    media: {
      width: "250px",
      height: "250px",
    },
  });
  const classes = useStyles();
  if (selectedPodcast === undefined) {
    return (
      <Grid
        item
        style={{ marginTop: "100px", justifyContent: "center" }}
        container
      >
        <Typography variant="h5">Search and select a podcast first!</Typography>
      </Grid>
    );
  }
  return (
    <Grid
      item
      container
      xs={10}
      justify="center"
      style={{ marginTop: "10px" }}
      spacing={3}
    >
      <Grid item>
        <Card>
          <CardMedia
            className={classes.media}
            image={selectedPodcast.artworkUrl600}
            title={selectedPodcast.collectionName}
          />
        </Card>
      </Grid>

      <Grid item container xs={4} justify="center" direction="column">
        <Grid item>
          <Typography variant="h4">{selectedPodcast.collectionName}</Typography>
        </Grid>
        <Grid item style={{ marginTop: "15px" }}>
          <Typography variant="subtitle1">
            by {selectedPodcast.artistName}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">
            Genre: {selectedPodcast.primaryGenreName}
          </Typography>
        </Grid>
        <Grid item>
          {loggedIn ? (
            <FormControlLabel
              control={
                <Switch
                  checked={subscribed}
                  onChange={() => {
                    toggleSubscription(!subscribed, selectedPodcast);
                  }}
                />
              }
              label="Subscribe"
              style={{ marginTop: "15px" }}
            />
          ) : (
            <Typography variant="subtitle1">
              Sign in to subscribe to your favourite podcasts
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ margin: "-10px" }}></Grid>

      <Grid item>
        <Typography variant="h5" style={{ marginBottom: "10px" }}>
          All Episodes
        </Typography>
        <TrackList tracks={tracks} onTrackSelect={onClickTrack} />
      </Grid>
    </Grid>
  );
};
