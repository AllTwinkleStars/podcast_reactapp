import React from 'react';
import './App.css';
import {Grid, Tabs, Tab, AppBar, Toolbar} from '@material-ui/core'
import { DOMParser } from "xmldom"

import {SearchPage, ListenPage, SubscriptionsPage, AudioPlayer} from './pages'


class App extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      selectedTab: 0,
      podcasts: undefined,
      selectedPodcast: undefined,
      podcastDocument: undefined,
      tracks: undefined,
      selectedTrackUrl: undefined,
      subscriptions: []
    }
  }

  getPodcast = async (term) => {
    term = term.toString().replace(/[^a-zA-Z0-9]/g, ' ');
    const url = `https://itunes.apple.com/search?term=${term}&entity=podcast`
    const cors = 'https://cors-anywhere.herokuapp.com/'

    const result = await fetch(url)
    const items = await result.json()
    console.log(items);


    this.setState({
      podcasts: items.results,
      tracks: undefined
    })
    
  }  

  setSelectedPodcast = async (podcast) => {
    const id = podcast.trackId
    const cors = 'https://cors-anywhere.herokuapp.com/'

    const result1 = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=podcast`)
    const items1 = await result1.json()
    const result2 = await fetch(cors+items1.results[0].feedUrl)
    const text = await result2.text()

    const podcastDocument = new DOMParser().parseFromString(
      text,
      "text/xml",
    )

    const items = podcastDocument.getElementsByTagName("item")

    this.setState({
      selectedPodcast: podcast,
      podcastDocument: podcastDocument,
      tracks: items,
      selectedTab: 1
    })

  }

  setSelectedTrack = async (track) => {
    this.setState({
      selectedTrackUrl: track.getElementsByTagName("enclosure")[0].getAttribute("url")
    })
  }
  
  
  handleTabChange = (event, newValue) => {
    this.setState({
      selectedTab: newValue
    })
  }

  toggleSubscription = (subscribe, podcast) => {
    let newSubs = this.state.subscriptions
    if (subscribe) {
      newSubs.push(podcast)
    } else {
      newSubs = newSubs.filter((pod)=>{
        return (pod.collectionId !== podcast.collectionId)
      })
    }
    this.setState({
      subscriptions: newSubs
    })
    alert(`${(subscribe) ? "Added":"Removed"} "${podcast.collectionName}" ${(subscribe) ? "to":"from"} subscriptions`);
  }

  render () {
    const {podcasts, selectedPodcast, selectedTab, tracks, selectedTrackUrl, subscriptions}=this.state
    const subscribed = subscriptions.includes(selectedPodcast)
    
    return (
        <>
          <AppBar position="sticky">
            <Toolbar>
              <Tabs value={selectedTab} onChange={this.handleTabChange}>
                <Tab label="Search Podcast" />
                <Tab label="Episodes" />
                <Tab label="Subscriptions" />
              </Tabs>
              <AudioPlayer selectedPodcast = {selectedTrackUrl}/>
            </Toolbar>
          </AppBar>

          <Grid style={{ justifyContent: "center" }} container spacing={0}>
            {selectedTab === 0 && <SearchPage podcasts={podcasts} getPodcast={this.getPodcast}  setSelectedPodcast ={this.setSelectedPodcast}/>}
            {selectedTab === 1 && <ListenPage subscribed={subscribed} selectedPodcast={selectedPodcast} tracks={tracks} setSelectedTrack={this.setSelectedTrack} toggleSubscription={this.toggleSubscription} />}
            {selectedTab === 2 && <SubscriptionsPage subscriptions={subscriptions} setSelectedPodcast ={this.setSelectedPodcast}/>}
          </Grid>
        </>
    );
    
  }
}

export default App;





















