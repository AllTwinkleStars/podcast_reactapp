import ReactAudioPlayer from 'react-audio-player';
import React from "react";

export default ({selectedPodcast}) => {
  const style = {
      width:"65vw",
  };
  return (
        <ReactAudioPlayer
          style={style} 
          src={selectedPodcast}
          autoPlay
          controls
        />

  );
}





