import React from 'react';
import { Grid} from '@material-ui/core';

import TrackItem from './TrackItem';

export default ({ podcast, tracks, onTrackSelect }) => {
    
	if (tracks === undefined) {
		return null
	}
/*
	if (podcasts.length < 1) {
		return (
			<Grid container spacing={10}>
				<h2>
					There are no podcasts matching
					these terms
				</h2>
			</Grid>
		);
    }*/
    

	const listOfTracks = Array.prototype.slice.call(tracks).map((track) => {
        return (
            <TrackItem
                onTrackSelect={onTrackSelect}
                key={track}
                track={track}
            />
        )
    })

	return (
		<Grid item container 
			direction="column"
			style={{maxWidth:"750px"}}
			spacing={1}
		>
			
				{listOfTracks}
			
		</Grid>
	
	);
};
