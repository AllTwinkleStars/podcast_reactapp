import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Grid,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  Button,
  Avatar,
  Typography,
} from "@material-ui/core";
import { DOMParser } from "xmldom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  SearchPage,
  ListenPage,
  SubscriptionsPage,
  AudioPlayer,
} from "./pages";
import SignupDialog from "./pages/components/SignupDialog";

const App = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [podcasts, setPodcasts] = useState(undefined);
  const [selectedPodcast, setSelectedPodcast] = useState(undefined);
  const [tracks, setTracks] = useState([]);
  const [selectedTrackUrl, setSelectedTrackUrl] = useState(undefined);
  const [subscriptions, setSubscriptions] = useState(
    []
    //JSON.parse(localStorage.getItem("profile"))?.userData?.subscriptions
  );
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile"))?.userData);

  const getPodcasts = async (term) => {
    term = term.toString().replace(/[^a-zA-Z0-9]/g, " ");
    const url = `https://cors.bridged.cc/https://itunes.apple.com/search?term=${term}&entity=podcast`;
    const cors = "https://cors-anywhere.herokuapp.com/";

    const result = await fetch(url, {
      mode: "cors",
      headers: {
        "x-cors-grida-api-key": "32832479-b3b1-4f24-aa44-4ab02ccb1eb7",
      },
    });
    const items = await result.json();

    // this.setState({
    //   podcasts: items.results,
    //   tracks: undefined,
    // });
    setPodcasts(items.results);
  };

  const handleOnSelectPodcast = async (podcast) => {
    const id = podcast.trackId;
    const cors = "https://cors-anywhere.herokuapp.com/";
    try {
      const result1 = await fetch(
        `https://cors.bridged.cc/https://itunes.apple.com/lookup?id=${id}&entity=podcast`,
        {
          mode: "cors",
          headers: {
            "x-cors-grida-api-key": "32832479-b3b1-4f24-aa44-4ab02ccb1eb7",
          },
        }
      );
      const items1 = await result1.json();
      const result2 = await fetch(items1.results[0].feedUrl);
      const text = await result2.text();

      const podcastDocument = new DOMParser().parseFromString(text, "text/xml");

      const items = podcastDocument.getElementsByTagName("item");

      setSelectedPodcast(podcast);
      setTracks(items);
      setSelectedTab(1);
    } catch (err) {
      console.log(err);
    }
  };

  const setSelectedTrack = (track) => {
    setSelectedTrackUrl(
      track.getElementsByTagName("enclosure")[0].getAttribute("url")
    );
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const toggleSubscription = (subscribe, podcast) => {
    let newSubs = subscriptions;
    if (subscribe) {
      newSubs.push(podcast);
    } else {
      newSubs = newSubs.filter((pod) => {
        return pod.collectionId !== podcast.collectionId;
      });
    }
    // make api call -> find the current user's document and update its subscriptions field
    setSubscriptions(newSubs);
    alert(
      `${subscribe ? "Added" : "Removed"} "${podcast.collectionName}" ${
        subscribe ? "to" : "from"
      } subscriptions`
    );
  };

  const handleSignupDialogOpen = () => {
    setIsSignupDialogOpen(true);
  };

  const handleSignupDialogClose = () => {
    setIsSignupDialogOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  }

  // getUserSubscriptions = async () => {
  //   return await api.findUser(this.state.currentUser._id).subscriptions;
  // };

  // //const subscriptions = this.getUserSubscriptions();

  const subscribed = subscriptions?.includes(selectedPodcast);
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Search Podcast" />
            <Tab label="Episodes" />
            <Tab label="Subscriptions" />
          </Tabs>
          <AudioPlayer selectedPodcast={selectedTrackUrl} />
          {user ? (
            <>
              <Avatar alt={user?.name}>
                {user?.name.charAt(0)}
              </Avatar>
              <Typography variant="h6">{user?.name}</Typography>
              <Button variant="contained" color="secondary" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Button
              style={{ marginLeft: "15px" }}
              variant="contained"
              color="secondary"
              onClick={handleSignupDialogOpen}
            >
              Sign up
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <SignupDialog
        open={isSignupDialogOpen}
        handleClose={handleSignupDialogClose}
        setUser={setUser}
      />
      <Grid style={{ justifyContent: "center" }} container spacing={0}>
        {/* <Routes>
            <Route path="/" element={SearchPage} />
            <Route path="/listen" element={ListenPage} />
            <Route path="/subscriptions" element={SubscriptionsPage} />
          </Routes> */}
        {selectedTab === 0 && (
          <SearchPage
            podcasts={podcasts}
            getPodcasts={getPodcasts}
            handleOnSelectPodcast={handleOnSelectPodcast}
          />
        )}
        {selectedTab === 1 && (
          <ListenPage
            subscribed={subscribed}
            selectedPodcast={selectedPodcast}
            tracks={tracks}
            onClickTrack={setSelectedTrack}
            toggleSubscription={toggleSubscription}
          />
        )}
        {selectedTab === 2 && (
          <SubscriptionsPage
            subscriptions={subscriptions}
            setSelectedPodcast={setSelectedPodcast}
            isSignedIn={!!user}
          />
        )}
      </Grid>
    </>
  );
};

export default App;
