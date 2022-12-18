import React from "react";
import { Grid } from "@material-ui/core";

import TrackItem from "./TrackItem";

export default ({ podcast, tracks, onTrackSelect }) => {
  if (tracks === undefined) {
    return null;
  }
  if (tracks.length > 75) {
    tracks.splice(75, tracks.length - 75);
  }
  const listOfTracks = tracks.map((track) => {
    return (
      <TrackItem onTrackSelect={onTrackSelect} key={track} track={track} />
    );
  });

  return (
    <Grid
      item
      container
      direction="column"
      style={{ maxWidth: "750px" }}
      spacing={1}
    >
      {listOfTracks}
    </Grid>
  );
};
