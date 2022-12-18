import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import PodcastList from "./components/PodcastList";

const SubscriptionsPage = ({
  subscriptions,
  handleOnSelectPodcast,
  isSignedIn,
}) => {
  console.log(subscriptions);
  return isSignedIn ? (
    <Grid item xs={10} style={{ marginTop: "15px" }}>
      <PodcastList
        isSubscriptionList={true}
        podcasts={subscriptions}
        onPodcastSelect={handleOnSelectPodcast}
      />
    </Grid>
  ) : (
    <Grid item justify="center" container>
      <Grid item>
        <Typography
          variant="h5"
          style={{ marginTop: "80px", justifyContent: "center" }}
        >
          Please sign in to see your subscriptions
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SubscriptionsPage;
