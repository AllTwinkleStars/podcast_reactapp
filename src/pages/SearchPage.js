import React from "react";
import { Grid, Typography } from "@material-ui/core";
import PodcastList from './components/PodcastList';
import SearchBar from './components/SearchBar';

export default ({podcasts, getPodcast, setSelectedPodcast}) => {
  if (podcasts === undefined){
    return (
      <Grid item xs={10}>
        <Grid item container spacing={3} style={{ justifyContent: "center" }}>
            <Grid item xs={8}style={{ marginTop: "10px" }}>
                <SearchBar onFormSubmit={getPodcast}/>
            </Grid>
            <Grid item style={{ marginTop:"50px", justifyContent: "center" }} container>
              <Typography variant="h6">
              ☝️ Type something and press enter to search for podcasts!
              </Typography>
            </Grid>
        </Grid>
    </Grid>

    );
  }
  return (
    
        <Grid item xs={10}>
            <Grid item container spacing={3} style={{ justifyContent: "center" }}>
                <Grid item xs={8}style={{ marginTop: "10px" }}>
                    <SearchBar onFormSubmit={getPodcast}/>
                </Grid>
                <Grid item xs={12}>
                  <PodcastList podcasts={podcasts} onPodcastSelect={setSelectedPodcast}/>
                </Grid>
            </Grid>
        </Grid>
  );
}