import React from "react";
import { Grid, Typography } from "@material-ui/core";

import PodcastItem from "./PodcastItem";

const PodcastList = ({ isSubscriptionList, podcasts, onPodcastSelect }) => {
  if (podcasts === undefined) {
    return null;
  }

  if (podcasts.length < 1) {
    return (
      <Grid item justify="center" container>
        <Grid item>
          {isSubscriptionList ? (
            <Typography
              variant="h5"
              style={{ marginTop: "80px", justifyContent: "center" }}
            >
              You have no current subscriptions
            </Typography>
          ) : (
            <Typography
              variant="h5"
              style={{
                marginTop: "80px",
                marginBottom: "10px",
                justifyContent: "center",
              }}
            >
              Couldn't find a podcast with that name
            </Typography>
          )}
        </Grid>
      </Grid>
    );
  }

  const listOfPodcasts = podcasts.map((podcast) => (
    <PodcastItem
      onPodcastSelect={onPodcastSelect}
      key={podcast.collectionId}
      podcast={podcast}
    />
  ));

  return (
    <Grid container spacing={4}>
      {listOfPodcasts}
    </Grid>
  );
};

export default PodcastList;
