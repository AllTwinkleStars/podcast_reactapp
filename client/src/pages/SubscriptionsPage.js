import React from "react";
import { Grid } from "@material-ui/core";
import PodcastList from './components/PodcastList';


export default ({subscriptions, setSelectedPodcast}) => {

  return (
      <Grid item xs={10} style={{ marginTop: "15px" }}>
        <PodcastList subscriptionList={true} podcasts={subscriptions} onPodcastSelect={setSelectedPodcast}/>
      </Grid>
  );
}